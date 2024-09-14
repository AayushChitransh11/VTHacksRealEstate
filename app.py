from flask import Flask, request, jsonify, abort
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from propelauth_flask import init_auth,current_user
load_dotenv()
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
# auth = init_auth(os.getenv("PROPEL_AUTH_URL"), os.getenv("PROPEL_AUTH_KEY"))


SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


@app.route('/')
def home():
    return '<h1>Home Page</h1>'

@app.route('/properties2', methods=['GET'])
def get_only_prop_location():
    try:
        response = supabase.table('properties').select('location').execute()
        print(f"Properties Response: {response}")  # Debugging: print response
        if response.data:
            return jsonify(response.data)
        else:
            return jsonify([]), 204
    except Exception as e:
        app.logger.error(f"Error fetching properties: {e}")
        return jsonify({'error': 'Failed to fetch properties'}), 500

# --- PROPERTIES ROUTES ---
@app.route('/properties', methods=['GET'])
# @auth.optional_user
def get_properties():
    try:
        # Get the page number and page size from query parameters
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('page_size', 20))
        
        # Calculate the offset
        offset = (page - 1) * page_size
        
        # Fetch properties with pagination
        response = supabase.table('properties').select('*').range(offset, offset + page_size - 1).execute()
        
        print(f"Properties Response: {response}")  # Debugging: print response
        if response.data:
            return jsonify(response.data)
        else:
            return jsonify([]), 204
    except Exception as e:
        app.logger.error(f"Error fetching properties: {e}")
        return jsonify({'error': 'Failed to fetch properties'}), 500

@app.route('/properties/<int:property_id>', methods=['GET'])
# @auth.optional_user
def get_property_by_id(property_id):
    """Fetch a specific property by property_id."""
    try:
        response = supabase.table('properties').select('*').eq('property_id', property_id).execute()
        print(f"Property Response for ID {property_id}: {response}")  # Debugging: print response
        if response.data:
            return jsonify(response.data[0])  # Return the first match (assuming property_id is unique)
        else:
            return jsonify({'message': 'Property not found'}), 404
    except Exception as e:
        app.logger.error(f"Error fetching property {property_id}: {e}")
        return jsonify({'error': 'Failed to fetch the property'}), 500
def get_user_details(user_id):
    try:
        user_id = int(user_id)
        response = supabase.table('users').select('*').eq('user_id', user_id).execute()
        print(f"User Details Response: {response}")  # Debugging: print response
        if response.data:
            return response.data[0]
        else:
            return None
    except ValueError:
        app.logger.error(f"Invalid user_id: {user_id} is not a valid integer")
        return None
    except Exception as e:
        app.logger.error(f"Error fetching user details: {e}")
        return None

@app.route('/user/<user_id>', methods=['GET'])
# @auth.require_user
def get_user(user_id):
    if not user_id.isdigit():
        app.logger.error(f"Invalid user_id format: {user_id}")
        abort(400)
    
    user_details = get_user_details(user_id)
    if user_details:
        return jsonify(user_details), 200
    else:
        abort(404)

# --- INVESTMENTS ROUTES ---
# @app.route('/investments', methods=['GET'])
# def get_investments():
#     try:
#         response = supabase.table('investments').select('*').execute()  # Ensure the table name is all lowercase now
#         print(f"Investments Response Status: {response.status_code}")  # Log the status code
#         print(f"Investments Response Data: {response.data}")  # Log the data returned

#         if response.data:
#             return jsonify(response.data)
#         else:
#             return jsonify([]), 204
#     except Exception as e:
#         app.logger.error(f"Error fetching investments: {e}")
#         print(f"Exception Details: {e}")  # Print exception details for debugging
#         return jsonify({'error': 'Failed to fetch investments'}), 500
@app.route('/investments', methods=['GET'])
# @auth.require_user
def get_investments():
    try:
        # Fetch data from 'investments' table
        response = supabase.table('investments').select('*').execute()
        
        # Debugging: print the response for troubleshooting
        print(f"Investments Response: {response}")
        
        if response.data:
            return jsonify(response.data), 200
        else:
            return jsonify([]), 204
    except Exception as e:
        # Log the error if something goes wrong
        app.logger.error(f"Error fetching investments: {e}")
        return jsonify({'error': 'Failed to fetch investments'}), 500





@app.route('/investments', methods=['POST'])
def create_investment():
    """Create a new investment."""
    try:
        # Get data from request
        data = request.get_json()
        user_id = data.get('user_id')
        property_id = data.get('property_id')
        amount = data.get('amount')

        # Validate required fields
        if not all([user_id, property_id, amount]):
            return jsonify({'error': 'Missing required fields'}), 400

        # Insert new investment
        response = supabase.table('investments').insert({
            'user_id': user_id,
            'property_id': property_id,
            'amount': amount
        }).execute()

        print(f"Create Investment Response: {response}")  # Debugging: print response

        # Check if the insertion was successful
        if response.data:
            return jsonify(response.data), 201  # Return created investment data
        else:
            return jsonify({'error': 'Failed to create investment'}), 500
    except Exception as e:
        app.logger.error(f"Error creating investment: {e}")
        return jsonify({'error': 'Failed to create investment'}), 500
# @app.route('/check-connection', methods=['GET'])
# def check_connection():
#     if SUPABASE_URL and SUPABASE_KEY:
#         return jsonify({'status': 'Connected to Supabase'}), 200
#     else:
#         return jsonify({'status': 'Supabase connection failed'}), 500

# --- ASSETS ROUTES ---


@app.route('/assets', methods=['GET'])
def get_assets():
    try:
        response = supabase.table('assets').select('*').execute()
        print(f"Assets Full Response: {response}")  # Debugging: full response output
        if response.data:
            return jsonify(response.data)  # Returning the fetched data as JSON
        else:
            return jsonify([]), 204  # No content if no data found
    except Exception as e:
        app.logger.error(f"Error fetching assets: {e}")
        return jsonify({'error': 'Failed to fetch assets'}), 500

@app.route('/assets', methods=['POST'])
def create_asset():
    try:
        data = request.get_json()
        asset_name = data.get('asset_name')
        asset_type = data.get('asset_type')
        property_id = data.get('property_id')
        value = data.get('value')
        acquisition_date = data.get('acquisition_date')

        if not all([asset_name, asset_type, property_id, value, acquisition_date]):
            return jsonify({'error': 'Missing required fields'}), 400

        response = supabase.table('assets').insert({
            'asset_name': asset_name,
            'asset_type': asset_type,
            'property_id': property_id,
            'value': value,
            'acquisition_date': acquisition_date
        }).execute()

        print(f"Create Asset Response: {response}")  # Debugging: print response

        if response.status_code == 201:
            return jsonify(response.data), 201
        else:
            return jsonify({'error': 'Failed to create asset'}), 500
    except Exception as e:
        app.logger.error(f"Error creating asset: {e}")
        return jsonify({'error': 'Failed to create asset'}), 500

@app.route('/payments', methods=['GET'])
def get_payments():
    try:
        response = supabase.table('payments').select('*').execute()
        print(f"Payments Response: {response}")  # Debugging: print response
        if response.data:
            return jsonify(response.data)
        else:
            return jsonify([]), 204
    except Exception as e:
        app.logger.error(f"Error fetching payments: {e}")
        return jsonify({'error': 'Failed to fetch payments'}), 500

@app.route('/payments', methods=['POST'])
def create_payment():
    try:
        data = request.get_json()
        transaction_id = data.get('transaction_id')
        customer_id = data.get('customer_id')
        payment_date = data.get('payment_date')
        amount = data.get('amount')
        payment_method = data.get('payment_method')

        if not all([transaction_id, customer_id, payment_date, amount, payment_method]):
            return jsonify({'error': 'Missing required fields'}), 400

        response = supabase.table('payments').insert({
            'transaction_id': transaction_id,
            'customer_id': customer_id,
            'payment_date': payment_date,
            'amount': amount,
            'payment_method': payment_method
        }).execute()

        print(f"Create Payment Response: {response}")  # Debugging: print response

        if response.status_code == 201:
            return jsonify(response.data), 201
        else:
            return jsonify({'error': 'Failed to create payment'}), 500
    except Exception as e:
        app.logger.error(f"Error creating payment: {e}")
        return jsonify({'error': 'Failed to create payment'}), 500

# --- DIVIDENDS ROUTES ---
@app.route('/dividends', methods=['GET'])
def get_dividends():
    try:
        response = supabase.table('dividends').select('*').execute()
        print(f"Dividends Response: {response}")  # Debugging: print response
        if response.data:
            return jsonify(response.data)
        else:
            return jsonify([]), 204
    except Exception as e:
        app.logger.error(f"Error fetching dividends: {e}")
        return jsonify({'error': 'Failed to fetch dividends'}), 500

# --- PROPERTY MAINTENANCE ROUTES ---
@app.route('/property_maintenance', methods=['GET'])
def get_maintenance():
    try:
        response = supabase.table('property_maintenance').select('*').execute()
        print(f"Maintenance Response: {response}")  # Debugging: print response
        if response.data:
            return jsonify(response.data)
        else:
            return jsonify([]), 204
    except Exception as e:
        app.logger.error(f"Error fetching maintenance records: {e}")
        return jsonify({'error': 'Failed to fetch maintenance records'}), 500

@app.route('/property_maintenance', methods=['POST'])
def create_maintenance():
    try:
        data = request.get_json()
        property_id = data.get('property_id')
        maintenance_type = data.get('maintenance_type')
        cost = data.get('cost')
        maintenance_date = data.get('maintenance_date')

        if not all([property_id, maintenance_type, cost, maintenance_date]):
            return jsonify({'error': 'Missing required fields'}), 400

        response = supabase.table('property_maintenance').insert({
            'property_id': property_id,
            'maintenance_type': maintenance_type,
            'cost': cost,
            'maintenance_date': maintenance_date
        }).execute()

        print(f"Create Maintenance Response: {response}") 

        if response.status_code == 201:
            return jsonify(response.data), 201
        else:
            return jsonify({'error': 'Failed to create maintenance record'}), 500
    except Exception as e:
        app.logger.error(f"Error creating maintenance record: {e}")
        return jsonify({'error': 'Failed to create maintenance record'}), 500

if __name__ == '__main__':
    app.run(debug=True)

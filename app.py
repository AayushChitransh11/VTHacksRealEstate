from flask import Flask, request, jsonify, abort
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from flask_cors import CORS  # Import CORS
from propelauth_flask import init_auth,current_user
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
load_dotenv()
import numpy as np
from flask_cors import CORS
vectorizer = TfidfVectorizer(stop_words='english', max_features=1000)


app = Flask(__name__)
CORS(app)  # Enable CORS
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

# --- USERS ROUTES ---
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
@app.route('/investments/add', methods=['POST'])
def create_investment():
    try:
        # Parse JSON data from request
        data = request.get_json()
        property_id = data.get('property_id')
        user_id = data.get('user_id')
        value = data.get('value')
        date_time = data.get('date_time')

        # Validate required fields
        if not all([property_id, user_id, value, date_time]):
            return jsonify({'error': 'Missing required fields'}), 400

        # Check if the property_id exists in the properties table
        property_response = supabase.table('properties').select('*').eq('property_id', property_id).execute()
        if not property_response.data:
            return jsonify({'error': 'Property ID does not exist'}), 404

        # Check if the user_id exists in the users table
        user_response = supabase.table('users').select('*').eq('user_id', user_id).execute()
        if not user_response.data:
            return jsonify({'error': 'User ID does not exist'}), 404

        # Insert data into Supabase
        insert_response = supabase.table('investments').insert({
            'property_id': property_id,
            'user_id': user_id,
            'amount': value,
            'investment_date': date_time
        }).execute()

        # Check if insertion was successful
        if insert_response.data:
            return jsonify(insert_response.data), 201
        else:
            return jsonify({'error': 'Failed to create investment'}), 500

    except Exception as e:
        app.logger.error(f"Error creating investment: {e}")
        return jsonify({'error': 'Failed to create investment'}), 500

@app.route('/investments', methods=['GET'])
# @auth.require_user
def get_investments():
    try:
        response = supabase.table('investments').select('*').execute()
        print(f"Investments Response: {response}")
        if response.data:
            return jsonify(response.data), 200
        else:
            return jsonify([]), 204
    except Exception as e:
        app.logger.error(f"Error fetching investments: {e}")
        return jsonify({'error': 'Failed to fetch investments'}), 500
  
@app.route('/investments', methods=['POST'])
def get_investments_user():
    try:
        data = request.get_json()
        user_id = data.get('user_id')

        if not user_id:
            return jsonify({'error': 'User ID is required'}), 400

        # Fetch investments from Supabase
        response = supabase.table('investments').select('*').eq('user_id', user_id).execute()

        if response.data:
            return jsonify(response.data), 200
        else:
            return jsonify([]), 204

    except Exception as e:
        app.logger.error(f"Error fetching investments: {e}")
        return jsonify({'error': 'Failed to fetch investments'}), 500
# --- ASSETS ROUTES ---

@app.route('/assets', methods=['GET'])
def get_assets():
    try:
        response = supabase.table('assets').select('*').execute()
        print(f"Assets Full Response: {response}")
        if response.data:
            return jsonify(response.data)
        else:
            return jsonify([]), 204
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

        print(f"Create Asset Response: {response}")

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



@app.route('/api/dividends', methods=['POST'])
def get_dividends():
    try:
        data = request.get_json()

        if not data or 'user_id' not in data:
            return jsonify({"error": "Invalid request. 'user_id' is required."}), 400

        user_id = data['user_id']

        response = supabase.table('dividends').select('*').eq('user_id', user_id).execute()

        if response.data:
            return jsonify(response.data), 200
        else:
            return jsonify({"message": "No dividends found for the specified user_id."}), 404

    except KeyError as e:
        return jsonify({"error": f"Missing key in request data: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

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

@app.route('/recommend', methods=['POST'])
def recommend_properties():
    user_input = request.json.get('description')
    
    try:
        response = supabase.table('properties').select(
          "*"
        ).execute()
        
        if not response.data:
            return jsonify({"error": "No properties found"}), 404
        
        properties = response.data
        property_texts = []

        for property in properties:
            highlights = " ".join(property.get('highlights', []))
            description = property.get('description', '')
            address = property.get('address', '')

            property_details = property.get('propertyDetails', {})
            community_details = property.get('communityDetails', {})

            property_details_text = (
                f"Home Type: {property_details.get('homeType', '')}. "
                f"Home Design: {property_details.get('homeDesign', '')}. "
                f"Year Built: {property_details.get('yearBuilt', '')}. "
                f"HOA Fees: {property_details.get('hoaFees', '')}. "
                f"Additional Features: {', '.join(property_details.get('additionalFeatures', []))}. "
                f"Listing Details: {', '.join(property_details.get('listingDetails', []))}. "
            )

            community_details_text = (
                f"Community Overview: {', '.join(community_details.get('overview', []))}. "
                f"Amenities: {', '.join(community_details.get('amenities', []))}. "
                f"Pet Policy: {community_details.get('petPolicy', '')}. "
            )

            property_text = f"{highlights} {description} {address} {property_details_text} {community_details_text}"
            property_texts.append(property_text)

        tfidf_matrix = vectorizer.fit_transform(property_texts)
        user_query_vector = vectorizer.transform([user_input])
        similarity_scores = cosine_similarity(user_query_vector, tfidf_matrix)
        best_matches = np.argsort(similarity_scores[0])[::-1]
        
        recommendations = []
        for idx in best_matches[:5]: 
            recommendations.append({
                "id": properties[idx]['property_id'],
                "property": properties[idx],
                "similarity_score": similarity_scores[0][idx],
                "description": properties[idx]["description"],
                "property_price": (properties[idx]["property_price"])/16
            })
        
        return jsonify(recommendations)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
from supabase import create_client, Client
import os
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/properties', methods=['GET'])
def get_properties():
    response = supabase.table('properties').select('*').execute()
    return jsonify(response.data)

# @app.route('/properties', methods=['POST'])
# def add_property():
#     data = request.form
#     name = data.get('name')
#     location = data.get('location')
#     built_date = data.get('builtDate')  
#     dimension = data.get('dimension')
#     price = float(data.get('price'))

#     response = supabase.table('properties').insert({
#         'property_name': name,
#         'property_location': location,
#         'property_built_date': built_date,
#         'property_dimension': dimension,
#         'property_price': price
#     }).execute()

#     return jsonify(response.data), 201

# @app.route('/purchase', methods=['POST'])
# def purchase_fraction():
#     data = request.json
#     user_id = data.get('userId')
#     property_id = data.get('propertyId')
#     fractions_to_buy = data.get('fractionsToBuy')
#     token = data.get('token')

#     response = supabase.table('transaction').insert({
#         'transaction_date': '2024-01-01',  
#         'customer_id': 1, 
#         'property_id': property_id
#     }).execute()

    # return jsonify({'message': 'Purchase successful!'})

if __name__ == '__main__':
    app.run(debug=True)

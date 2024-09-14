from flask import Flask, request, jsonify, abort
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
    try:
        response = supabase.table('properties').select('*').execute()
        if response.data:
            return jsonify(response.data)
        else:
            return jsonify([]), 204  # No Content
    except Exception as e:
        print(f"Error fetching properties: {e}")
        return jsonify({'error': 'Failed to fetch properties'}), 500

@app.route("/")
def home():
    return '<h1>Home Page</h1>'

def get_user_details(user_id):
    try:
        # Convert user_id to integer
        user_id = int(user_id)
        response = supabase.table('users').select('*').eq('user_id', user_id).execute()
        if response.data:
            return response.data[0]
        else:
            return None
    except ValueError:
        # Handle case where user_id cannot be converted to an integer
        print(f"Invalid user_id: {user_id} is not a valid integer")
        return None
    except Exception as e:
        # Catch any other exceptions and log them
        print(f"Error fetching user details: {e}")
        return None

@app.route('/user/<user_id>', methods=['POST'])
def get_user(user_id):
    # Remove the Authorization check for now
    # Validate user_id
    if not user_id.isdigit():
        print(f"Invalid user_id format: {user_id}")
        abort(400)  # Bad Request

    user_details = get_user_details(user_id)
    if user_details:
        return jsonify(user_details), 200
    else:
        abort(404)  # Not Found

if __name__ == '__main__':
    app.run(debug=True)

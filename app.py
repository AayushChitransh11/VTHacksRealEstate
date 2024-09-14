from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB max file size

# Sample properties data
properties = []

@app.route('/properties', methods=['GET'])
def get_properties():
    return jsonify(properties)

@app.route('/properties', methods=['POST'])
def add_property():
    data = request.form
    name = data.get('name')
    location = data.get('location')
    total_fractions = int(data.get('totalFractions'))
    price_per_fraction = float(data.get('pricePerFraction'))

    image = request.files.get('image')
    if image:
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        image_path = f'/static/uploads/{filename}'
    else:
        image_path = None

    new_property = {
        'id': len(properties) + 1,
        'name': name,
        'location': location,
        'total_fractions': total_fractions,
        'price_per_fraction': price_per_fraction,
        'image': image_path
    }
    properties.append(new_property)
    return jsonify(new_property), 201

@app.route('/purchase', methods=['POST'])
def purchase_fraction():
    data = request.json
    user_id = data.get('userId')
    property_id = data.get('propertyId')
    fractions_to_buy = data.get('fractionsToBuy')
    token = data.get('token')

    # Here you would process the payment with Stripe and update the property data
    # For now, just return a success message
    return jsonify({'message': 'Purchase successful!'})

if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True)

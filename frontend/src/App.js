// pages/index.js
import { useState, useEffect } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [fractionsToBuy, setFractionsToBuy] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [userId, setUserId] = useState(1); // Simulating logged-in user
  const [newProperty, setNewProperty] = useState({
    name: '',
    location: '',
    totalFractions: 0,
    pricePerFraction: 0,
    image: null
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const res = await axios.get("http://localhost:3001/properties");
    setProperties(res.data);
  };

  const handleToken = async (token) => {
    try {
      const res = await axios.post("http://localhost:3001/purchase", {
        userId: userId,
        propertyId: selectedProperty.id,
        fractionsToBuy: fractionsToBuy,
        token: token.id
      });
      alert(res.data.message);
    } catch (error) {
      alert('Error: ' + error.response.data.message);
    }
  };

  const handlePropertySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProperty.name);
    formData.append('location', newProperty.location);
    formData.append('totalFractions', newProperty.totalFractions);
    formData.append('pricePerFraction', newProperty.pricePerFraction);
    if (newProperty.image) {
      formData.append('image', newProperty.image);
    }

    try {
      await axios.post("http://localhost:3001/properties", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchProperties(); // Refresh property list
      setNewProperty({
        name: '',
        location: '',
        totalFractions: 0,
        pricePerFraction: 0,
        image: null
      });
    } catch (error) {
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Fractional Real Estate Platform</h1>

      <h2>Properties</h2>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <h3>{property.name}</h3>
            <p>{property.location}</p>
            <p>Price per Fraction: ${property.price_per_fraction}</p>
            <p>Fractions Available: {property.fractions_available}</p>
            {property.image && <img src={`http://localhost:3001${property.image}`} alt={property.name} style={{ width: '200px', height: '150px' }} />}
          </li>
        ))}
      </ul>

      <h2>Add New Property (Admin)</h2>
      <form onSubmit={handlePropertySubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newProperty.name}
          onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newProperty.location}
          onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Total Fractions"
          value={newProperty.totalFractions}
          onChange={(e) => setNewProperty({ ...newProperty, totalFractions: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price per Fraction"
          value={newProperty.pricePerFraction}
          onChange={(e) => setNewProperty({ ...newProperty, pricePerFraction: e.target.value })}
          required
        />
        <input
          type="file"
          onChange={(e) => setNewProperty({ ...newProperty, image: e.target.files[0] })}
        />
        <button type="submit">Add Property</button>
      </form>

      <h2>Purchase Fractions</h2>
      <select onChange={(e) => setSelectedProperty(JSON.parse(e.target.value))}>
        <option value="">Select a property</option>
        {properties.map((property) => (
          <option key={property.id} value={JSON.stringify(property)}>
            {property.name} - {property.location} - {property.fractions_available} fractions available
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Fractions to Buy"
        value={fractionsToBuy}
        onChange={(e) => setFractionsToBuy(e.target.value)}
      />

      {selectedProperty && (
        <StripeCheckout
          stripeKey="your-public-stripe-key"
          token={handleToken}
          amount={fractionsToBuy * selectedProperty.price_per_fraction * 100}
          name={`Buy ${fractionsToBuy} Fractions of Property`}
        />
      )}
    </div>
  );
}

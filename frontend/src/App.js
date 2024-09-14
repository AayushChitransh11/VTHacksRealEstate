// pages/index.js
import { useState, useEffect } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import styles from './styles/Home.module.css';

export default function Home() {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Luxury Apartment",
      location: "New York",
      total_fractions: 16,
      price_per_fraction: 10000,
      fractions_available: 16,
      image: '/uploads/luxury-apartment.jpg' 
    },
    {
      id: 2,
      name: "Beach House",
      location: "California",
      total_fractions: 8,
      price_per_fraction: 20000,
      fractions_available: 8,
      image: '/uploads/beach-house.jpg' 
    }
  ]);
  const [fractionsToBuy, setFractionsToBuy] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [userId, setUserId] = useState(1); // Simulating logged-in user


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

  return (
    <div className={styles.container}>
      <h1>Fractional Real Estate Platform</h1>

      <h2>Available Properties</h2>
      <div className={styles.propertyList}>
        {properties.map((property) => (
          <div key={property.id} className={styles.propertyCard}>
            <h3>{property.name}</h3>
            <img src={`http://localhost:3001${property.image}`} alt={property.name} className={styles.propertyImage} />
            <p>Location: {property.location}</p>
            <p>Price per Fraction: ${property.price_per_fraction}</p>
            <p>Fractions Available: {property.fractions_available}</p>
            <button onClick={() => setSelectedProperty(property)}>Select Property</button>
          </div>
        ))}
      </div>

      {selectedProperty && (
        <div className={styles.purchaseSection}>
          <h2>Purchase Fractions</h2>
          <input
            type="number"
            placeholder="Fractions to Buy"
            value={fractionsToBuy}
            onChange={(e) => setFractionsToBuy(e.target.value)}
          />
          <StripeCheckout
            stripeKey="your-public-stripe-key"
            token={handleToken}
            amount={fractionsToBuy * selectedProperty.price_per_fraction * 100}
            name={`Buy ${fractionsToBuy} Fractions of ${selectedProperty.name}`}
          />
        </div>
      )}
    </div>
  );
}

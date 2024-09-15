import React, { createContext,useState } from 'react';
import PropertyMap from './properlyMap';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
export const AppContext = createContext();

const PropertyCard = ({ image, title, location, minInvestment, roi, id }) => (
  
  <div className="bg-white shadow-lg rounded-lg mb-4">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-muted mb-2">{location}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm">Min. Investment: ${minInvestment}</span>
        <span className="text-sm font-semibold text-green-600">ROI: {roi}%</span>
      </div>
    </div>
    <div className="p-4 bg-gray-900">
      <Link to={`/listing/${id}`} className="block w-full bg-primary text-white py-2 rounded text-center">
        View Details
      </Link>
    </div>
  </div>
);

// Dummy Properties for random images
const dummyProperties = [
  {
    image: "https://miamisrr.com/wp-content/uploads/2023/05/regis-1.jpg",
    description: "Luxury Condo in Miami",
    address: "Miami, FL",
    property_price: 5000,
    roi: 12,
    id: 1
  },
  {
    image: "https://images1.loopnet.com/i2/rzDC47-GS5PeVDMS5Xmj4Gnp6gFFc8dQ_PQFK4xXx4M/112/44-Exchange-Place-New-York-NY-Building-Photo-1-HighDefinition.jpg",
    description: "Commercial Complex in NYC",
    address: "New York, NY",
    property_price: 10000,
    roi: 15,
    id: 2
  },
  {
    image: "https://www.balivillas.com/images/villa/URID21914832001-TVG-Main.jpg",
    description: "Beachfront Villa in Bali",
    address: "Bali, Indonesia",
    property_price: 2000,
    roi: 18,
    id: 3
  }
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * dummyProperties.length);
  return dummyProperties[randomIndex].image;
};

const BrowsePropertiesPage = () => {
  const [searchText, setSearchText] = useState('');
  const [properties, setProperties] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: searchText }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assign a random image from dummyProperties
        const propertiesWithImages = data.map(property => ({
          ...property,
          image: getRandomImage(),
        }));
        setProperties(propertiesWithImages);
      } else {
        console.error('Failed to fetch properties');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <PropertyMap />
        
        <div className="my-8 flex justify-center">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search properties"
            className="border p-2 w-full max-w-md"
          />
          <button
            onClick={handleSearch}
            className="bg-primary border p-2 ml-2"
          >
            Search
          </button>
        </div>

        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Browse Properties</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(properties.length > 0 ? properties : dummyProperties).map((property) => (
              <PropertyCard
                key={property.id}
                image={property.image}
                title={property.description}
                location={property.address}
                minInvestment={property.property_price}
                roi={Math.floor(Math.random() * (45 - 5 + 1)) + 5}
                id={property.id}
              />
            ))}
            {properties.length === 0 && dummyProperties.length === 0 && (
              <p className="text-center">No properties found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowsePropertiesPage;

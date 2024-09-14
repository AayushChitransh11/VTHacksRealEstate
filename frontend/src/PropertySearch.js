import React, { useState, useEffect } from 'react';
import { Search, Heart, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// ListingCard component remains the same
const ListingCard = ({ price, beds, baths, sqft, address, description, agent }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <div className="relative">
      <img src="/api/placeholder/400/250" alt="Property" className="w-full h-48 object-cover rounded-t-lg" />
      <button className="absolute top-2 right-2 p-1 bg-white rounded-full">
        <Heart className="w-5 h-5 text-gray-500" />
      </button>
    </div>
    <div className="mt-2">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">${price.toLocaleString()}</span>
        <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">OPEN SUN 12PM - 2PM</span>
      </div>
      <div className="text-sm text-gray-600 mt-1">
        {beds} Beds • {baths} Baths • {sqft.toLocaleString()} Sq Ft
      </div>
      <div className="text-sm font-semibold mt-1">{address}</div>
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
      <div className="flex items-center mt-3">
        <img src="/api/placeholder/40/40" alt={agent.name} className="w-10 h-10 rounded-full mr-2" />
        <div>
          <div className="text-sm font-semibold">{agent.name}</div>
          <div className="text-xs text-gray-600">{agent.company}</div>
        </div>
      </div>
    </div>
  </div>
);

const HomesListingPage = () => {
  // State to store properties
  const [properties, setProperties] = useState([]);

  // Dummy JSON data for initial render
  const dummyData = [
    {
      price: 2895000,
      beds: 2,
      baths: 2.5,
      sqft: 1600,
      address: "425 W 50th St Unit 12G, New York, NY 10019",
      description: "Discover the unparalleled allure of Stella Tower, a masterful creation nestled in the heart of Hell's Kitchen, New York City. Meticulously designed with refined touches and unmatched urban conveniences, this residence offers a lifestyle of...",
      agent: { name: "James May", company: "EXP Realty NYC" },
      latitude: 40.7648,
      longitude: -73.9896
    },
    {
      price: 1349000,
      beds: 3,
      baths: 2,
      sqft: 1450,
      address: "100 W 119th St Unit 7B, New York, NY 10026",
      description: "Meticulously designed as a two bedroom with dual living rooms, this penthouse apartment easily converts back to a three or four bedroom unit. Wrapped in eastern windows and bathed in light, this condo ticks all the boxes...",
      agent: { name: "Caryl Berenato", company: "Compass" },
      latitude: 42.8047,
      longitude: -76.9654
    },
    {
        price: 1349000,
        beds: 3,
        baths: 2,
        sqft: 1450,
        address: "100 W 119th St Unit 7B, New York, NY 10026",
        description: "Meticulously designed as a two bedroom with dual living rooms, this penthouse apartment easily converts back to a three or four bedroom unit. Wrapped in eastern windows and bathed in light, this condo ticks all the boxes...",
        agent: { name: "Caryl Berenato", company: "Compass" },
        latitude: 41.8047,
        longitude: -73.9654
      },
      {
        price: 1349000,
        beds: 3,
        baths: 2,
        sqft: 1450,
        address: "100 W 119th St Unit 7B, New York, NY 10026",
        description: "Meticulously designed as a two bedroom with dual living rooms, this penthouse apartment easily converts back to a three or four bedroom unit. Wrapped in eastern windows and bathed in light, this condo ticks all the boxes...",
        agent: { name: "Caryl Berenato", company: "Compass" },
        latitude: 40.3047,
        longitude: -73.1654
      }
      ,
      {
        price: 1349000,
        beds: 3,
        baths: 2,
        sqft: 1450,
        address: "100 W 119th St Unit 7B, New York, NY 10026",
        description: "Meticulously designed as a two bedroom with dual living rooms, this penthouse apartment easily converts back to a three or four bedroom unit. Wrapped in eastern windows and bathed in light, this condo ticks all the boxes...",
        agent: { name: "Caryl Berenato", company: "Compass" },
        latitude: 40.0047,
        longitude: -73.0654
      }
  ];

  // Simulate API call with useEffect
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchProperties = async () => {
      // Simulating network delay
      setTimeout(() => {
        // Initialize state with dummy data
        setProperties(dummyData);
      }, 1000);
    };

    fetchProperties();
  }, []);

  // Default map center (average location for the properties)
  const mapCenter = [40.784, -73.974];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-orange-500">Homes.com</div>
          <div className="text-sm">
            <span className="text-orange-500">Register</span> / <span className="text-orange-500">Sign In</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="New York, NY"
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium">Price</button>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium">Beds / Baths</button>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium">Home Type</button>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium">All Filters</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">Save Search</button>
        </div>

        <div className="flex">
          <div className="w-1/2 pr-4">
            {/* Render properties dynamically */}
            {properties.length > 0 ? (
              properties.map((property, index) => (
                <ListingCard
                  key={index}
                  price={property.price}
                  beds={property.beds}
                  baths={property.baths}
                  sqft={property.sqft}
                  address={property.address}
                  description={property.description}
                  agent={property.agent}
                />
              ))
            ) : (
              <p>Loading properties...</p>
            )}
          </div>
          <div className="w-1/2">
            {/* Integrating the Leaflet map */}
            <MapContainer
              center={mapCenter}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: '600px', width: '100%', borderRadius: '0.5rem' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {properties.map((property, index) => (
                <Marker key={index} position={[property.latitude, property.longitude]}>
                  <Popup>
                    <strong>{property.address}</strong><br />
                    ${property.price.toLocaleString()}<br />
                    {property.beds} Beds • {property.baths} Baths
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
     
        </main>
    </div>
  );
};

export default HomesListingPage;

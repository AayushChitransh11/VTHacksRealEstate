import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PropertyHeader = ({ title, location, type, goal }) => (
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold mb-2">{title}</h1>
    <div className="flex justify-center items-center space-x-2 text-gray-600">
      <span>{location}</span>
      <span>•</span>
      <span>{type}</span>
      <span>•</span>
      <span>Goal: ${goal.toLocaleString()}</span>
    </div>
    <button className="bg-blue-600 text-white py-3 px-6 mt-4 rounded">Invest Now</button>
  </div>
);

const PropertyCarousel = ({ images }) => (
  <div className="relative w-full h-96 mb-8">
    <img src={images[0]} alt="Property Image" className="w-full h-full object-cover rounded-lg" />
    {/* Add carousel logic here */}
  </div>
);

const InvestmentMetrics = ({ currentFunding, targetAmount, remainingTime, investors, minInvestment }) => (
  <div className="bg-white shadow-md p-6 rounded-lg">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div>
        <p className="text-sm text-gray-500">Current Funding</p>
        <p className="text-2xl font-bold">${currentFunding.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Target Amount</p>
        <p className="text-2xl font-bold">${targetAmount.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Time Left</p>
        <p className="text-2xl font-bold">{remainingTime} days</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Investors</p>
        <p className="text-2xl font-bold">{investors}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Minimum Investment</p>
        <p className="text-2xl font-bold">${minInvestment.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Progress</p>
        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-blue-600"
            style={{ width: `${(currentFunding / targetAmount) * 100}%` }}
          />
        </div>
      </div>
    </div>
  </div>
);

const PropertyDetails = ({ description, features, propertyData }) => (
  <div className="bg-white shadow-md p-6 rounded-lg">
    <h2 className="text-2xl font-bold mb-4">Property Details</h2>
    <p className="mb-4">{description}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <p>Home Type: {propertyData.homeType}</p>
      <p>Size: {propertyData.homeSize}</p>
      <p>Year Built: {propertyData.yearBuilt}</p>
      <p>HOA Fees: {propertyData.hoaFees}</p>
      <p>Days on Market: {propertyData.daysOnMarket}</p>
      <p>Lot Size: {propertyData.lotSize}</p>
    </div>
    <h3 className="font-semibold mb-2">Key Features:</h3>
    <ul className="list-disc list-inside">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  </div>
);

const InvestmentForm = ({ minInvestment, maxInvestment }) => {
  const [investmentAmount, setInvestmentAmount] = useState(minInvestment);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Make Your Investment</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Investment Amount
        </label>
        <input
          type="number"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>
      <div className="flex justify-between mb-4 text-sm text-gray-500">
        <span>Min: ${minInvestment}</span>
        <span>Max: ${maxInvestment}</span>
      </div>
      <p className="mb-4 text-sm">Your Ownership Percentage</p>
      <p className="text-2xl font-bold mb-4">
        {((investmentAmount / maxInvestment) * 100).toFixed(2)}%
      </p>
      <a href="/confirmInvestment" className="text-blue-600 underline">
        Confirm Investment
      </a>
    </div>
  );
};



const PropertyPage = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (propertyId) {
      axios.get(`http://127.0.0.1:5000/properties/${propertyId}`)
        .then(response => {
          setProperty(response.data);
        })
        .catch(err => {
          setError('Failed to fetch property data');
          console.error(err);
        });
    }
  }, [propertyId]);

  if (error) return <div>{error}</div>;
  if (!property) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <PropertyHeader
          title={property.property_name}
          location={property.address}
          type={property.property_location}
          goal={property.property_price}
        />
        <PropertyCarousel images={['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2']} />
        <InvestmentMetrics
          currentFunding={property.totalprice}
          targetAmount={property.property_price}
          remainingTime={45} // This should be calculated based on your data
          investors={75} // You may need to fetch or calculate this
          minInvestment={5000} // Adjust based on your actual data
        />
        <PropertyDetails
          description={property.description}
          features={property.propertyDetails.additionalFeatures}
          propertyData={{
            homeType: property.propertyDetails.homeType,
            homeSize: `${property.sqft} sqft`,
            yearBuilt: property.propertyDetails.yearBuilt,
            hoaFees: property.propertyDetails.hoaFees,
            daysOnMarket: property.daysOnMarket,
            lotSize: 'N/A' // Adjust based on your data
          }}
        />
        <InvestmentForm
          minInvestment={5000} // Adjust based on your actual data
          maxInvestment={property.property_price}
        />
      </main>
      <Footer />
    </div>
  );
};

export default PropertyPage;

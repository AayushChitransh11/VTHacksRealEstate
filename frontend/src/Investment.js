// src/InvestmentPage.js
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import Header from './Header';
import Footer from './Footer';

const InvestmentPage = ({ property }) => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInvestment = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  // Ensure property is defined before accessing its properties
  const title = property?.title || 'Property Title';
  const description = property?.description || 'Property Description';
  const homeType = property?.propertyData?.homeType || 'N/A';
  const homeSize = property?.propertyData?.homeSize || 'N/A';
  const yearBuilt = property?.propertyData?.yearBuilt || 'N/A';
  const hoaFees = property?.propertyData?.hoaFees || 'N/A';
  const daysOnMarket = property?.propertyData?.daysOnMarket || 'N/A';
  const lotSize = property?.propertyData?.lotSize || 'N/A';
  const features = property?.features || [];
  const minInvestment = property?.investmentDetails?.minInvestment || 0;
  const targetAmount = property?.investmentDetails?.targetAmount || 0;

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Invest in {title}</h1>

        {/* Property Details */}
        <div className="bg-white shadow-md p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Property Details</h2>
          <p className="mb-4">{description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <p>Home Type: {homeType}</p>
            <p>Size: {homeSize}</p>
            <p>Year Built: {yearBuilt}</p>
            <p>HOA Fees: {hoaFees}</p>
            <p>Days on Market: {daysOnMarket}</p>
            <p>Lot Size: {lotSize}</p>
          </div>
          <h3 className="font-semibold mb-2">Key Features:</h3>
          <ul className="list-disc list-inside">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Investment Form */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Investment Form</h2>
          {isSuccess ? (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg">
              <p className="text-lg font-semibold">Investment Successful!</p>
              <p className="mt-2">Thank you for your investment. You will receive a confirmation email with further details.</p>
            </div>
          ) : (
            <form onSubmit={handleInvestment}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount
                </label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  min={minInvestment}
                  max={targetAmount}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div className="flex justify-between mb-4 text-sm text-gray-500">
                <span>Min: ${minInvestment}</span>
                <span>Max: ${targetAmount}</span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 text-white py-2 px-4 rounded w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Confirm Investment'}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Define PropTypes for the component
InvestmentPage.propTypes = {
  property: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    propertyData: PropTypes.shape({
      homeType: PropTypes.string,
      homeSize: PropTypes.string,
      yearBuilt: PropTypes.string,
      hoaFees: PropTypes.string,
      daysOnMarket: PropTypes.string,
      lotSize: PropTypes.string,
    }),
    features: PropTypes.arrayOf(PropTypes.string),
    investmentDetails: PropTypes.shape({
      minInvestment: PropTypes.number,
      targetAmount: PropTypes.number,
    }),
  }),
};

// Set default values for props
InvestmentPage.defaultProps = {
  property: {
    title: 'Property Title',
    description: 'Property Description',
    propertyData: {
      homeType: 'N/A',
      homeSize: 'N/A',
      yearBuilt: 'N/A',
      hoaFees: 'N/A',
      daysOnMarket: 'N/A',
      lotSize: 'N/A',
    },
    features: [],
    investmentDetails: {
      minInvestment: 0,
      targetAmount: 0,
    },
  },
};

export default InvestmentPage;

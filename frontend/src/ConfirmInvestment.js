// src/ConfirmInvestment.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const ConfirmInvestment = ({ property = {}, investmentAmount = 0 }) => {
  // Fallback values if property is undefined or incomplete
  const propertyTitle = property.title || 'Unknown Property';
  const propertyLocation = property.location || 'Unknown Location';
  const propertyGoal = property.goal || 1; // Avoid division by zero
  const ownershipPercentage = ((investmentAmount / propertyGoal) * 100).toFixed(2);

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <div className="bg-white shadow-md p-6 rounded-lg max-w-2xl mx-auto mt-8">
          <h1 className="text-3xl font-bold text-center mb-4">Thank You for Your Investment!</h1>
          
          <p className="text-center text-lg text-gray-600 mb-4">
            Your investment in <span className="font-semibold">{propertyTitle}</span> has been successfully processed.
          </p>
          
          <div className="border-t border-b py-4 mb-4">
            <h2 className="text-2xl font-bold text-center">Investment Summary</h2>
            <div className="flex justify-between mt-4">
              <p className="text-gray-600">Property</p>
              <p className="font-semibold">{propertyTitle}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-gray-600">Location</p>
              <p className="font-semibold">{propertyLocation}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-gray-600">Investment Amount</p>
              <p className="font-semibold">${investmentAmount.toLocaleString()}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-gray-600">Your Ownership Percentage</p>
              <p className="font-semibold">{ownershipPercentage}%</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Next Steps</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>You will receive a confirmation email with the details of your investment.</li>
              <li>Track your investment and get updates in your <a href="/dashboard" className="text-blue-600">Investor Dashboard</a>.</li>
              <li>If you have any questions or need support, <a href="/contact" className="text-blue-600">contact our support team</a>.</li>
            </ul>
          </div>

          <div className="text-center mt-6">
            <a href="/property" className="text-blue-600 underline">
              Back to Properties
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConfirmInvestment;

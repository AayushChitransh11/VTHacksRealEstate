// src/InvestmentForm.js
import React, { useState } from 'react';

const InvestmentForm = ({ minInvestment, maxInvestment, onSubmit }) => {
  const [investmentAmount, setInvestmentAmount] = useState(minInvestment);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (investmentAmount < minInvestment || investmentAmount > maxInvestment) {
      alert(`Investment amount must be between ${minInvestment} and ${maxInvestment}`);
      return;
    }
    onSubmit(investmentAmount); // Call the parent handler with investment amount
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Make Your Investment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Amount
          </label>
          <input
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
            min={minInvestment}
            max={maxInvestment}
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
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          Confirm Investment
        </button>
      </form>
    </div>
  );
};

export default InvestmentForm;

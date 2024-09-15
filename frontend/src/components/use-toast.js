import React from 'react';

// Toast component
export const toast = ({ className, children }) => (
  <div className={`fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

// ToastHeader component
export const ToastHeader = ({ className, title }) => (
  <div className={`flex items-center justify-between ${className}`}>
    <span className="font-semibold text-lg">{title}</span>
  </div>
);

// ToastBody component
export const ToastBody = ({ className, children }) => (
  <div className={`mt-2 ${className}`}>
    {children}
  </div>
);

// ToastButton component
export const ToastButton = ({ className, onClick, children }) => (
  <button 
    className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg ${className}`} 
    onClick={onClick}
  >
    {children}
  </button>
);

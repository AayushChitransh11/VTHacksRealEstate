import React from 'react';

export const Button = ({ className, onClick, children, variant = 'primary', disabled = false }) => {
  // Define styles for different button variants
  const baseStyles = 'px-4 py-2 font-semibold rounded transition-colors duration-300';
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    // Add more variants as needed
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

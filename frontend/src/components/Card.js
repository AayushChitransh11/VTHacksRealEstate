import React from 'react';

export const Card = ({ className, children }) => (
  <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ className, children }) => (
  <div className={`border-b border-gray-200 pb-2 mb-2 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ className, children }) => (
  <h2 className={`text-xl font-semibold ${className}`}>
    {children}
  </h2>
);

export const CardDescription = ({ className, children }) => (
  <p className={`text-gray-600 ${className}`}>
    {children}
  </p>
);

export const CardContent = ({ className, children }) => (
  <div className={`mt-2 ${className}`}>
    {children}
  </div>
);

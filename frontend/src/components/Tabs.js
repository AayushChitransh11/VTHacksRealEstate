import React, { useState } from 'react';

export const Tabs = ({ className, children }) => (
  <div className={`tabs-container ${className}`}>
    {children}
  </div>
);

export const TabsList = ({ className, children }) => (
  <div className={`flex border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

export const TabsTrigger = ({ className, active, onClick, children }) => (
  <button
    className={`px-4 py-2 -mb-px border-b-2 ${active ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'} ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export const TabsContent = ({ className, children }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

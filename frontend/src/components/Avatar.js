import React from 'react';

export const Avatar = ({ className, children }) => (
  <div className={`relative inline-block ${className}`}>
    {children}
  </div>
);

export const AvatarImage = ({ className, src, alt }) => (
  <img className={`w-10 h-10 rounded-full object-cover ${className}`} src={src} alt={alt} />
);

export const AvatarFallback = ({ className, children }) => (
  <div className={`w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white ${className}`}>
    {children}
  </div>
);

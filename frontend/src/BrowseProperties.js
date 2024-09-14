import React, { useState } from 'react';

const Header = () => (
  <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
    <a href="/" className="flex items-center space-x-2">
      <i className="h-8 w-8 text-primary">🏢</i>
      <span className="text-xl font-bold">RealtyChain</span>
    </a>
    <nav className="hidden md:flex space-x-4">
      <a href="/browse" className="text-sm font-medium hover:text-primary">Browse Properties</a>
      <a href="/how-it-works" className="text-sm font-medium hover:text-primary">How It Works</a>
      <a href="/investors" className="text-sm font-medium hover:text-primary">Investors Portal</a>
      <a href="/developers" className="text-sm font-medium hover:text-primary">Developers Portal</a>
      <a href="/help" className="text-sm font-medium hover:text-primary">Help/FAQ</a>
    </nav>
    <div className="flex space-x-2">
      <button className="border px-4 py-2">Log In</button>
      <button className="bg-primary px-4 py-2 text-white">Sign Up</button>
    </div>
  </header>
);

const FiltersAndSorting = () => (
  <div className="bg-gray-100 p-4 rounded-lg mb-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <select className="p-2 border border-gray-300 rounded">
        <option value="">Location</option>
        <option value="usa">United States</option>
        <option value="europe">Europe</option>
        <option value="asia">Asia</option>
      </select>
      <select className="p-2 border border-gray-300 rounded">
        <option value="">Property Type sdjk</option>
        <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
        <option value="retail">Retail</option>
      </select>
      <select className="p-2 border border-gray-300 rounded">
        <option value="">Status</option>
        <option value="available">Available</option>
        <option value="in-progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
    </div>
    <div className="mb-4">
      <label className="text-sm font-medium mb-1 block">Investment Range</label>
      <input type="range" min="0" max="1000000" step="1000" className="w-full" />
    </div>
    <div className="mb-4">
      <label className="text-sm font-medium mb-1 block">Expected ROI</label>
      <input type="range" min="0" max="30" step="1" className="w-full" />
    </div>
    <div className="flex justify-between items-center">
      <select className="p-2 border border-gray-300 rounded">
        <option value="">Sort by</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="roi-desc">ROI: High to Low</option>
        <option value="date-desc">Newest First</option>
      </select>
      <div>
        <button className="border px-4 py-2 mr-2">Reset</button>
        <button className="bg-primary text-white px-4 py-2">Apply Filters</button>
      </div>
    </div>
  </div>
);

const PropertyCard = ({ image, title, location, minInvestment, roi }) => (
  <div className="bg-white shadow-lg rounded-lg mb-4">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-muted mb-2">{location}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm">Min. Investment: ${minInvestment}</span>
        <span className="text-sm font-semibold text-green-600">ROI: {roi}%</span>
      </div>
    </div>
    <div className="p-4 bg-gray-900">
      <button className="w-full bg-primary text-white py-2 rounded">View Details</button>
    </div>
  </div>
);

const BrowsePropertiesPage = () => (
  <div>
    <Header />
    <div className="container mx-auto px-4 py-8">
      <FiltersAndSorting />
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Browse Properties</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PropertyCard
            image="https://miamisrr.com/wp-content/uploads/2023/05/regis-1.jpg"
            title="Luxury Condo in Miami"
            location="Miami, FL"
            minInvestment={5000}
            roi={12}
          />
          <PropertyCard
            image="https://images1.loopnet.com/i2/rzDC47-GS5PeVDMS5Xmj4Gnp6gFFc8dQ_PQFK4xXx4M/112/44-Exchange-Place-New-York-NY-Building-Photo-1-HighDefinition.jpg"
            title="Commercial Complex in NYC"
            location="New York, NY"
            minInvestment={10000}
            roi={15}
          />
          <PropertyCard
            image="https://www.balivillas.com/images/villa/URID21914832001-TVG-Main.jpg"
            title="Beachfront Villa in Bali"
            location="Bali, Indonesia"
            minInvestment={2000}
            roi={18}
          />
        </div>
      </div>
    </div>
  </div>
);

export default BrowsePropertiesPage;

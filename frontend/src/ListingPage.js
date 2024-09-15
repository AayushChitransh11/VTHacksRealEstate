import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Home, Building, Wrench, FileText, MapPin, Users } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const ListingPage = () => {
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the 'id' from the URL
  const url = `http://127.0.0.1:5000/properties/${id}`; // Construct the API URL

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setListingData(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListingData();
  }, [url]); // Dependency on 'url' to refetch if it changes

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!listingData) {
    return <div className="text-center">No listing data available.</div>;
  }

  const price = listingData.property_price ? listingData.property_price.toLocaleString() : 'N/A';
  const estimatedPayment = listingData.estimatedRent ? listingData.estimatedRent.toLocaleString() : 'N/A';
  const pricePerSqft = listingData.pricePerSqft ? listingData.pricePerSqft.toLocaleString() : 'N/A';

  return (
    <div>
      <Header />

      <div className="max-w-5xl mx-auto p-4">
        {/* Images Placeholder */}
        <div className="grid grid-cols-3 gap-4 mb-4">
        <img src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Living Room" className="col-span-2 row-span-2 w-full h-full object-cover rounded-lg" />
        <img src="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Kitchen" className="w-full h-full object-cover rounded-lg" />
        <img src="https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Bedroom" className="w-full h-full object-cover rounded-lg" />
      </div>

        {/* Price and Address */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold">${price}</h2>
            <p className="text-gray-600">{listingData.address}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Estimated payment</p>
            <p className="text-xl">${estimatedPayment}/month</p>
          </div>
        </div>

        {/* Beds, Baths, Sq Ft */}
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4">
            <div className="text-center">
              <p className="font-semibold">{listingData.beds}</p>
              <p className="text-sm text-gray-600">Bed</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{listingData.baths}</p>
              <p className="text-sm text-gray-600">Bath</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{listingData.sqft}</p>
              <p className="text-sm text-gray-600">Sq Ft</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">${pricePerSqft}</p>
            <p className="text-sm text-gray-600">Price per Sq Ft</p>
          </div>
        </div>

        {/* Crowdfunding Button */}
        <div className="mt-4 text-right">
          <Link
            to={`/property/${id}`}
            className="bg-blue-600 text-white w-full px-6 py-4 rounded-lg font-semibold hover:bg-blue-700"
          >
            Start Crowdfunding
          </Link>
        </div>

        {/* Open House Schedule */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Open House Schedule</h3>
          <div className="bg-blue-100 p-4 rounded-lg flex items-center">
            <Calendar className="mr-4" />
            <div>
              <p className="font-semibold">Appointment Only Open House</p>
              <p>{listingData.EndDate.date || 'N/A'}</p>
              <p>{listingData.EndDate.time || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Activity</h3>
          <div className="flex items-center">
            <Clock className="mr-2" />
            <p><span className="font-semibold">Days On Market:</span> {listingData.daysOnMarket || 'N/A'}</p>
          </div>
        </div>

        {/* Property Details */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Property Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start">
              <Home className="mr-2 mt-1" />
              <div>
                <p className="font-semibold">Home Type</p>
                <p>{listingData.propertyDetails.homeType || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Building className="mr-2 mt-1" />
              <div>
                <p className="font-semibold">Home Design</p>
                <p>{listingData.propertyDetails.homeDesign || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Wrench className="mr-2 mt-1" />
              <div>
                <p className="font-semibold">Year Built</p>
                <p>{listingData.propertyDetails.yearBuilt || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-start">
              <FileText className="mr-2 mt-1" />
              <div>
                <p className="font-semibold">HOA Fees</p>
                <p>{listingData.propertyDetails.hoaFees || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Additional Features</h4>
            <ul className="list-disc list-inside">
              {listingData.propertyDetails.additionalFeatures?.map((feature, index) => (
                <li key={index}>{feature}</li>
              )) || 'N/A'}
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Listing Details</h4>
            <ul className="list-disc list-inside">
              {listingData.propertyDetails.listingDetails?.map((detail, index) => (
                <li key={index}>{detail}</li>
              )) || 'N/A'}
            </ul>
          </div>
        </div>

        {/* Community Details */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Community Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start">
              <MapPin className="mr-2 mt-1" />
              <div>
                <p className="font-semibold">Community Overview</p>
                <ul className="list-disc list-inside">
                  {listingData.communityDetails.overview?.map((item, index) => (
                    <li key={index}>{item}</li>
                  )) || 'N/A'}
                </ul>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="mr-2 mt-1" />
              <div>
                <p className="font-semibold">Community Amenities</p>
                <ul className="list-disc list-inside">
                  {listingData.communityDetails.amenities?.map((item, index) => (
                    <li key={index}>{item}</li>
                  )) || 'N/A'}
                </ul>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="mr-2 mt-1" />
              <div>
                <p className="font-semibold">Pet Policy</p>
                <p>{listingData.communityDetails.petPolicy || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Description</h3>
          <p>{listingData.description || 'N/A'}</p>
        </div>

        {/* Agent Details */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Agent Details</h3>
          <div className="flex items-center">
            <div>
              <p className="font-semibold">Agent Name</p>
              <p>{listingData.agent?.name || 'N/A'}</p>
              <p className="font-semibold">Phone</p>
              <p>{listingData.agent?.phone || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListingPage;

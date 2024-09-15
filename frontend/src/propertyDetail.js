import React, { useState, useEffect } from 'react';
import { Camera, Heart, Share2, MapPin, Calendar, Clock, Home, Building, Wrench, FileText, Users, Shield } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

// Dummy data object
const dummyData = {
  propertyName: "Seward Park Housing",
  address: "385 Grand St Unit L 605, New York, NY 10002",
  price: 615000,
  estimatedPayment: 4768,
  beds: 1,
  baths: 1,
  sqft: 725,
  pricePerSqft: 848,
  highlights: ["Hot Property", "Full Time Doorman", "Pets Allowed In Building", "P.S. 42 Benjamin Altman Rated A-"],
  description: "Spacious 1 bedroom apartment in the highly sought after Seward Park co-op!...",
  agent: {
    name: "Jacob Goldman",
    phone: "(646) 971-0915"
  },
  openHouse: {
    date: "Sunday, September 15, 2024",
    time: "10:30 am to 3:30 pm"
  },
  daysOnMarket: 156,
  propertyDetails: {
    homeType: "Co-Op",
    homeDesign: "725 Sq Ft Home",
    yearBuilt: "Built in 1960",
    hoaFees: "$925 Monthly Fees",
    additionalFeatures: ["Laundry on main level", "6.74 Acre Lot"],
    listingDetails: [
      "23 Shares in the Co-Op",
      "Property Available on 4/11/24",
      "Legal Lot and Block 13 / 311"
    ]
  },
  communityDetails: {
    overview: ["893 Units", "2 Elevators", "Lower East Side Subdivision", "21-Story Property"],
    amenities: ["Full Time Doorman"],
    petPolicy: "Pets Allowed In Building"
  }
};

const ListingPage = () => {
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        setTimeout(async () => {
          setListingData(dummyData); // Using dummy data for now
          setLoading(false);
        }, 2000); // Simulating a 2-second API call
      } catch (error) {
        console.error('Error fetching listing data:', error);
        setLoading(false);
      }
    };

    fetchListingData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!listingData) {
    return <div className="text-center">Failed to load listing data.</div>;
  }

  return (
    <div>
    <Header />

    <div className="max-w-5xl mx-auto p-4">
      {/* <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{listingData.propertyName}</h1>
        <div className="flex space-x-2">
          <button className="p-2 bg-gray-200 rounded-full"><Camera size={20} /></button>
          <button className="p-2 bg-gray-200 rounded-full"><Heart size={20} /></button>
          <button className="p-2 bg-gray-200 rounded-full"><Share2 size={20} /></button>
        </div>
      </header> */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <img src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Living Room" className="col-span-2 row-span-2 w-full h-full object-cover rounded-lg" />
        <img src="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Kitchen" className="w-full h-full object-cover rounded-lg" />
        <img src="https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Bedroom" className="w-full h-full object-cover rounded-lg" />
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold">${listingData.price.toLocaleString()}</h2>
          <p className="text-gray-600">{listingData.address}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">Estimated payment</p>
          <p className="text-xl">${listingData.estimatedPayment.toLocaleString()}/month</p>
        </div>
      </div>

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
          <p className="font-semibold">${listingData.pricePerSqft}</p>
          <p className="text-sm text-gray-600">Price per Sq Ft</p>
        </div>
      </div>
        <div className="mt-4 text-right">
          <button
            onClick={() => window.location.href = `/property/`}
            className="bg-blue-600 text-white w-full px-6 py-4 rounded-lg font-semibold hover:bg-blue-700"
          >
            Start Crowdfunding
          </button>
        </div>
        

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Open House Schedule</h3>
        <div className="bg-blue-100 p-4 rounded-lg flex items-center">
          <Calendar className="mr-4" />
          <div>
            <p className="font-semibold">Appointment Only Open House</p>
            <p>{listingData.openHouse.date}</p>
            <p>{listingData.openHouse.time}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Activity</h3>
        <div className="flex items-center">
          <Clock className="mr-2" />
          <p><span className="font-semibold">Days On Market:</span> {listingData.daysOnMarket}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Property Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start">
            <Home className="mr-2 mt-1" />
            <div>
              <p className="font-semibold">Home Type</p>
              <p>{listingData.propertyDetails.homeType}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Building className="mr-2 mt-1" />
            <div>
              <p className="font-semibold">Home Design</p>
              <p>{listingData.propertyDetails.homeDesign}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Wrench className="mr-2 mt-1" />
            <div>
              <p className="font-semibold">Year Built</p>
              <p>{listingData.propertyDetails.yearBuilt}</p>
            </div>
          </div>
          <div className="flex items-start">
            <FileText className="mr-2 mt-1" />
            <div>
              <p className="font-semibold">HOA Fees</p>
              <p>{listingData.propertyDetails.hoaFees}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Additional Features</p>
          <ul className="list-disc list-inside">
            {listingData.propertyDetails.additionalFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Listing and Financial Details</p>
          <ul className="list-disc list-inside">
            {listingData.propertyDetails.listingDetails.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Community Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start">
            <Users className="mr-2 mt-1" />
            <div>
              <p className="font-semibold">Community Overview</p>
              <ul className="list-disc list-inside">
                {listingData.communityDetails.overview.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-start">
            <Shield className="mr-2 mt-1" />
            <div>
              <p className="font-semibold">Amenities</p>
              <ul className="list-disc list-inside">
                {listingData.communityDetails.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Pet Policy</p>
          <p>{listingData.communityDetails.petPolicy}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ListingPage;

//import React from 'react';
import { useState, useEffect } from 'react';
import { useAuthInfo, useLogoutFunction, useRedirectFunctions } from '@propelauth/react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';




const Button = ({ onClick, children, className = '' }) => (
  <button onClick={onClick} className={`px-6 py-3 ${className}`}>
    {children}
  </button>
);

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-primary to-primary-foreground text-white bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src='/Hero.jpg'
          alt="Real Estate Investment"
          className="object-cover w-full h-full opacity-60"
        />
      </div>
      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-5xl font-bold">
          Democratizing Real Estate Investment Through Fintech
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Invest in premium properties with as little as $100. Powered by blockchain and AI.
        </p>
        <div className="flex justify-center space-x-4">
          {/* Navigate to the browse page */}
          <Button
            onClick={() => navigate('/browse')}
            className="bg-white text-primary hover:bg-gray-100 text-black"
          >
            Get Started
          </Button>

          {/* Action for watching the video */}
          <Button
            onClick={() => alert('Watch video')}
            className="border-white text-white border hover:bg-white hover:text-black"
          >
            <i className="mr-2">▶️</i> Watch How It Works
          </Button>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <div className="flex items-center space-x-2">
      {icon}
      <h3 className="font-bold text-lg">{title}</h3>
    </div>
    <p>{description}</p>
  </div>
);

const FeaturesSection = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={<i className="text-primary">📊</i>}
          title="Fractional Ownership"
          description="Own a piece of premium real estate with blockchain-backed fractional ownership."
        />
        <FeatureCard
          icon={<i className="text-primary">💵</i>}
          title="AI-Powered Evaluation"
          description="Make informed decisions with our AI-driven property analysis and market predictions."
        />
        <FeatureCard
          icon={<i className="text-primary">🔒</i>}
          title="Secure Digital Wallets"
          description="Manage your investments and earnings with our secure blockchain-based digital wallets."
        />
        <FeatureCard
          icon={<i className="text-primary">⭐</i>}
          title="Automated Dividends"
          description="Receive your share of rental income and property appreciation automatically."
        />
      </div>
    </div>
  </section>
);

const PropertyCard = ({ image, title, location, minInvestment, roi, id }) => (
  <div className="bg-white shadow-lg rounded-lg">
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
      <a href={`/listing/${id}`} className="block w-full bg-primary text-white py-2 rounded text-center">
      View Details
      </a>
      {/* <button className="w-full bg-primary text-white py-2 rounded">View Details</button> */}
    </div>
  </div>
);

const PopularPropertiesSection = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Popular Properties</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PropertyCard
          image="https://miamisrr.com/wp-content/uploads/2023/05/regis-1.jpg"
          title="Luxury Condo in Miami"
          location="Miami, FL"
          minInvestment={5000}
          roi={12}
          id={1}
        />
        <PropertyCard
          image="https://images1.loopnet.com/i2/rzDC47-GS5PeVDMS5Xmj4Gnp6gFFc8dQ_PQFK4xXx4M/112/44-Exchange-Place-New-York-NY-Building-Photo-1-HighDefinition.jpg"
          title="Commercial Complex in NYC"
          location="New York, NY"
          minInvestment={10000}
          roi={15}
          id={2}
        />
        <PropertyCard
          image="https://www.balivillas.com/images/villa/URID21914832001-TVG-Main.jpg"
          title="Beachfront Villa in Bali"
          location="Bali, Indonesia"
          minInvestment={2000}
          roi={18}
          id={3}
        />
      </div>
    </div>
  </section>
);

const TestimonialCard = ({ name, role, quote }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <p className="italic mb-4">"{quote}"</p>
    <div>
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-muted">{role}</p>
    </div>
  </div>
);

const TestimonialsSection = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Investors Say</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TestimonialCard
          name="John Doe"
          role="Investor"
          quote="HomeRun has revolutionized the way I invest in real estate. The fractional ownership model allows me to diversify my portfolio like never before."
        />
        <TestimonialCard
          name="Jane Smith"
          role="Property Developer"
          quote="As a developer, HomeRun has opened up new avenues for funding our projects. The platform's transparency and efficiency are unmatched."
        />
        <TestimonialCard
          name="Mike Johnson"
          role="First-time Investor"
          quote="I never thought I could invest in real estate with such a small amount. HomeRun has made it possible for me to start building my wealth."
        />
      </div>
    </div>
  </section>
);

// const Home = () => {
//   const { isLoggedIn } = useAuthInfo();

//   return (
//     <div>
//       <Header />
//       <HeroSection />
//       <FeaturesSection />
//       <PopularPropertiesSection />
//       <TestimonialsSection />
//       <Footer />
//     </div>
//   );
// };

// export default Home;


const Home = () => {
  const { isLoggedIn } = useAuthInfo();
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/data')  // Updated URL to Flask backend
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBackendData(data.message);  // Assuming the response has a `message` key
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Backend Connection Test</h1>
      {backendData ? (
        <p>Backend says: {backendData}</p>
      ) : (
        <p>Loading data from backend...</p>
      )}
      {/* Your existing UI components */}
    </div>
  );
};

export default Home;

import React from 'react';
import { withAuthInfo, useRedirectFunctions, useLogoutFunction } from '@propelauth/react'
const logoutFunction = useLogoutFunction()
const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions()
const headerlogin = () => {
  if(props.isLoggedIn){
    return(<>
      <button className="border px-4 py-2 red">Log Out</button>
      </>)}
      else{
        return(<>
          <button onClick={redirectToLoginPage} className="border px-4 py-2">Log In</button>
          <button onClick={redirectToSignupPage} className="bg-primary px-4 py-2 text-white">Sign Up</button></>)
      }
    }
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
      <headerlogin/>
      <button className="border px-4 py-2">Log In</button>
      <button className="bg-primary px-4 py-2 text-white">Sign Up</button>
    </div>
  </header>
)

const HeroSection = () => (
  <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-primary to-primary-foreground text-white">
    <div className="absolute inset-0 overflow-hidden">
      <img src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQ4SWiqtVVgnVF8q4da6i0-XgT3lGryJGHFZLi4iVc3fqAJlGERHeOP4uoNG0G8X-zAi8u_jUtnH3gsnqALzkTwL8K_q6hji0K6C7JjnQ" alt="Real Estate Investment" className="object-cover w-full h-full opacity-80" />
    </div>
    <div className="relative z-10 text-center space-y-6">

      <h1 className="text-5xl font-bold">Democratizing Real Estate Investment Through Fintech</h1>
      <p className="text-xl max-w-2xl mx-auto">Invest in premium properties with as little as $100. Powered by blockchain and AI.</p>
      <div className="flex justify-center space-x-4">
        <button className="bg-white text-primary hover:bg-gray-100 px-6 py-3">Get Started</button>
        <button className="border-white hover:bg-white hover:text-primary px-6 py-3 text-white border">
          <i className="mr-2">▶️</i> Watch How It Works
        </button>
      </div>
    </div>
  </section>
)

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <div className="flex items-center space-x-2">
      {icon}
      <h3 className="font-bold text-lg">{title}</h3>
    </div>
    <p>{description}</p>
  </div>
)

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
)

const PropertyCard = ({ image, title, location, minInvestment, roi }) => (
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
    <div className="p-4">
      <button className="w-full bg-primary text-white py-2 rounded">View Details</button>
    </div>
  </div>
)

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
  </section>
)

const TestimonialCard = ({ name, role, quote }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <p className="italic mb-4">"{quote}"</p>
    <div>
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-muted">{role}</p>
    </div>
  </div>
)

const TestimonialsSection = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Investors Say</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TestimonialCard
          name="John Doe"
          role="Investor"
          quote="RealtyChain has revolutionized the way I invest in real estate. The fractional ownership model allows me to diversify my portfolio like never before."
        />
        <TestimonialCard
          name="Jane Smith"
          role="Property Developer"
          quote="As a developer, RealtyChain has opened up new avenues for funding our projects. The platform's transparency and efficiency are unmatched."
        />
        <TestimonialCard
          name="Mike Johnson"
          role="First-time Investor"
          quote="I never thought I could invest in real estate with such a small amount. RealtyChain has made it possible for me to start building my wealth."
        />
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">RealtyChain</h3>
          <p className="text-sm text-gray-400">Democratizing real estate investment through blockchain and AI.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/browse" className="text-sm hover:text-primary">Browse Properties</a></li>
            <li><a href="/how-it-works" className="text-sm hover:text-primary">How It Works</a></li>
            <li><a href="/investors" className="text-sm hover:text-primary">Investors Portal</a></li>
            <li><a href="/developers" className="text-sm hover:text-primary">Developers Portal</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li><a href="/help" className="text-sm hover:text-primary">Help/FAQ</a></li>
            <li><a href="/contact" className="text-sm hover:text-primary">Contact Us</a></li>
            <li><a href="/terms" className="text-sm hover:text-primary">Terms of Service</a></li>
            <li><a href="/privacy" className="text-sm hover:text-primary">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Subscribe</h4>
          <p className="text-sm text-gray-400">Get the latest updates on investment opportunities.</p>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white"
            />
            <button className="mt-2 w-full bg-primary text-white py-2 rounded">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  </footer>
)

const App = () => (
  <div>
    <Header />
    <HeroSection />
    <FeaturesSection />
    <PopularPropertiesSection />
    <TestimonialsSection />
    <Footer />
  </div>
)

export default App;

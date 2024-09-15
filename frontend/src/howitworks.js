import React from 'react';
import Header from './Header';

const StepByStepGuide = () => (
  <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">How HomeRun Works</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white shadow-lg rounded-lg mb-4">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2 mb-2">
              <i className="h-6 w-6 text-primary">👤</i>
              <span className="font-bold">1. Sign Up</span>
            </div>
          </div>
          <div className="p-4">
            <p>Create your account and complete the verification process to start investing in real estate.</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg mb-4">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2 mb-2">
              <i className="h-6 w-6 text-primary">🔍</i>
              <span className="font-bold">2. Browse Properties</span>
            </div>
          </div>
          <div className="p-4">
            <p>Explore our curated selection of properties and use AI-powered insights to make informed decisions.</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg mb-4">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2 mb-2">
              <i className="h-6 w-6 text-primary">💵</i>
              <span className="font-bold">3. Invest</span>
            </div>
          </div>
          <div className="p-4">
            <p>Choose your investment amount and purchase fractional ownership through our secure blockchain platform.</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg mb-4">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2 mb-2">
              <i className="h-6 w-6 text-primary">📊</i>
              <span className="font-bold">4. Manage & Earn</span>
            </div>
          </div>
          <div className="p-4">
            <p>Track your investments, receive rental income, and watch your portfolio grow over time.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Infographics = () => (
  <section className="py-12">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Understanding HomeRun</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-lg mb-4">
          <div className="p-4 border-b">
            <h3 className="font-bold">Fractional Ownership</h3>
          </div>
          <div className="p-4">
            <img src="/placeholder.svg" alt="Fractional Ownership Infographic" className="w-full h-auto" />
            <p className="mt-4">Own a piece of premium real estate without the high entry costs. Fractional ownership allows you to invest in properties previously out of reach.</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg mb-4">
          <div className="p-4 border-b">
            <h3 className="font-bold">AI Property Evaluation</h3>
          </div>
          <div className="p-4">
            <img src="/placeholder.svg" alt="AI Property Evaluation Infographic" className="w-full h-auto" />
            <p className="mt-4">Our advanced AI algorithms analyze market trends, location data, and property features to provide accurate valuations and growth predictions.</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg mb-4">
          <div className="p-4 border-b">
            <h3 className="font-bold">Smart Contracts</h3>
          </div>
          <div className="p-4">
            <img src="/placeholder.svg" alt="Smart Contracts Infographic" className="w-full h-auto" />
            <p className="mt-4">Blockchain-powered smart contracts ensure transparent, secure, and automated transactions for all your real estate investments.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const VideoTutorials = () => {
  const tutorials = [
    { id: 'getting-started', title: 'Getting Started with HomeRun', videoId: 'placeholder1' },
    { id: 'investing', title: 'How to Make Your First Investment', videoId: 'placeholder2' },
    { id: 'dashboard', title: 'Navigating Your Investment Dashboard', videoId: 'placeholder3' },
    { id: 'withdrawing', title: 'Withdrawing Earnings and Managing Your Portfolio', videoId: 'placeholder4' },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Video Tutorials</h2>
        <div className="flex flex-col">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="mb-8">
              <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[400px]"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CallToAction = () => (
    <section className="bg-primary text-primary-foreground py-12 text-center bg-gray-900">
      <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Investing?</h2>
      <a href="/signup" className="inline-block bg-secondary bg-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-secondary-dark transition">
        Create an Account
      </a>
    </section>
  );
  
  
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">HomeRun</h3>
            <p className="text-sm text-gray-400">Democratizing real estate investment through blockchain and AI.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm hover:text-primary">About Us</a></li>
              <li><a href="/terms" className="text-sm hover:text-primary">Terms of Service</a></li>
              <li><a href="/privacy" className="text-sm hover:text-primary">Privacy Policy</a></li>
              <li><a href="/contact" className="text-sm hover:text-primary">Contact Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {/* Add social media icons here */}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <form className="flex">
              <input type="email" placeholder="Your email" className="py-2 px-4 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
              <button type="submit" className="py-2 px-4 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          © 2023 HomeRun. All rights reserved.
        </div>
      </div>
    </footer>
  );
  
const HowItWorks = () => (
  <>
    <Header />
    <StepByStepGuide />
    <Infographics />
    <VideoTutorials />
    <CallToAction />
    <Footer />
  </>
);

export default HowItWorks;

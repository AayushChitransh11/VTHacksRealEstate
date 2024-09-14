import React from 'react';

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

const StepByStepGuide = () => (
  <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">How RealtyChain Works</h2>
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
      <h2 className="text-3xl font-bold text-center mb-8">Understanding RealtyChain</h2>
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
    { id: 'getting-started', title: 'Getting Started with RealtyChain', videoId: 'placeholder1' },
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

const Footer = () => (
  <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="mb-4 md:mb-0">
          <a href="/" className="flex items-center space-x-2">
            <i className="h-8 w-8 text-primary">🏢</i>
            <span className="text-xl font-bold">RealtyChain</span>
          </a>
          <p className="mt-2 text-sm">© 2024 RealtyChain. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="/" className="text-sm hover:text-primary">Home</a>
          <a href="/browse" className="text-sm hover:text-primary">Browse Properties</a>
          <a href="/how-it-works" className="text-sm hover:text-primary">How It Works</a>
          <a href="/faq" className="text-sm hover:text-primary">FAQ</a>
        </div>
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
    <Footer />
  </>
);

export default HowItWorks;

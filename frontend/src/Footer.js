import React from 'react';

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
  );
  
export default Footer;

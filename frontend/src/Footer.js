import React from 'react';

// const CallToAction = () => (
//     <section className="bg-primary text-primary-foreground py-12 text-center bg-gray-900">
//       <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Investing?</h2>
//       <a href="/signup" className="inline-block bg-secondary bg-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-secondary-dark transition">
//         Create an Account
//       </a>
//     </section>
//   );

const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">HomeRun</h3>
            <p className="text-sm text-gray-400">Democratising Real Estate Investment Through Co-Ownership.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/browse" className="text-sm hover:text-primary">Browse Properties</a></li>
              <li><a href="/how-it-works" className="text-sm hover:text-primary">How It Works</a></li>
              <li><a href="/dashboard" className="text-sm font-medium hover:text-primary">Dashboard</a></li>
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


import React, { useState } from 'react';
import { Building2, Search, MessageCircle, Mail, Book, Video, Users, ThumbsUp } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const Introduction = () => (
  <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Help Center & FAQs</h1>
      <p className="text-center text-lg mb-8 max-w-2xl mx-auto">
        Welcome to our Help Center. Here you can find answers to common questions and get help with using the HomeRun platform.
      </p>
      <div className="max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search for answers..."
            className="pl-10 py-2 px-4 border rounded w-full"
          />
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState('investment');

  const faqCategories = [
    {
      id: 'investment',
      title: 'Investment',
      questions: [
        {
          q: "How do I get started with investing?",
          a: "To start investing with HomeRun, follow these steps:\n1. Create an account on our platform\n2. Complete the verification process\n3. Browse available properties\n4. Choose a property and decide on your investment amount\n5. Complete the transaction using your preferred payment method\n6. Monitor your investment through your dashboard"
        },
        {
          q: "What investment options are available?",
          a: "HomeRun offers various investment options including:\n- Residential properties (apartments, houses)\n- Commercial properties (office spaces, retail)\n- Industrial properties (warehouses, factories)\n- Mixed-use developments\n- Real Estate Investment Trusts (REITs)\nEach option has different risk profiles and potential returns."
        },
        {
          q: "What is the minimum investment required?",
          a: "The minimum investment on HomeRun starts at $100 for most properties. This low entry point allows investors to diversify their portfolio across multiple properties. Some premium or high-value properties may have a higher minimum investment requirement."
        },
        {
          q: "What are the risk factors involved in investing?",
          a: "Like all investments, real estate carries risks. Some potential risk factors include:\n- Market fluctuations affecting property values\n- Changes in rental income\n- Property damage or maintenance issues\n- Regulatory changes affecting real estate\n- Economic factors impacting the real estate market\nWe recommend diversifying your investments and carefully reviewing each property's risk profile before investing."
        }
      ]
    },
    {
      id: 'withdrawals',
      title: 'Withdrawals',
      questions: [
        {
          q: "How do I withdraw funds?",
          a: "To withdraw funds:\n1. Log into your HomeRun account\n2. Navigate to the 'Wallet' or 'Finances' section\n3. Click on 'Withdraw Funds'\n4. Enter the amount you wish to withdraw\n5. Select your preferred withdrawal method\n6. Confirm the transaction\nNote: Ensure your account is fully verified before attempting a withdrawal."
        },
        {
          q: "How long do withdrawals take to process?",
          a: "Withdrawal processing times vary depending on the method:\n- Bank transfers: 2-5 business days\n- Credit/Debit cards: 3-7 business days\n- Cryptocurrencies: Usually within 24 hours\nPlease note that first-time withdrawals may take longer due to additional security checks."
        },
        {
          q: "Are there any fees for withdrawals?",
          a: "HomeRun does not charge fees for withdrawals. However, your bank or payment provider may apply their own fees. For cryptocurrency withdrawals, network fees may apply. Always check the final amount before confirming your withdrawal."
        },
        {
          q: "What should I do if I'm having issues with my withdrawal?",
          a: "If you're experiencing issues with your withdrawal:\n1. Check that your account is fully verified\n2. Ensure you have sufficient funds for the withdrawal\n3. Verify that your withdrawal method is correctly set up\n4. Check our system status page for any known issues\nIf problems persist, please contact our support team through the Support Contact form."
        }
      ]
    },
    {
      id: 'account',
      title: 'Account Management',
      questions: [
        {
          q: "How do I create an account?",
          a: "To create a HomeRun account:\n1. Go to our homepage and click 'Sign Up'\n2. Enter your email address and create a strong password\n3. Verify your email address via the link sent to you\n4. Complete your profile with required personal information\n5. Upload necessary identification documents for verification\n6. Once verified, you can start exploring investment opportunities"
        },
        {
          q: "How can I recover or reset my password?",
          a: "To reset your password:\n1. Click on 'Forgot Password' on the login page\n2. Enter the email address associated with your account\n3. Check your email for a password reset link\n4. Click the link and follow instructions to create a new password\n5. Log in with your new password\nIf you don't receive the email, check your spam folder or contact support."
        },
        {
          q: "Why is account verification important and how do I complete it?",
          a: "Account verification is crucial for:\n- Ensuring the security of your account\n- Complying with financial regulations\n- Enabling full platform functionality, including investments and withdrawals\n\nTo verify your account:\n1. Log in and go to your account settings\n2. Navigate to the 'Verification' section\n3. Upload required documents (e.g., government ID, proof of address)\n4. Wait for our team to review and approve your documents\n5. Once approved, your account will be fully verified"
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Issues',
      questions: [
        {
          q: "What should I do if I encounter technical problems?",
          a: "If you face technical issues:\n1. Clear your browser cache and cookies\n2. Try using a different browser or device\n3. Check our system status page for any known issues\n4. Ensure your internet connection is stable\n5. If the problem persists, contact our support team with detailed information about the issue\n6. Provide screenshots or error messages if available\n\nOur technical support team is available 24/7 to assist with any issues you may encounter."
        },
        {
          q: "How can I report a bug or issue on the platform?",
          a: "To report a bug or issue:\n1. Navigate to the 'Support' section of our website\n2. Click on 'Report a Bug'\n3. Provide a detailed description of the issue\n4. Attach any relevant screenshots or error messages\n5. Submit the report\n\nOur development team will review your report and work on resolving the issue as quickly as possible."
        },
        {
          q: "What browsers and devices are supported?",
          a: "HomeRun is optimized for modern browsers and devices:\n- Chrome (latest version)\n- Firefox (latest version)\n- Safari (latest version)\n- Edge (latest version)\n\nWe recommend using the latest versions of these browsers for the best experience. Our platform is also mobile-responsive and works well on smartphones and tablets."
        }
      ]
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4">
            <div className="bg-gray-100 p-4 rounded">
              {faqCategories.map(category => (
                <button
                  key={category.id}
                  className={`block w-full text-left py-2 px-4 border-b border-gray-200 hover:bg-gray-200 ${
                    activeTab === category.id ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => setActiveTab(category.id)}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-3/4 pl-4">
            {faqCategories.find(category => category.id === activeTab)?.questions.map((q, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold">{q.q}</h3>
                <p className="mt-2">{q.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SupportContact = () => (
  <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Need Further Assistance?</h2>
      <p className="text-center text-lg mb-8 max-w-2xl mx-auto">
        If you need additional help or have specific inquiries, please contact our support team. We're here to assist you with any questions or issues you may have.
      </p>
      <div className="max-w-md mx-auto">
        <form action="#" method="POST" className="bg-white p-6 border border-gray-300 rounded">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            id="name"
            type="text"
            required
            className="block w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            id="email"
            type="email"
            required
            className="block w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea
            id="message"
            rows="4"
            required
            className="block w-full border border-gray-300 rounded px-3 py-2"
          />
          <button type="submit" className="mt-4 bg-primary text-white rounded px-4 py-2 hover:bg-primary-dark">Send Message</button>
        </form>
      </div>
    </div>
  </section>
);

const Help = () => (
  <div>
    <Header />
    <Introduction />
    <FAQSection />
    <SupportContact />
    <Footer />
  </div>
);

export default Help;

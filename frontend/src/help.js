import React, { useState } from 'react';
import { Button, Input, Textarea, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'; // Assuming components are available in a common path
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Search, MessageCircle, Mail, Book, Video, Users, ThumbsUp } from 'lucide-react';

const Header = () => (
  <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
    <a href="/" className="flex items-center space-x-2">
      <Building2 className="h-8 w-8 text-primary" />
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
      <Button variant="outline">Log In</Button>
      <Button>Sign Up</Button>
    </div>
  </header>
);

const Introduction = () => (
  <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Help Center & FAQs</h1>
      <p className="text-center text-lg mb-8 max-w-2xl mx-auto">
        Welcome to our Help Center. Here you can find answers to common questions and get help with using the RealtyChain platform.
      </p>
      <div className="max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input type="search" placeholder="Search for answers..." className="pl-10" />
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
          a: "To start investing with RealtyChain, follow these steps:\n1. Create an account on our platform\n2. Complete the verification process\n3. Browse available properties\n4. Choose a property and decide on your investment amount\n5. Complete the transaction using your preferred payment method\n6. Monitor your investment through your dashboard"
        },
        {
          q: "What investment options are available?",
          a: "RealtyChain offers various investment options including:\n- Residential properties (apartments, houses)\n- Commercial properties (office spaces, retail)\n- Industrial properties (warehouses, factories)\n- Mixed-use developments\n- Real Estate Investment Trusts (REITs)\nEach option has different risk profiles and potential returns."
        },
        {
          q: "What is the minimum investment required?",
          a: "The minimum investment on RealtyChain starts at $100 for most properties. This low entry point allows investors to diversify their portfolio across multiple properties. Some premium or high-value properties may have a higher minimum investment requirement."
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
          a: "To withdraw funds:\n1. Log into your RealtyChain account\n2. Navigate to the 'Wallet' or 'Finances' section\n3. Click on 'Withdraw Funds'\n4. Enter the amount you wish to withdraw\n5. Select your preferred withdrawal method\n6. Confirm the transaction\nNote: Ensure your account is fully verified before attempting a withdrawal."
        },
        {
          q: "How long do withdrawals take to process?",
          a: "Withdrawal processing times vary depending on the method:\n- Bank transfers: 2-5 business days\n- Credit/Debit cards: 3-7 business days\n- Cryptocurrencies: Usually within 24 hours\nPlease note that first-time withdrawals may take longer due to additional security checks."
        },
        {
          q: "Are there any fees for withdrawals?",
          a: "RealtyChain does not charge fees for withdrawals. However, your bank or payment provider may apply their own fees. For cryptocurrency withdrawals, network fees may apply. Always check the final amount before confirming your withdrawal."
        },
        {
          q: "What should I do if I'm having issues with my withdrawal?",
          a: "If you're experiencing issues with your withdrawal:\n1. Check that your account is fully verified\n2. Ensure you have sufficient funds for the withdrawal\n3. Verify that your withdrawal method is correctly set up\n4. Check our system status page for any known issues\nIf problems persist, please contact our support team through the Support Contact form."
        }
      ]
    },
    {
      id: 'blockchain',
      title: 'Blockchain Technology',
      questions: [
        {
          q: "What is blockchain?",
          a: "Blockchain is a decentralized, digital ledger technology that records transactions across many computers. It's known for its security, transparency, and immutability. Each 'block' in the chain contains a number of transactions, and every time a new transaction occurs, a record of that transaction is added to every participant's ledger."
        },
        {
          q: "How does RealtyChain use blockchain?",
          a: "RealtyChain utilizes blockchain technology in several ways:\n1. Tokenization of real estate assets\n2. Secure and transparent transaction records\n3. Smart contracts for automated processes (e.g., rent distribution)\n4. Fractional ownership management\n5. Rapid and secure cross-border transactions\nThis technology allows us to make real estate investment more accessible, transparent, and efficient."
        },
        {
          q: "How does blockchain enhance security on the platform?",
          a: "Blockchain enhances security on RealtyChain through:\n1. Immutable transaction records: Once recorded, data cannot be altered\n2. Decentralization: No single point of failure\n3. Cryptographic security: Advanced encryption protects data\n4. Transparency: All transactions are visible, reducing fraud risk\n5. Smart contracts: Automated, tamper-proof execution of agreements\nThese features combine to create a highly secure environment for real estate investments."
        }
      ]
    },
    {
      id: 'account',
      title: 'Account Management',
      questions: [
        {
          q: "How do I create an account?",
          a: "To create a RealtyChain account:\n1. Go to our homepage and click 'Sign Up'\n2. Enter your email address and create a strong password\n3. Verify your email address via the link sent to you\n4. Complete your profile with required personal information\n5. Upload necessary identification documents for verification\n6. Once verified, you can start exploring investment opportunities"
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
          a: "If you face technical issues:\n1. Clear your browser cache and cookies\n2. Try using a different browser or device\n3. Check our system status page for any known issues\n4. Ensure your internet connection is stable\n5. If problems persist, contact our technical support team with a detailed description of the issue"
        },
        {
          q: "Is my data safe on RealtyChain?",
          a: "Yes, your data is safe with RealtyChain. We use industry-standard encryption methods to protect your data, and our platform complies with strict data protection regulations. Regular security audits and updates are performed to ensure your information remains secure."
        },
        {
          q: "How do I report a bug or issue with the platform?",
          a: "To report a bug or issue:\n1. Navigate to the 'Support' section of our website\n2. Click on 'Report a Bug' or 'Submit a Ticket'\n3. Provide a detailed description of the issue and steps to reproduce it\n4. Submit the form\n\nOur technical team will review your report and work on a resolution as quickly as possible."
        }
      ]
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex justify-center mb-6">
            {faqCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-lg font-medium px-4 py-2">
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {faqCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Accordion type="single" collapsible>
                {category.questions.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>
                      <p>{item.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

const FAQ = () => (
  <>
    <Header />
    <main>
      <Introduction />
      <FAQSection />
    </main>
  </>
);

export default FAQ;

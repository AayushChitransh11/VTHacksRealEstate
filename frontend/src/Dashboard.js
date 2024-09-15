import { useState, useEffect } from 'react';
import { Button } from './components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/Tabs";
import { Home, TrendingUp } from "lucide-react";
import Header from './Header';
import Footer from './Footer';
// import { useAuth } from '@propel/auth'; 

export default function Dashboard() {
  // const { user } = useAuth(); // Assume this provides the user object

  const [activeTab, setActiveTab] = useState("properties");
  const [investmentData, setInvestmentData] = useState({
    totalInvestment: 0,
    totalRentalIncome: 0,
    portfolioValue: 0,
    propertiesOwned: 0,
    properties: [],
    transactions: []
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch properties data (replace this with actual API call if needed)
        const properties = [
          { id: 1, name: 'Luxury Condo 1', location: 'New York, NY', ownership: '1/8', income: '$450/mo' },
          { id: 2, name: 'Luxury Condo 2', location: 'New York, NY', ownership: '1/8', income: '$450/mo' },
          { id: 3, name: 'Luxury Condo 3', location: 'New York, NY', ownership: '1/8', income: '$450/mo' }
        ];

        // Fetch transactions data
        const transactionResponse = await fetch('http://127.0.0.1:5000/api/dividends', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: 1 })
        });

        if (!transactionResponse.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const transactions = await transactionResponse.json();

        // Fetch investments data
        const investmentResponse = await fetch('http://127.0.0.1:5000/investments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: 1 })
        });

        if (!investmentResponse.ok) {
          throw new Error('Failed to fetch investments');
        }

        const investments = await investmentResponse.json();

        // Calculate total investment from fetched data
        const totalInvestment = investments.reduce((sum, investment) => sum + investment.amount, 0);

        setInvestmentData(prevData => ({
          ...prevData,
          totalInvestment,
          properties,
          transactions: transactions.map(transaction => ({
            dividend_id: transaction.dividend_id,
            amount: transaction.dividend_amount,
            date: transaction.payment_date,
            property: `Property ID: ${transaction.property_id}`
          })),
          totalRentalIncome: transactions.reduce((sum, transaction) => sum + transaction.dividend_amount, 0),
          portfolioValue: totalInvestment * 1.1, // Example calculation
          propertiesOwned: investments.length
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />      
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${investmentData.totalInvestment.toFixed(2)}</div>
                <p className="text-sm text-gray-500">Across {investmentData.propertiesOwned} properties</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Rental Income</CardTitle>
                <TrendingUp className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${investmentData.totalRentalIncome.toFixed(2)}</div>
                <p className="text-sm text-gray-500">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${investmentData.portfolioValue.toFixed(2)}</div>
                <p className="text-sm text-green-500">+18.5% from purchase</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Properties Owned</CardTitle>
                <Home className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{investmentData.propertiesOwned}</div>
                <p className="text-sm text-gray-500">In 4 cities</p>
              </CardContent>
            </Card>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
            <TabsContent value="properties" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Properties</CardTitle>
                  <CardDescription>Details of your fractional property ownership</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investmentData.properties.map(property => (
                      <div key={property.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                          <div>
                            <h3 className="font-semibold">{property.name}</h3>
                            <p className="text-sm text-gray-500">{property.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{property.ownership}</p>
                          <p className="text-sm text-gray-500">{property.income}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest investment activities and income</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investmentData.transactions.map(transaction => (
                      <div key={transaction.dividend_id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                        <div>
                          <h3 className="font-semibold">Dividend</h3>
                          <p className="text-sm text-gray-500">{transaction.property}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">${transaction.amount.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />      
    </div>
  );
}

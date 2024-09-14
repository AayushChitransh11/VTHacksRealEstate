import { useState } from 'react'
import { Button } from './components/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/Tabs"
import { Avatar, AvatarFallback, AvatarImage } from "./components/Avatar"
import { BarChart, DollarSign, Home, PieChart, TrendingUp, User } from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold">RealtyChain</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">
              <User className="w-5 h-5 mr-2" />
              Profile
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1 p-6 bg-gray-100">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Welcome back, John Doe</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
                <DollarSign className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$128,450</div>
                <p className="text-sm text-gray-500">Across 7 properties</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Rental Income</CardTitle>
                <TrendingUp className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,845</div>
                <p className="text-sm text-gray-500">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
                <PieChart className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$152,000</div>
                <p className="text-sm text-green-500">+18.5% from purchase</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Properties Owned</CardTitle>
                <Home className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-sm text-gray-500">In 4 cities</p>
              </CardContent>
            </Card>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Performance</CardTitle>
                  <CardDescription>Your portfolio's performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] bg-gray-200 flex items-center justify-center">
                    Chart placeholder: Investment Performance
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Rental Income</CardTitle>
                  <CardDescription>Monthly rental income from your properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] bg-gray-200 flex items-center justify-center">
                    Chart placeholder: Rental Income
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="properties" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Properties</CardTitle>
                  <CardDescription>Details of your fractional property ownership</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((property) => (
                      <div key={property} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                          <div>
                            <h3 className="font-semibold">Luxury Condo #{property}</h3>
                            <p className="text-sm text-gray-500">New York, NY</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">1/8 Ownership</p>
                          <p className="text-sm text-gray-500">$450/mo income</p>
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
                    {[1, 2, 3, 4, 5].map((transaction) => (
                      <div key={transaction} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                        <div>
                          <h3 className="font-semibold">Rental Income</h3>
                          <p className="text-sm text-gray-500">Property #{transaction}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">+$350.00</p>
                          <p className="text-sm text-gray-500">May 1, 2023</p>
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
    </div>
  )
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "@propelauth/react";
import BrowsePropertiesPage from './BrowseProperties';
import HowItWorks from './howitworks';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchResults from './PropertySearch';
import ListingPage from './ListingPage';
import Dashboard from './Dashboard';
import Help from './help';
import PropertyPage from './property';
import ConfirmInvestment from './ConfirmInvestment';
import InvestmentPage from './Investment';


const API_KEY = process.env.AUTH_URL;
export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/browse" element={<BrowsePropertiesPage />} />   
          <Route path="/how-it-works" element={<HowItWorks />}/> 
          <Route path="/search" element={<SearchResults />} />
          <Route path="/listing/:id" element={<ListingPage />} />
          <Route path="/property" element={<PropertyPage />} />
          <Route path="/confirmInvestment" element={<ConfirmInvestment />} />
          <Route path="/investment" element={<InvestmentPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/help' element={<Help/>}/>
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthProvider authUrl="https://4938244.propelauthtest.com">
<App />
</AuthProvider>

);


reportWebVitals();

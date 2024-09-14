import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "@propelauth/react";
import BrowsePropertiesPage from './BrowseProperties';
import HowItWorks from './howitworks';
// import FAQ from './help';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/browse" element={<BrowsePropertiesPage />} />    
          <Route path="/how-it-works" element={<HowItWorks />}/>
          {/* <Route path="/help" element={<FAQ />}/> */}
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<App />
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

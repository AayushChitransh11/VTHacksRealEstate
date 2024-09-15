import React from 'react';
import { useAuthInfo, useLogoutFunction, useRedirectFunctions } from '@propelauth/react';
import { Button } from './components/Button'
import { User } from "lucide-react"


const Header = () => {
    const { isLoggedIn } = useAuthInfo();
    const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions();
    const logout = useLogoutFunction();
  
    return (
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <a href="/" className="flex items-center space-x-2">
          <i className="h-8 w-8 text-primary">🏢</i>
          <span className="text-xl font-bold">HomeRun</span>
        </a>
        <nav className="hidden md:flex space-x-4 text-base">
          <a href="/browse" className="font-medium hover:text-primary">Browse Properties</a>
          <a href="/how-it-works" className="font-medium hover:text-primary">How It Works</a>
          <a href="/dashboard" className="font-medium hover:text-primary">Dashboard</a>
          {/* <a href="/investors" className="text-sm font-medium hover:text-primary">Investors Portal</a> */}
          {/* <a href="/developers" className="text-sm font-medium hover:text-primary">Developers Portal</a> */}
          <a href="/help" className="font-medium hover:text-primary">Help/FAQ</a>
        </nav>
        <div className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Button variant="ghost">
              <User style={{width: 2.8 + 'em'}} className="w-5 h-6 mr-2" />
              </Button>
              <button className="border px-4 py-2" onClick={logout}>Sign Out</button>

            </>
          
          ) : (
            <>
              <button className="border px-4 py-2" onClick={() => redirectToLoginPage()}>Sign In</button>
              <button className="border px-4 py-2 " onClick={() => redirectToSignupPage()}>Sign Up</button>
            </>
          )}
        </div>
      </header>
    );
  };


export default Header;

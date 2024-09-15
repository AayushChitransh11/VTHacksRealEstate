import React from 'react';
import { useAuthInfo, useLogoutFunction, useRedirectFunctions } from '@propelauth/react';

const Header = () => {
    const { isLoggedIn } = useAuthInfo();
    const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions();
    const logout = useLogoutFunction();
  
    return (
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
          {isLoggedIn ? (
            <button onClick={logout}>Log Out</button>
          ) : (
            <>
              <button className="border px-4 py-2" onClick={() => redirectToLoginPage()}>Log In</button>
              <button className="border bg-primary px-4 py-2 " onClick={() => redirectToSignupPage()}>Sign Up</button>
            </>
          )}
        </div>
      </header>
    );
  };


export default Header;

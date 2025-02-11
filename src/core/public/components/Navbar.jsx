import React from 'react';

const Navbar = () => {
  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-light tracking-tight text-neutral-900">
              pet<span className="font-medium">care</span>
            </a>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              <a href="/" className="text-neutral-600 hover:text-neutral-900 text-sm font-light">Home</a>
              <a href="/services" className="text-neutral-600 hover:text-neutral-900 text-sm font-light">Services</a>
              <a href="/about" className="text-neutral-600 hover:text-neutral-900 text-sm font-light">About</a>
              <a href="/contact" className="text-neutral-600 hover:text-neutral-900 text-sm font-light">Contact</a>
            </div>
          </div>

          {/* Login Button */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={handleLoginClick}
              className="bg-neutral-900 text-white px-4 py-2 rounded-full text-sm hover:bg-neutral-800 transition-colors"
            >
              Login
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-neutral-600 hover:text-neutral-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-40 border-b border-[#2196f3]/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-light tracking-tight text-[#2196f3]">
              pet<span className="font-medium">care</span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              {[
                { path: '/', label: 'Home' },
                { path: '/services', label: 'Services' },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact' }
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`relative text-sm font-medium transition-colors group ${
                    isActive(path) 
                      ? 'text-[#2196f3]' 
                      : 'text-gray-600 hover:text-[#2196f3]'
                  }`}
                >
                  {label}
                  <span 
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#2196f3] transform origin-left transition-transform duration-300 ${
                      isActive(path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* User Auth Section */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2196f3] flex items-center justify-center text-white">
                    {user.fullname?.charAt(0) || 'U'}
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <p className="font-medium">{user.fullname}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      
                      {user.role === 'admin' && (
                        <Link 
                          to="/admin/dashboard" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={handleLoginClick}
                className="bg-[#2196f3] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#1976d2] transition-colors shadow-sm hover:shadow-md"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-600 hover:text-[#2196f3] hover:bg-[#2196f3]/5">
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
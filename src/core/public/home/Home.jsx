import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [displayedPets, setDisplayedPets] = useState([]);
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all pets from the API
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/pets');
        setAllPets(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching pets:', err);
        setError('Failed to load pets. Please try again later.');
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Function to shuffle array randomly
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Filter and search pets
  useEffect(() => {
    if (allPets.length === 0) return;

    let filtered = [...allPets];
    
    // Filter by type if not showing all
    if (activeFilter !== 'All') {
      filtered = filtered.filter(pet => pet.type === activeFilter);
    }
    
    // Apply search query if provided
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(pet => 
        pet.name.toLowerCase().includes(query) || 
        pet.breed.toLowerCase().includes(query) ||
        pet.location.toLowerCase().includes(query)
      );
    }
    
    // Only show available pets
    filtered = filtered.filter(pet => pet.available);
    
    // Shuffle and limit for the homepage display
    if (activeFilter === 'All' && searchQuery.trim() === '') {
      filtered = shuffleArray(filtered).slice(0, 8); // Show 8 random pets
    }
    
    setDisplayedPets(filtered);
  }, [allPets, activeFilter, searchQuery]);

  // Handler for navigating to pet details
  const handlePetClick = (petId) => {
    navigate(`/pet/${petId}`);
  };

  // Handler for search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e5f2f7] to-[#f5fafd]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Find your new <span className="text-[#2196f3]">furry friend</span> today
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-md">
                Connecting loving homes with pets in need. Browse our available pets and find your perfect companion.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                  onClick={() => {
                    petsNearYouRef.current.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="px-8 py-3 bg-gradient-to-r from-[#2196f3] to-[#1976d2] text-white font-medium rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5"
                >
                  Find a Pet
                </button>
                <button onClick={() => navigate('/services')} className="px-8 py-3 bg-gradient-to-r from-[#2196f3] to-[#1976d2] text-white font-medium rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5">
                  Our Services
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="src/assets/image/cat/landing2.jpeg" 
                  alt="Happy pets" 
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#bbdefb] rounded-full opacity-50 blur-3xl z-0"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-[#64b5f6] rounded-full opacity-30 blur-3xl z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search and Filters */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Find Your Perfect Companion</h2>
          </div>
          

          <div className="flex justify-center gap-4 mb-8">
            {['All', 'Cat', 'Dog'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[#2196f3] text-white shadow-md transform scale-105'
                    : 'bg-[#f5f9fc] text-gray-600 hover:bg-[#e3f2fd] hover:text-[#1976d2]'
                }`}
              >
                {filter === 'All' && (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    {filter}
                  </span>
                )}
                {filter === 'Cat' && (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16c-5.5 0-10-3.5-10-8 0-1 0-3 2-3s2.5 1 3 2c0-3.5 3-3 4.5-3s4.5-.5 4.5 3c.5-1 1-2 3-2s2 2 2 3c0 4.5-4.5 8-10 8z M14 10l2 2 M10 10l-2 2" />
                    </svg>
                    {filter}
                  </span>
                )}
                {filter === 'Dog' && (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .137 1.217 1.5 2 3 2s2.5-1 3-1.5 M14 5.172C14 3.782 15.577 2.679 17.5 3c2.823.47 4.113 6.006 4 7-.137 1.217-1.5 2-3 2s-2.5-1-3-1.5" />
                    </svg>
                    {filter}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Near You Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Pets Near You</h2>
              <p className="text-gray-600 mt-1">Find your perfect companion close to home</p>
            </div>
            <button 
              onClick={() => navigate('/pets')}
              className="text-[#2196f3] text-sm font-medium hover:text-[#1976d2] flex items-center group"
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-32">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#2196f3] border-t-transparent"></div>
              <p className="text-gray-500 mt-4">Finding pets for you...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg mb-8 shadow-sm">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* No Results */}
          {!loading && !error && displayedPets.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-900">No pets found</h3>
              <p className="mt-2 text-gray-500 max-w-md mx-auto">Try adjusting your search or filter criteria, or check back later for new arrivals.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('All');
                }}
                className="mt-6 px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Pets Grid */}
          {!loading && !error && displayedPets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedPets.map((pet) => (
                <div 
                  key={pet._id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => handlePetClick(pet._id)}
                >
                  <div className="relative overflow-hidden h-60">
                    <img 
                      src={`http://localhost:5000${pet.image}`}
                      alt={pet.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-xl font-medium">
                          {pet.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/90 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="text-white/90 text-sm">
                            {pet.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 group-hover:text-[#2196f3] transition-colors">
                          {pet.name}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 flex items-center">
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${pet.type === 'Cat' ? 'bg-orange-400' : 'bg-blue-400'}`}></span>
                          {pet.breed}
                        </p>
                      </div>
                      <p className="text-[#2196f3] font-medium">
                        Rs {pet.price}
                      </p>
                    </div>
                    <div className="mt-6">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          navigate(`/pet/${pet._id}`);
                        }}
                        className="w-full py-3 bg-[#e3f2fd] text-[#2196f3] text-sm font-medium rounded-xl hover:bg-[#2196f3] hover:text-white transition-colors duration-300 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-800">Why Choose PetCare</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Our platform offers everything you need to find and care for your perfect pet companion</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f5f9fc] rounded-2xl p-8 text-center transition-transform duration-300 hover:-translate-y-1">
              <div className="bg-[#e3f2fd] text-[#2196f3] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Easy Booking</h3>
              <p className="text-gray-600">Simple, hassle-free booking process to schedule appointments with your favorite pets.</p>
            </div>
            
            <div className="bg-[#f5f9fc] rounded-2xl p-8 text-center transition-transform duration-300 hover:-translate-y-1">
              <div className="bg-[#e3f2fd] text-[#2196f3] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Trusted Partners</h3>
              <p className="text-gray-600">All our partner shelters and breeders are thoroughly vetted to ensure the best care.</p>
            </div>
            
            <div className="bg-[#f5f9fc] rounded-2xl p-8 text-center transition-transform duration-300 hover:-translate-y-1">
              <div className="bg-[#e3f2fd] text-[#2196f3] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">24/7 Support</h3>
              <p className="text-gray-600">Our team is available around the clock to assist with any questions or concerns.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#e3f2fd]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#2196f3] rounded-3xl overflow-hidden shadow-xl">
            <div className="px-6 py-12 md:p-12 flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Join Our Newsletter</h2>
                <p className="mt-2 text-white/80">Stay updated with new pets and special offers</p>
              </div>
              <div className="md:w-1/2 w-full">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 bg-white rounded-full w-full focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="px-6 py-3 bg-white text-[#2196f3] font-medium rounded-full hover:bg-gray-100 transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-white/70 text-xs mt-3">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="flex justify-around py-3">
          <button className="text-[#2196f3] flex flex-col items-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="text-gray-400 flex flex-col items-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs mt-1">Favorites</span>
          </button>
          <button className="text-gray-400 flex flex-col items-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-semibold mb-4">About PetCare</h3>
              <p className="text-gray-400 text-sm mb-4">PetCare connects loving pet owners with animals in need. Our mission is to make pet adoption simple, humane, and accessible for everyone.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.126 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                </a>
                </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pet Adoption</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Veterinary Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pet Grooming</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Training Programs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pet Supplies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#2196f3] mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">123 Pet Street, Animal City, AC 12345</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#2196f3] mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400">info@petcare.com</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#2196f3] mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">(123) 456-7890</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2025 PetCare. All rights reserved.</p>
              <div className="mt-4 md:mt-0">
                <ul className="flex space-x-6">
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
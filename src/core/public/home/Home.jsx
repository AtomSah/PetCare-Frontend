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
    <div className="min-h-screen bg-[#e5f2f7]">
      <Navbar />
      
      {/* Search and Filters */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search by name, breed, or location"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-white rounded-full py-2 pl-10 pr-4 border-none shadow-sm"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Pet Type Filters */}
          <div className="flex gap-3 mb-8">
            {['All', 'Cat', 'Dog'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#2196f3] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Near You Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-900">Near You</h2>
            <button 
              onClick={() => navigate('/pets')}
              className="text-[#2196f3] text-sm"
            >
              View all
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2196f3]"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
              <p>{error}</p>
            </div>
          )}

          {/* No Results */}
          {!loading && !error && displayedPets.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No pets found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}

          {/* Pets Grid */}
          {!loading && !error && displayedPets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedPets.map((pet) => (
                <div 
                  key={pet._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handlePetClick(pet._id)}
                >
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={`http://localhost:5000${pet.image}`}
                      alt={pet.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                      <h3 className="text-white text-lg font-medium">
                        {pet.name}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {pet.location}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600 text-sm">
                          {pet.breed}
                        </p>
                        <p className="text-[#2196f3] font-medium mt-1">
                          ${pet.price}
                        </p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          navigate(`/pet/${pet._id}`);
                        }}
                        className="px-4 py-2 bg-[#2196f3] text-white text-sm rounded-lg hover:bg-[#1976d2] transition-colors"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="flex justify-around py-3">
          <button className="text-[#2196f3]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
          <button className="text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
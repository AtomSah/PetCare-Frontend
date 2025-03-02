import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { BookingForm, ConfirmationMessage } from './BookingPopups';
import { useAuthContext } from '@/context/AuthContext';

const PetDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);

  // Fetch pet details from API
  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/pets/${id}`);
        setPet(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching pet details:', err);
        setError('Failed to load pet details. Please try again later.');
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);

  // Handle booking button click
  const handleBookClick = () => {
    if (!user) {
      // Redirect to login if not logged in
      navigate('/login', { state: { from: `/pet/${id}` } });
      return;
    }
    setShowBookingForm(true);
  };

  // Handle booking form submission
  const handleBookingSubmit = (data) => {
    setBookingInfo(data);
    setShowBookingForm(false);
    setShowConfirmation(true);
  };

  // Handle closing the confirmation message
  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    // Navigate back to home page
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e5f2f7]">
        <Navbar />
        <div className="pt-20 px-4 sm:px-6 lg:px-8 h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2196f3]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#e5f2f7]">
        <Navbar />
        <div className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p>{error}</p>
            <button 
              onClick={() => navigate(-1)} 
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e5f2f7]">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)} 
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          {/* Pet Details */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pet Image */}
              <div className="h-96 overflow-hidden">
                <img 
                  src={`http://localhost:5000${pet?.image}`}
                  alt={pet?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x600?text=No+Image';
                  }}
                />
              </div>
              
              {/* Pet Info */}
              <div className="p-6 flex flex-col">
                <div className="mb-4">
                  <h1 className="text-3xl font-semibold text-gray-900">{pet?.name}</h1>
                  <p className="text-xl text-[#2196f3] font-medium">Rs{pet?.price}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="text-lg text-gray-900">{pet?.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Breed</p>
                    <p className="text-lg text-gray-900">{pet?.breed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="text-lg text-gray-900">{pet?.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="text-lg text-gray-900">{pet?.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Color</p>
                    <p className="text-lg text-gray-900">{pet?.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="text-lg text-gray-900">{pet?.weight}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-lg text-gray-900">{pet?.location}</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p className="text-base text-gray-700">{pet?.description}</p>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className={`w-4 h-4 rounded-full ${pet?.vaccinated ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                  <p className="text-sm">{pet?.vaccinated ? 'Vaccinated' : 'Not Vaccinated'}</p>
                </div>
                
                <div className="mt-auto">
                  <button 
                    onClick={handleBookClick}
                    disabled={!pet?.available}
                    className={`w-full py-3 rounded-lg text-white font-medium ${
                      pet?.available ? 'bg-[#2196f3] hover:bg-[#1976d2]' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {pet?.available ? 'Book Now' : 'Not Available'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm 
          pet={pet} 
          onClose={() => setShowBookingForm(false)}
          onSubmit={handleBookingSubmit}
        />
      )}
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationMessage 
          bookingInfo={bookingInfo}
          onClose={handleConfirmationClose}
        />
      )}
    </div>
  );
};

export default PetDetailsPage;  
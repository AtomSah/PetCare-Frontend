import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '@/context/AuthContext';

// BookingForm Component - First popup for entering user details
const BookingForm = ({ pet, onClose, onSubmit }) => {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    name: user?.fullname || '',
    contact: user?.phone || '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.contact.trim()) tempErrors.contact = "Contact number is required";
    if (!formData.address.trim()) tempErrors.address = "Address is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        // Get the token for authentication
        const token = localStorage.getItem('token');
        
        // Create booking data
        const bookingData = {
          petId: pet._id,
          name: formData.name,
          contact: formData.contact,
          address: formData.address
        };
        
        // Send booking request to API
        const response = await axios.post(
          'http://localhost:5000/api/bookings',
          bookingData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        // Call onSubmit with the response data
        onSubmit(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Booking error:', error);
        setErrors({
          submit: error.response?.data?.message || 'Failed to create booking. Please try again.'
        });
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-medium text-gray-900 mb-1">Book {pet?.name}</h2>
        <p className="text-[#2196f3] mb-6">${pet?.price}</p>
        
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.submit}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#2196f3]`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number *
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.contact ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#2196f3]`}
              placeholder="Enter your contact number"
            />
            {errors.contact && <p className="mt-1 text-sm text-red-500">{errors.contact}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#2196f3]`}
              placeholder="Enter your address"
            />
            {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2196f3] text-white rounded-md hover:bg-[#1976d2]"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ConfirmationMessage Component - Second popup showing the contact information
const ConfirmationMessage = ({ bookingInfo, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-medium text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Your booking ID: <span className="font-medium">#{bookingInfo?.booking?._id?.substring(0, 8)}</span>
          <br /><br />
          If you need to follow up, please contact:
          <br />
          <span className="text-[#2196f3] font-medium">{bookingInfo?.contactNumber || '987654321'}</span>
        </p>
        
        <button
          onClick={onClose}
          className="px-4 py-2 bg-[#2196f3] text-white rounded-md hover:bg-[#1976d2]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export { BookingForm, ConfirmationMessage };
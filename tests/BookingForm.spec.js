import React, { useState } from 'react';

// BookingForm Component - Handles user details input
const BookingForm = ({ pet, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', contact: '', address: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.contact.trim()) tempErrors.contact = 'Contact number is required';
    if (!formData.address.trim()) tempErrors.address = 'Address is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        
        <h2 className="text-2xl font-medium text-gray-900 mb-1">Book {pet?.name}</h2>
        <p className="text-[#2196f3] mb-6">{pet?.price}</p>
        
        <form onSubmit={handleSubmit}>
          {['name', 'contact', 'address'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)} *
              </label>
              {field === 'address' ? (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-3 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#2196f3]`}
                  placeholder={`Enter your ${field}`}
                />
              ) : (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#2196f3]`}
                  placeholder={`Enter your ${field}`}
                />
              )}
              {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
            </div>
          ))}
          
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#2196f3] text-white rounded-md hover:bg-[#1976d2]">Confirm Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ConfirmationMessage Component - Displays booking confirmation
const ConfirmationMessage = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
        ✓
      </div>
      <h2 className="text-2xl font-medium text-gray-900 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-600 mb-6">If you need assistance, please contact:
        <br /><span className="text-[#2196f3] font-medium">987654321</span>
      </p>
      <button onClick={onClose} className="px-4 py-2 bg-[#2196f3] text-white rounded-md hover:bg-[#1976d2]">Close</button>
    </div>
  </div>
);

export { BookingForm, ConfirmationMessage };

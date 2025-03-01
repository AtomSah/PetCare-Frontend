import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';

const User = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  // Fetch user data and bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // Fetch user data
        const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Fetch user's bookings
        const bookingsResponse = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setUserData(userResponse.data);
        setBookings(bookingsResponse.data);
        console.log(bookingsResponse.data,"jjjj");
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load user bookings. Please try again later.');
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge style
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          User Bookings
        </h1>
        <button
          onClick={() => navigate('/admin/users')}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Users
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* User Info Card */}
          {userData && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-20 w-20">
                  {userData.avatar ? (
                    <img 
                      className="h-20 w-20 rounded-full object-cover" 
                      src={`http://localhost:5000${userData.avatar}`} 
                      alt="" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullname)}&background=random&size=80`;
                      }}
                    />
                  ) : (
                    <img 
                      className="h-20 w-20 rounded-full" 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullname)}&background=random&size=80`} 
                      alt="" 
                    />
                  )}
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-semibold text-gray-900">{userData.fullname}</h2>
                  <p className="text-gray-600">{userData.email}</p>
                  <p className="text-gray-600">{userData.phone || 'No phone provided'}</p>
                  <p className="mt-1">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      userData.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {userData.role === 'admin' ? 'Admin' : 'User'}
                    </span>
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm text-gray-500">Member since</p>
                  <p className="text-gray-900">{new Date(userData.createdAt).toLocaleDateString()}</p>
                  <p className="mt-2 text-sm text-gray-500">Total Bookings</p>
                  <p className="text-gray-900">{bookings.length}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Bookings List */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Booking History</h3>
            </div>
            
            {bookings.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No bookings found for this user.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pet
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking Info
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img 
                                className="h-10 w-10 rounded-full object-cover" 
                                src={booking.pet ? `http://localhost:5000${booking.pet.image}` : 'https://via.placeholder.com/40?text=No+Image'}
                                alt=""
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/40?text=No+Image';
                                }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {booking.pet ? booking.pet.name : 'Unknown Pet'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {booking.pet ? `${booking.pet.breed} (${booking.pet.type})` : ''}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.name}</div>
                          <div className="text-sm text-gray-500">{booking.contact}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(booking.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => navigate(`/admin/bookings/${booking._id}`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default User;
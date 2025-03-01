import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // If you're using react-router

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPets: 0,
    totalUsers: 0,
    pendingBookings: 0,
    completedBookings: 0,
    confirmedBookings: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // If you're using react-router

  // Get the auth token from localStorage
  const token = localStorage.getItem('token');
  
  // If no token, redirect to login
  useEffect(() => {
    if (!token) {
      setError('Please log in to access the dashboard');
      // Optional: Redirect to login page
      // navigate('/login');
    }
  }, [token]);

  // Set up axios with authentication headers
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  // Add a response interceptor to handle auth errors
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // Handle authentication errors
        localStorage.removeItem('token'); // Clear invalid token
        setError('Authentication error. Please log in again.');
        // Optional: Redirect to login page
        // navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return; // Don't fetch if no token
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch data for the pets (no auth required)
        let petData = [];
        try {
          const petsResponse = await axios.get('http://localhost:5000/api/pets');
          petData = petsResponse.data;
        } catch (err) {
          console.error('Error fetching pets:', err);
        }
        
        // Auth-required endpoints - wrap in try/catch blocks
        let userData = [];
        let bookingData = [];
        
        try {
          const usersResponse = await api.get('/users');
          userData = usersResponse.data;
        console.log(userData, "users");
        } catch (err) {
          console.error('Error fetching users:', err);
          // Don't set global error for this one endpoint
        }
        
        try {
          const bookingsResponse = await api.get('/bookings/admin');
          bookingData = bookingsResponse.data;
        } catch (err) {
          console.error('Error fetching bookings:', err);
          // Don't set global error for this one endpoint
        }

        // Calculate stats from available data
        const totalPets = petData.length;
        const totalUsers = userData.length;
        
        
        // Safely count bookings by status
        const pendingBookings = bookingData.filter(
          booking => booking.status === 'pending'
        ).length;
        
        const confirmedBookings = bookingData.filter(
          booking => booking.status === 'confirmed'
        ).length;
        
        const cancelledBookings = bookingData.filter(
          booking => booking.status === 'cancelled'
        ).length;

        // Update stats with what we have
        setStats({
          totalPets,
          totalUsers,
          pendingBookings,
          confirmedBookings,
          completedBookings: cancelledBookings
        });
        
        // Format recent bookings for display if we have them
        if (bookingData.length > 0) {
          const recentBookingsFormatted = bookingData
            .slice(0, 5)
            .map(booking => ({
              id: booking._id,
              petName: booking.pet && booking.pet.name ? booking.pet.name : 'Unknown Pet',
              customerName: booking.name,
              date: new Date(booking.createdAt).toLocaleDateString(),
              status: booking.status
            }));
          
          setRecentBookings(recentBookingsFormatted);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  // Check login status
  if (!token && !loading) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">You need to log in to access the dashboard.</p>
        <a href="/login" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Login
        </a>
      </div>
    );
  }

  // Display dashboard content
  const statCards = [
    {
      title: 'Total Pets',
      value: stats.totalPets,
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: (
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings,
      icon: (
        <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Cancelled Bookings',
      value: stats.completedBookings,
      icon: (
        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      
      {loading ? (
        <div className="text-center py-10">
          <p>Loading dashboard data...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
              <div 
                key={index} 
                className={`${card.bgColor} p-6 rounded-lg shadow-sm border border-gray-200`}
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    {card.icon}
                  </div>
                  <div>
                    <h2 className="text-gray-500 text-sm uppercase">{card.title}</h2>
                    <p className="text-3xl font-semibold text-gray-800">{card.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h2>
            
            {recentBookings.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No bookings found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          #{booking.id ? booking.id.substring(0, 8) : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.petName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.customerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : booking.status === 'confirmed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a href={`/admin/bookings/${booking.id}`} className="text-blue-600 hover:text-blue-900">
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Activity Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Booking Activity</h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Booking activity chart would go here</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
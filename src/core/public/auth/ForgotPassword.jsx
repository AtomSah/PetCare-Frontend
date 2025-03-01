import React, { useState } from 'react';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSendLink = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically make an API call to send the reset link
      setIsEmailSent(true);
      setError('');
      console.log('Reset link sent to:', email);
      // After 3 seconds, close the modal
      setTimeout(() => {
        onClose();
        setIsEmailSent(false);
        setEmail('');
      }, 3000);
    } else {
      setError('Please enter your email address');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-600"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {!isEmailSent ? (
          <>
            <h2 className="text-2xl font-light mb-2 text-neutral-900">Forgot Password</h2>
            <p className="text-neutral-600 mb-6">Enter your email address to receive a password reset link.</p>
            
            <form onSubmit={handleSendLink} className="space-y-4">
              <div>
                <label className="block text-sm font-light text-neutral-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-400"
                  placeholder="Enter your email"
                />
              </div>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              <button
                type="submit"
                className="w-full bg-neutral-900 text-white py-2 rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-neutral-900">Check your email</h3>
            <p className="mt-2 text-neutral-600">
              We've sent a password reset link to {email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
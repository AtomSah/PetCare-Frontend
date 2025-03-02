import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';

const LoginPage = () => {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, isLoading, error } = useLogin(); // Get login function and states
  const navigate = useNavigate(); // For redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/'); // Redirect on successful login
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-b from-[#f0f7fc] to-[#ffffff] overflow-hidden">
      {/* Left side - Login Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md h-full flex flex-col justify-center">
          {/* Logo/Brand */}
          <div className="mb-4">
            <Link to="/" className="flex items-center justify-center md:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-[#2196f3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .137 1.217 1.5 2 3 2s2.5-1 3-1.5"></path>
                <path d="M14 5.172C14 3.782 15.577 2.679 17.5 3c2.823.47 4.113 6.006 4 7-.137 1.217-1.5 2-3 2s-2.5-1-3-1.5"></path>
                <path d="M8 14v.5"></path>
                <path d="M16 14v.5"></path>
                <path d="M11.25 16.25h1.5L12 17l-.75-.75z"></path>
                <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309"></path>
              </svg>
              <span className="text-2xl font-light tracking-tight text-gray-800">
                pet<span className="font-medium">care</span>
              </span>
            </Link>
          </div>

          {/* Welcome Text */}
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Welcome back</h2>
            <p className="text-sm text-gray-600">Please sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2196f3] focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2196f3] focus:border-transparent transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded-sm border-gray-300 text-[#2196f3] focus:ring-[#2196f3] transition-all cursor-pointer"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsForgotPasswordOpen(true);
                  }}
                  className="text-sm text-[#2196f3] hover:text-[#1976d2] font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-2">
                      <p className="text-xs text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2196f3] to-[#1976d2] text-white py-2.5 rounded-xl hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2196f3] focus:ring-opacity-50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span>Sign in</span>
                )}
              </button>

              {/* Or Divider */}
              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-gray-200 absolute w-full"></div>
                <div className="bg-white px-3 relative text-xs text-gray-500">Or continue with</div>
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-sm">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <svg className="h-4 w-4 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                  </svg>
                  <span className="text-sm">Facebook</span>
                </button>
              </div>
            </form>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-3">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#2196f3] hover:text-[#1976d2] font-medium">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-2/5 relative">
        <div className="absolute inset-0 bg-gradient-to-r mix-blend-multiply"></div>
        <img
          src="src/assets/image/5482557.jpg"
          alt="Login background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-md w-full">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Reset Password</h3>
              <button 
                onClick={() => setIsForgotPasswordOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div className="mb-3">
              <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="reset-email"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2196f3] focus:border-transparent"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <button
              type="button"
              className="w-full bg-[#2196f3] text-white py-2.5 rounded-xl hover:bg-[#1976d2] transition-colors"
            >
              Send Reset Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
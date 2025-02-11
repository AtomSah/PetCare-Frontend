import React from 'react';
import { Link } from 'react-router-dom';


const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-neutral-50">
        <div className="w-full max-w-md space-y-8 px-4 sm:px-0">
          {/* Logo/Brand */}
          <div className="mt-6 md:mt-0 mb-6 md:mb-10">
            <h1 className="text-2xl font-light tracking-tight text-neutral-900 text-center md:text-left">
              pet<span className="font-medium">care</span>
            </h1>
          </div>

          {/* Welcome Text */}
          <div className="mb-6 md:mb-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-light text-neutral-900 mb-2">Welcome back</h2>
            <p className="text-sm md:text-base text-neutral-600 font-light">Please enter your details to sign in</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-light text-neutral-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-400 text-sm md:text-base"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-light text-neutral-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-400 text-sm md:text-base"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-neutral-200 text-neutral-900"
                />
                <span className="ml-2 text-sm text-neutral-600 font-light">Remember me</span>
              </label>
              <button type="button" className="text-sm text-neutral-600 hover:text-neutral-900 font-light">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 text-white py-2.5 md:py-3 rounded-lg hover:bg-neutral-800 transition-colors text-sm md:text-base"
            >
              Sign in
            </button>

            <div className="text-center">
              <p className="text-sm text-neutral-600 font-light">
                Don't have an account?{' '}
                <Link to="/register" className="text-neutral-900 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-2/5">
        <img
          src="src/assets/image/5482557.jpg"
          alt="Login background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
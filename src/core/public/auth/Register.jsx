import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupImage from '../../../assets/image/login_pet.jpg';
import { useRegister } from '@/hooks/useRegister';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const { register, isLoading, error } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await register(fullname, email, password, phone, address);

    if (result.success) {
      navigate('/login'); // Redirect on success
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Signup Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-neutral-50">
        <div className="w-full max-w-md space-y-8 px-4 sm:px-0">
          <div className="mt-6 md:mt-0 mb-6 md:mb-10">
            <h1 className="text-2xl font-light tracking-tight text-neutral-900 text-center md:text-left">
              pet<span className="font-medium">care</span>
            </h1>
          </div>

          <div className="mb-6 md:mb-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-light text-neutral-900 mb-2">Create an account</h2>
            <p className="text-sm md:text-base text-neutral-600 font-light">Please enter your details to sign up</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-light text-neutral-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-400 text-sm md:text-base"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-light text-neutral-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-400 text-sm md:text-base"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-light text-neutral-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-400 text-sm md:text-base"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-light text-neutral-700 mb-1.5">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-400 text-sm md:text-base"
                placeholder="Enter your address"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-neutral-900 text-white py-2.5 md:py-3 rounded-lg hover:bg-neutral-800 transition-colors text-sm md:text-base"
            >
              {isLoading ? 'Signing up...' : 'Sign up'}
            </button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="text-center">
              <p className="text-sm text-neutral-600 font-light">
                Already have an account?{' '}
                <Link to="/login" className="text-neutral-900 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:block md:w-2/5">
        <img src={signupImage} alt="Signup background" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
export default Register;

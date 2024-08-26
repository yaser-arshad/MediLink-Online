import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useStateContext } from '../contexts/ContextProvider';
const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useStateContext();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // Check if the email exists
      const emailCheckResponse = await fetch(`http://localhost:5000/api/users/email/${email}`);
      const emailCheckData = await emailCheckResponse.json();

      if (!emailCheckData.exists) {
        setErrorMessage('Email does not exist');
        return;
      }

      // Authenticate user with email and password
      const loginResponse = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        throw new Error('Invalid email or password');
      }

      const userData = await loginResponse.json();

      // Set the user data in your context provider

      login(userData);
      // Navigate based on user role
      if (userData.role === 'admin') {
        navigate('/admin/home');
      } else if (userData.role === 'customer') {
        navigate('/customer');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-semibold">Please Login to Dashboard</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleLogin} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input id="email" name="email" type="text" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black" placeholder="Email address" required />
                </div>
                <div className="relative">
                  <div className="flex items-center">
                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black" placeholder="Password" required />
                    <button type="button" onClick={togglePasswordVisibility} className="text-gray-600 focus:outline-none">
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>
                </div>
                <div>
                  {errorMessage && <span className='text-red-500 text-sm'>{errorMessage}</span>}
                  <p className='text-base mt-1'>Don't have an account. Click Here <Link to='/signup' className='underline text-blue-600'>Sign Up</Link></p>
                </div>
                <div className="relative">
                  <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white rounded px-6 py-1 ">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

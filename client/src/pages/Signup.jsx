import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    try {

      const emailExistsResponse = await fetch(`http://localhost:5000/api/users/email/${userData.email}`);
      if (emailExistsResponse.ok) {
        const emailExistsData = await emailExistsResponse.json();
        if (emailExistsData.exists) {
          throw new Error('Email already exists. Please choose a different email.');
        }
      } else {
        throw new Error('Failed to check email existence');
      }

      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create account');
      }

      // Clear input fields after successful signup
      setUserData({
        name: '',
        email: '',
        password: '',
        role: '',
      });

      // Display success message for 2 seconds
      setSuccessMessage('Account created successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        // Navigate to the login form after 2 seconds
        navigate('/login');
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
       { successMessage && <p className="bg-green-500 text-white p-3 rounded-md mb-4 text-center">{successMessage}</p>}
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-semibold">Please Create An Account</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSignup} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <div className="relative">
                  <input id="name" name="name" type="text" value={userData.name} onChange={handleChange} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black " placeholder="Name" required />
                </div>
                <div className="relative">
                  <input id="email" name="email" type="email" value={userData.email} onChange={handleChange} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black " placeholder="Email address" required />
                </div>
                <div className="relative">
                  <div className="flex items-center">
                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={userData.password} onChange={handleChange} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black " placeholder="Password" required />
                    <button type="button" onClick={togglePasswordVisibility} className="text-gray-600 focus:outline-none">
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Password must be at least 8 characters long</p>
                </div>
                <div className="relative">
                  <select id="role" name="role" value={userData.role} onChange={handleChange} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black" required>
                    <option value="" disabled>Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>
                <div>
                  <p className='text-base'>If you have an account, please <Link to='/login' className='underline text-blue-600'>Login Now</Link> here</p>
                </div>
                <div className="relative">
                  <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white rounded px-6 py-1" >Sign up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

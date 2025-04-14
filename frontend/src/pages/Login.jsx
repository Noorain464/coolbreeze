import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Step 1: Authenticate with Firebase
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCIrKqUvVzf9ir4N3tZx9GJw2yrjp9L8Bk`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
  
      const { idToken } = response.data;
      console.log('Firebase ID Token:', idToken); // Log the token
  
      // Step 2: Send the Firebase ID token to your backend
      const backendResponse = await axios.post(
        'http://localhost:8000/api/auth/google-login',
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`, // Send the token in the Authorization header
          },
        }
      );
  
      console.log('Backend Response:', backendResponse.data); // Log the backend response
  
      const { role } = backendResponse.data;
  
      // Step 3: Handle role-based navigation
      if (role === 'admin') {
        navigate('/admin'); // Redirect to admin panel
      } else {
        navigate('/'); // Redirect to user dashboard
      }
  
      setSuccess('Login successful!');
      setError('');
    } catch (err) {
      if (err.response?.status === 403) {
        setError('Your email is not approved for login.');
        return;
      }
  
      const errorCode = err.response?.data?.error?.message;
      const errorMessages = {
        EMAIL_NOT_FOUND: 'This email is not registered.',
        INVALID_PASSWORD: 'The password is incorrect.',
        USER_DISABLED: 'This account has been disabled.',
      };
  
      setError(errorMessages[errorCode] || 'Login failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
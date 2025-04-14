import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Register the user in Firebase
      const firebaseResponse = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCIrKqUvVzf9ir4N3tZx9GJw2yrjp9L8Bk`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      console.log('Firebase Registration Successful:', firebaseResponse.data);

      // Step 2: Send user details to your backend
      const backendResponse = await axios.post('http://localhost:8000/api/auth/signup', {
        name,
        email,
        password, // You can hash the password in the backend
        role,
      });

      console.log('Backend Response:', backendResponse.data);

      setSuccess('Account created successfully! You can now log in.');
      setError('');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
    } catch (err) {
      console.error('Error during signup:', err.response?.data);
      const errorCode = err.response?.data?.error?.message || err.response?.data?.message;
      const errorMessages = {
        EMAIL_EXISTS: 'This email is already registered.',
        INVALID_PASSWORD: 'Password must be at least 6 characters long.',
      };

      setError(errorMessages[errorCode] || 'Signup failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSignUp} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
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
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-medium mb-2">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="rider">Rider</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://employee-management-backend-4.onrender.com/user/register', formData);
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Error registering user. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 relative overflow-hidden">
      {/* Bubbly Animation Shapes */}
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 bg-blue-300 rounded-full opacity-50"
        animate={{ x: [0, 20, -20, 0], y: [0, 20, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-24 h-24 bg-teal-300 rounded-full opacity-40"
        animate={{ x: [0, -20, 20, 0], y: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />

      {/* Registration Form Container */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 z-10">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {['userName', 'email', 'password'].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 capitalize">{field}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

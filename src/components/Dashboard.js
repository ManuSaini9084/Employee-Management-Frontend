import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  // Redirect to login if username is not found
  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
      {/* Container for dashboard content */}
      <motion.div
        className="bg-white shadow-xl rounded-lg p-12 w-full max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Welcome Message */}
        <motion.h1
          className="text-4xl font-extrabold text-center text-gray-800 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Welcome, {username}
        </motion.h1>

        {/* Buttons Container */}
        <div className="flex justify-center gap-8 mt-10">
          <Link
            to="/employees"
            className="px-8 py-4 bg-green-500 text-white rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            <span className="text-lg font-semibold">Employee List</span>
          </Link>
          <Link
            to="/create-employee"
            className="px-8 py-4 bg-blue-500 text-white rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <span className="text-lg font-semibold">Create Employee</span>
          </Link>
        </div>

        {/* Animated Floating Shapes */}
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
      </motion.div>
    </div>
  );
};

export default Dashboard;

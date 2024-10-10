import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    image: null,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      await axios.post('https://employee-management-backend-4.onrender.com/employee/create', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/'); // Redirect to the employee list after successful creation
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Error creating employee. Please try again.');
      } else {
        setError('Network error. Please try again.');
      }
      console.error('Create error:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Initial state of the form container
      animate={{ opacity: 1, y: 0 }} // Final state for animation
      transition={{ duration: 0.8 }} // Duration of the animation
      className="min-h-screen bg-gray-100 flex items-center justify-center p-8"
    >
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Create Employee
        </motion.h1>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-red-500 text-center mb-4"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit}>
          {['name', 'email', 'mobile'].map((field) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4"
            >
              <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <label className="block text-gray-700">Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <label className="block text-gray-700">Gender</label>
            <div>
              {['Male', 'Female', 'Other'].map((option) => (
                <label key={option} className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <label className="block text-gray-700">Course</label>
            <div>
              {['BCA', 'MCA', 'BSC'].map((option) => (
                <label key={option} className="mr-4">
                  <input
                    type="radio"
                    name="course"
                    value={option}
                    checked={formData.course === option}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white w-full p-2 rounded-md hover:bg-blue-600"
          >
            Create Employee
          </motion.button>
        </form>

        <motion.button
          onClick={() => navigate('/employees')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400"
        >
          Back to Dashboard
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CreateEmployee;

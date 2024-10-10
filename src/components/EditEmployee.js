import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://employee-management-backend-4.onrender.com/employee/${id}`);
        
        const { name, email, mobileNo, designation, gender, course } = response.data;
        // Map the fetched data to the formData state
        setFormData({
          name,
          email,
          mobile: mobileNo, // Ensure this matches your formData structure
          designation,
          gender,
          course,
        });
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error fetching employee data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.put(`https://employee-management-backend-4.onrender.com/employee/${id}`, formData);
      navigate('/employees');
    } catch (error) {
      setError('Error updating employee. Please try again.');
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/employees'); // Navigate back to employee list
  };

  if (loading) {
    return <div>Loading...</div>; // Simple loading state
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Employee</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button
          onClick={handleBack}
          className={`mb-4 w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          Back to Employee List
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'email', 'mobile', 'designation', 'course'].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 capitalize">{field}</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}
          <div>
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;

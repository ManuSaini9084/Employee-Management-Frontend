import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState(''); // State to hold search input
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://employee-management-backend-4.onrender.com/employee');
        setEmployees(response.data);
       
      } catch (err) {
        setError('Error fetching employee data. Please try again.');
        console.error('Fetch error:', err);
      }
    };

    fetchEmployees();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filter employees based on search input
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()) ||
      employee.designation.toLowerCase().includes(search.toLowerCase()) ||
      employee.course.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    console.log("Deleting employee with ID:", id);
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/employee/${id}`);
        console.log("Response from server:", response.data);
        setEmployees(employees.filter((employee) => employee._id !== id));
      } catch (err) {
        setError('Error deleting employee. Please try again.');
        console.error('Delete error:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Flex container for back button and search bar */}
      <div className="flex justify-between items-center mb-8">
        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back to Dashboard
        </button>

        {/* Search Input */}
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search employees by name, email, or designation..."
          className="w-full md:w-1/3 px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Employee List</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Mobile</th>
              <th className="py-3 px-4 text-left">Designation</th>
              <th className="py-3 px-4 text-left">Gender</th>
              <th className="py-3 px-4 text-left">Course</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{employee.name}</td>
                <td className="py-3 px-4">{employee.email}</td>
                <td className="py-3 px-4">{employee.mobileNo}</td>
                <td className="py-3 px-4">{employee.designation}</td>
                <td className="py-3 px-4">{employee.gender}</td>
                <td className="py-3 px-4">{employee.course}</td>
                <td className="py-3 px-4">
                  <Link
                    to={`/edit-employee/${employee._id}`}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Show message if no employees match the search criteria */}
        {filteredEmployees.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No employees found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;

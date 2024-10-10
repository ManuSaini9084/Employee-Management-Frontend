import axios from 'axios';

// Set the base URL for API calls
const API_URL = 'http://localhost:5000/api'; // Update this based on your backend URL

// Function to handle login API call
export const login = (user) => axios.post(`${API_URL}/auth/login`, user);

// Function to get the list of employees
export const getEmployees = () => axios.get(`${API_URL}/employees`);

// Function to create a new employee
export const createEmployee = (employee) => axios.post(`${API_URL}/employees`, employee);

// Function to update employee details
export const updateEmployee = (id, employee) => axios.put(`${API_URL}/employees/${id}`, employee);

// Function to delete an employee
export const deleteEmployee = (id) => axios.delete(`${API_URL}/employees/${id}`);

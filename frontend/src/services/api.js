import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// User API calls
export const userAPI = {
  createUser: (name) => api.post('/users', { name }),
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  deleteUser: (id) => api.delete(`/users/${id}`)
};

// Task API calls
export const taskAPI = {
  createTask: (title, assignedTo, status) => 
    api.post('/tasks', { title, assignedTo, status }),
  getTasks: () => api.get('/tasks'),
  getTask: (id) => api.get(`/tasks/${id}`),
  updateTask: (id, title, assignedTo, status) => 
    api.put(`/tasks/${id}`, { title, assignedTo, status }),
  deleteTask: (id) => api.delete(`/tasks/${id}`)
};

export default api;

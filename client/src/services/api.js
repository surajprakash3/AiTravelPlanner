import axios from 'axios';

/**
 * Axios instance pre-configured with base URL.
 * The auth token interceptor attaches the JWT from localStorage automatically.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------------------------------------------------------------------
// Auth API
// ---------------------------------------------------------------------------
export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
export const getProfile = () => api.get('/auth/profile');

// ---------------------------------------------------------------------------
// Trips API
// ---------------------------------------------------------------------------
export const getTrips = (search = '') =>
  api.get('/trips', { params: search ? { search } : {} });

export const createTrip = (data) => api.post('/trips', data);
export const getTripById = (id) => api.get(`/trips/${id}`);
export const updateTrip = (id, data) => api.put(`/trips/${id}`, data);
export const deleteTrip = (id) => api.delete(`/trips/${id}`);

export default api;

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081', // Adjust to your backend URL
});
// Add a request interceptor to include the token in headers
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Attach token
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// response interceptor to handle unauthorized access
instance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    console.error('Unauthorized, redirecting to login');
    localStorage.removeItem('token'); // Clear token on unauthorized
    window.location.href = '/'; // Redirect to login
  }
  return Promise.reject(error);
});

export default instance;














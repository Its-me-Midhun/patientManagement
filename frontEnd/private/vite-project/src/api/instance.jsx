import axios from 'axios';
const Instance = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: { Authorization: `Bearer ${localStorage.getItem('accessTocken')}` },
});

Instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'accessTocken'
    )}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default Instance;

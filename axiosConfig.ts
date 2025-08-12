import axios from 'axios';

const BASE_URL = __DEV__ ? 'http://10.0.2.2:8000' : 'http://server:8000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

import axios from 'axios';
import { backendUrl } from './urls';

axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: backendUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
api.interceptors.request.use(
  (config) => {
    // Modify request (e.g., add token)
    console.log(`Request sent :`, config);
    // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    // Any status code within 2xx\
    console.log(`Response received :`, response);

    return response;
  },
  (error) => {
    // Handle non-2xx errors (e.g., 401 Unauthorized)
    // if (error.response.status === 401) {
    //   // Redirect to login or refresh token
    // }
    console.log(error)
    return Promise.reject(error);
  }
);
export default api;

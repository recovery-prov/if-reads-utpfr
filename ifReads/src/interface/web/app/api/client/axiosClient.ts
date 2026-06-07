import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized access - token might be expired');
    } else if (error.response?.status === 403) {
      console.log('Access forbidden');
    } else if (error.response?.status >= 500) {
      console.log('Server error occurred');
    }
    return Promise.reject(error);
  },
);

import axios from 'axios';

// development
export const api = axios.create({
  baseURL: 'http://localhost:5000/kommerce',
  headers: {
    'Content-Type': 'application/json',
  },
});

{/*
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (
      [401, 403, 500].includes(status) &&
      message?.includes('Invalid token')
    ) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);
*/}
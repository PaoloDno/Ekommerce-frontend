import axios from 'axios';

// development
export const api = axios.create({
  baseURL: 'http://localhost:5000/kommerce',
  headers: {
    'Content-Type': 'application/json',
  },
});

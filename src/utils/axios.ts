import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1',
  timeout: 5000,
});

export default api;
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach JWT token to headers if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  register: async (username, password, gradeLevel) => {
    const response = await api.post('/auth/register', { username, password, gradeLevel });
    return response.data;
  }
};

export const promptAPI = {
  getTemplates: async () => {
    const response = await api.get('/prompts/templates');
    return response.data;
  },
  compile: async (categoryId, inputs, gradeLevel) => {
    const response = await api.post('/prompts/compile', { categoryId, inputs, gradeLevel });
    return response.data;
  },
  save: async (promptData) => {
    const response = await api.post('/prompts/save', promptData);
    return response.data;
  },
  getHistory: async (search = '', category = '') => {
    const response = await api.get('/prompts/history', {
      params: { search, category }
    });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/prompts/${id}`);
    return response.data;
  }
};

export default api;

import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик запросов (добавление токена)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Перехватчик ответов
axiosClient.interceptors.response.use(
  (response) => {
    // Возвращаем только данные из ответа
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Ошибка авторизации (401). Перенаправление на логин...');
      // Здесь можно вызвать логаут или редирект
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

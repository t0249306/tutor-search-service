import axios from 'axios';

// Убираем /api, так как json-server работает от корня
const API_URL = 'http://localhost:3000';

export const getTutors = async (subject = '') => {
  // json-server поддерживает поиск через параметр q или точное совпадение
  const params = subject ? { subject_like: subject } : {};
  const response = await axios.get(`${API_URL}/tutors`, { params });
  return response.data;
};

export const getReviews = async (tutorId) => {
  // В json-server отзывы обычно фильтруются по tutorId
  const response = await axios.get(`${API_URL}/reviews`, { params: { tutorId } });
  return response.data;
};

export const createReview = async (tutorId, reviewData) => {
  const response = await axios.post(`${API_URL}/reviews`, { ...reviewData, tutorId });
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData);
  return response.data;
};

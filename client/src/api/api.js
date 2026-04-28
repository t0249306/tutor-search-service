import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getTutors = async (subject = '') => {
  const response = await axios.get(`${API_URL}/tutors`, { params: { subject } });
  return response.data;
};

export const getReviews = async (tutorId) => {
  const response = await axios.get(`${API_URL}/reviews/${tutorId}`);
  return response.data;
};

export const createReview = async (tutorId, reviewData) => {
  const response = await axios.post(`${API_URL}/reviews/${tutorId}`, reviewData);
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData);
  return response.data;
};
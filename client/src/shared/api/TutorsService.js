import axiosClient from './axiosClient';

const TutorsService = {
  getAll: async () => {
    return await axiosClient.get('/tutors');
  },
  getById: async (id) => {
    return await axiosClient.get(`/tutors/${id}`);
  }
};

export default TutorsService;

import api from './api';

export const studentService = {
  getStats: async () => {
    const response = await api.get('/api/student/stats');
    return response.data;
  },
  getAttendance: async () => {
    const response = await api.get('/api/student/attendance');
    return response.data;
  },
  getExams: async () => {
    const response = await api.get('/api/student/exams');
    return response.data;
  },
  getResults: async () => {
    const response = await api.get('/api/student/results');
    return response.data;
  },
  getComplaints: async () => {
    const response = await api.get('/api/student/complaints');
    return response.data;
  },
  createComplaint: async (complaintData) => {
    const response = await api.post('/api/student/complaints', complaintData);
    return response.data;
  }
};

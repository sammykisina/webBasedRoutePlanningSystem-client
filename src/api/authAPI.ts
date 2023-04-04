import { LoginData, RegisterData } from '../types/typings.t';
import { API } from './api';

const AuthAPI = {
  login: async (data: LoginData) => API.post('/auth/login', data),

  register: async (data: RegisterData) => API.post('/auth/register', data),

  getUserProfile: async (userId: number) => API.get(`/users/${userId}/profile`),

  updatePassword: async (data: { userId: number; password: string }) =>
    API.post('/auth/password-reset', data),
};

export default AuthAPI;

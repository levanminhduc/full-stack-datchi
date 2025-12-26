import axios from 'axios';
import { API_BASE_URL } from '../../../config/env';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '../types';

const authApi = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
});

// Add token to requests if available
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await authApi.post<AuthResponse>('/login', credentials);
  return response.data;
};

export const register = async (
  credentials: RegisterCredentials,
): Promise<AuthResponse> => {
  const response = await authApi.post<AuthResponse>('/register', credentials);
  return response.data;
};

export const getProfile = async (): Promise<User> => {
  const response = await authApi.get<User>('/profile');
  return response.data;
};

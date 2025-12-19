export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const env = {
  apiUrl: API_BASE_URL,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;


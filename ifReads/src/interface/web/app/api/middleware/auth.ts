import z from 'zod';
import { apiClient } from '../client/axiosClient';

export const authApi = {
  login: async (data: LoginInput): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  checkAuth: async (): Promise<{
    isValid: boolean;
    user?: { id: number; email: string };
  }> => {
    try {
      const response = await apiClient.get('/auth/me');
      return {
        isValid: true,
        user: response.data.user,
      };
    } catch {
      return { isValid: false };
    }
  },

  register: async (
    data: RegisterInput,
  ): Promise<{
    message: string;
    user: { id: number; name: string; email: string };
  }> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
};

const LoginInput = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

const RegisterUserInput = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof LoginInput>;
export type RegisterInput = z.infer<typeof RegisterUserInput>;

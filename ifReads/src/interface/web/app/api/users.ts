import z from 'zod';
import { apiClient } from './client/axiosClient';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const UpdateUserInput = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email format').optional(),
});

export type User = z.infer<typeof UserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserInput>;

export const usersApi = {
  getMe: async (): Promise<User> => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },

  updateMe: async (data: UpdateUserInput): Promise<User> => {
    const response = await apiClient.patch('/users/me', data);
    return response.data;
  },
};

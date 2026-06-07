import z from 'zod';
import { apiClient } from '../client/axiosClient';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

const FictionSummarySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  genre: z.string().nullable(),
  publishedAt: z.number().nullable(),
  link: z.string().nullable(),
  author: z.object({ id: z.number(), name: z.string() }),
  authors: z.array(
    z.object({ id: z.number(), name: z.string(), role: z.string() }),
  ),
});

const FavoriteSchema = z.object({
  userId: z.number(),
  fictionId: z.number(),
  createdAt: z.string(),
  fiction: FictionSummarySchema,
});

const ReviewWithFictionSchema = z.object({
  id: z.number(),
  rating: z.number(),
  comment: z.string().nullable(),
  narrative: z.number(),
  interactivity: z.number(),
  originality: z.number(),
  fictionId: z.number(),
  createdAt: z.string(),
  fiction: z.object({ id: z.number(), title: z.string() }),
});

const UpdateMeInputSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
});

export type User = z.infer<typeof UserSchema>;
export type FavoriteEntry = z.infer<typeof FavoriteSchema>;
export type ReviewWithFiction = z.infer<typeof ReviewWithFictionSchema>;
export type UpdateMeInput = z.infer<typeof UpdateMeInputSchema>;

export const usersApi = {
  getMe: async (): Promise<User> => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },

  updateMe: async (data: UpdateMeInput): Promise<User> => {
    const response = await apiClient.patch('/users/me', data);
    return response.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ message: string }> => {
    const response = await apiClient.patch('/users/me/password', data);
    return response.data;
  },

  getFavorites: async (): Promise<FavoriteEntry[]> => {
    const response = await apiClient.get('/users/me/favorites');
    return response.data;
  },

  addFavorite: async (fictionId: number): Promise<void> => {
    await apiClient.post(`/users/me/favorites/${fictionId}`);
  },

  removeFavorite: async (fictionId: number): Promise<void> => {
    await apiClient.delete(`/users/me/favorites/${fictionId}`);
  },

  getMyReviews: async (): Promise<ReviewWithFiction[]> => {
    const response = await apiClient.get('/users/me/reviews');
    return response.data;
  },
};

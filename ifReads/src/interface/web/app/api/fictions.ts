import z from 'zod';
import { apiClient } from './client/axiosClient';

const FictionSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  genre: z.string().nullable(),
  publishedAt: z.number().nullable(),
  link: z.string().nullable(),
  authorId: z.number(),
  author: z.object({ id: z.number(), name: z.string() }),
  authors: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        role: z.string(),
        fictionId: z.number().optional(),
        createdAt: z.string().optional(),
      }),
    )
    .optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  averageRating: z.number().nullable().optional(),
});

const CreateFictionInput = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  genre: z.string().optional(),
  publishedAt: z.number().int().min(1900).max(2100).optional(),
  link: z.string().min(1, 'Link is required'),
});

const UpdateFictionInput = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  genre: z.string().optional(),
  publishedAt: z.number().int().min(1900).max(2100).optional(),
  link: z.string().optional(),
});

const PaginatedFictionsSchema = z.object({
  data: z.array(FictionSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export type Fiction = z.infer<typeof FictionSchema>;
export type CreateFictionInput = z.infer<typeof CreateFictionInput>;
export type UpdateFictionInput = z.infer<typeof UpdateFictionInput>;
export type PaginatedFictions = z.infer<typeof PaginatedFictionsSchema>;

export const fictionsApi = {
  findAll: async (page = 1, limit = 10): Promise<PaginatedFictions> => {
    const response = await apiClient.get('/fiction', {
      params: { page, limit },
    });
    return response.data;
  },

  findOne: async (id: number): Promise<Fiction> => {
    const response = await apiClient.get(`/fiction/${id}`);
    return response.data;
  },

  create: async (data: CreateFictionInput): Promise<Fiction> => {
    const response = await apiClient.post('/fiction', data);
    return response.data;
  },

  update: async (id: number, data: UpdateFictionInput): Promise<Fiction> => {
    const response = await apiClient.patch(`/fiction/${id}`, data);
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(`/fiction/${id}`);
  },

  findMine: async (): Promise<Fiction[]> => {
    const response = await apiClient.get('/fiction/mine');
    return response.data;
  },
};

import z from 'zod';
import { apiClient } from './client/axiosClient';

const AuthorSchema = z.object({
  id: z.number(),
  name: z.string(),
  role: z.enum(['main_author', 'coauthor', 'collaborator']),
  fictionId: z.number(),
  createdAt: z.string(),
});

const CreateAuthorInput = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['main_author', 'coauthor', 'collaborator']),
});

export type Author = z.infer<typeof AuthorSchema>;
export type CreateAuthorInput = z.infer<typeof CreateAuthorInput>;

export const authorsApi = {
  findAll: async (fictionId: number): Promise<Author[]> => {
    const response = await apiClient.get(`/fictions/${fictionId}/authors`);
    return response.data;
  },

  create: async (
    fictionId: number,
    data: CreateAuthorInput,
  ): Promise<Author> => {
    const response = await apiClient.post(
      `/fictions/${fictionId}/authors`,
      data,
    );
    return response.data;
  },

  remove: async (fictionId: number, id: number): Promise<void> => {
    await apiClient.delete(`/fictions/${fictionId}/authors/${id}`);
  },
};

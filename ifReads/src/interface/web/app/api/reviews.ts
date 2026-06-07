import z from 'zod';
import { apiClient } from './client/axiosClient';

const ReviewSchema = z.object({
  id: z.number(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().nullable(),
  narrative: z.number().int().min(1).max(5),
  interactivity: z.number().int().min(1).max(5),
  originality: z.number().int().min(1).max(5),
  fictionId: z.number(),
  authorId: z.number(),
  author: z.object({ id: z.number(), name: z.string() }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const CreateReviewInput = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  narrative: z.number().int().min(1).max(5),
  interactivity: z.number().int().min(1).max(5),
  originality: z.number().int().min(1).max(5),
});

const UpdateReviewInput = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().optional(),
  narrative: z.number().int().min(1).max(5).optional(),
  interactivity: z.number().int().min(1).max(5).optional(),
  originality: z.number().int().min(1).max(5).optional(),
});

const PaginatedReviewsSchema = z.object({
  data: z.array(ReviewSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export type Review = z.infer<typeof ReviewSchema>;
export type CreateReviewInput = z.infer<typeof CreateReviewInput>;
export type UpdateReviewInput = z.infer<typeof UpdateReviewInput>;
export type PaginatedReviews = z.infer<typeof PaginatedReviewsSchema>;

export const reviewsApi = {
  findAll: async (
    fictionId: number,
    page = 1,
    limit = 10,
  ): Promise<PaginatedReviews> => {
    const response = await apiClient.get(`/fictions/${fictionId}/reviews`, {
      params: { page, limit },
    });
    return response.data;
  },

  create: async (
    fictionId: number,
    data: CreateReviewInput,
  ): Promise<Review> => {
    const response = await apiClient.post(
      `/fictions/${fictionId}/reviews`,
      data,
    );
    return response.data;
  },

  update: async (
    fictionId: number,
    id: number,
    data: UpdateReviewInput,
  ): Promise<Review> => {
    const response = await apiClient.patch(
      `/fictions/${fictionId}/reviews/${id}`,
      data,
    );
    return response.data;
  },

  remove: async (fictionId: number, id: number): Promise<void> => {
    await apiClient.delete(`/fictions/${fictionId}/reviews/${id}`);
  },
};

import { apiClient } from '@/shared/libs/api/apiClient';

export const likeReview = async (reviewId: number) => {
  return apiClient.post(`reviews/${reviewId}/like`);
};

export const unlikeReview = async (reviewId: number) => {
  return apiClient.delete(`reviews/${reviewId}/like`);
};

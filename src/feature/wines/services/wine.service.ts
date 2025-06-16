import { WineDetailResponse } from '@/feature/wines/schema/wine.schema';
import { apiClient } from '@/shared/libs/api/apiClient';

export const getWine = async (id: number) => {
  return apiClient.get(`/wines/${id}`).json<WineDetailResponse>();
};

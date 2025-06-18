// 'use client';

/**
 * @author Sumin
 * @since 2025-06-18
 * @description 와인 상세 쿼리 훅
 * @returns {JSX.Element} 와인 상세 쿼리 훅
 *
 */

import { useQuery } from '@tanstack/react-query';

import type { GetWineDetailResponse } from '@/feature/wines/schema/wine.schema';
import { getWineDetail } from '@/feature/wines/services/wine.service';

interface UseWineDetailOptions {
  wineId: number;
  enabled?: boolean;
}

export const useWineDetail = ({
  wineId,
  enabled = true,
}: UseWineDetailOptions) => {
  return useQuery<GetWineDetailResponse>({
    queryKey: ['wine', 'detail', wineId],
    queryFn: () => getWineDetail(wineId),
    enabled: enabled && !!wineId,
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
    gcTime: 1000 * 60 * 10, // 10분간 메모리에 캐시 보관
    retry: (failureCount, error) => {
      // 404 에러는 재시도하지 않음
      if (error instanceof Error && error.message.includes('404')) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

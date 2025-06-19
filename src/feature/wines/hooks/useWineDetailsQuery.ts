// 'use client';

/**
 * @author Sumin
 * @since 2025-06-18
 * @description 와인 상세 쿼리 훅
 * @returns UseQueryResult<GetWineDetailResponse> React Query 결과 객체
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
      if (
        error &&
        typeof error === 'object' &&
        'status' in error &&
        error.status === 404
      ) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// export const useWineReviewsInfinite = ({
//   wineId,
//   enabled = true,
// }: UseWineDetailOptions) => {
//   return useInfiniteQuery({
//     queryKey: ['wine', 'reviews', wineId],
//     queryFn: async ({ pageParam: _pageParam = null }) => {
//       // getWineDetail로 전체 리뷰를 가져와서 가상 페이지네이션 구현
//       const wineDetail = await getWineDetail(wineId);
//       const allReviews = wineDetail.reviews || [];

//       // 클라이언트 사이드에서 페이지네이션 시뮬레이션
//       const pageSize = 10;
//       const page = _pageParam || 0;
//       const startIndex = page * pageSize;
//       const endIndex = startIndex + pageSize;
//       const pageReviews = allReviews.slice(startIndex, endIndex);

//       return {
//         list: pageReviews,
//         totalCount: allReviews.length,
//         nextCursor: endIndex < allReviews.length ? page + 1 : null,
//       };
//     },
//     enabled: enabled && !!wineId,
//     initialPageParam: 0,
//     getNextPageParam: (lastPage) => lastPage.nextCursor,
//     staleTime: 1000 * 60 * 3,
//     gcTime: 1000 * 60 * 10,
//   });
// };

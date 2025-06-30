import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import {
  deleteWine as deleteWineApi,
  getUserWines,
  Wine,
} from '@/feature/myprofile/services/user.service';
import {
  GetWineDetailResponse,
  UpdateWineResponse,
} from '@/feature/wines/schema/wine.schema';

interface UseUserWinesOptions {
  accessToken: string;
  enabled?: boolean;
}

// 와인 목록을 updatedAt 기준으로 내림차순 정렬하는 함수
const sortWinesByUpdatedAt = (wineList: Wine[]) => {
  return [...wineList].sort((a, b) => {
    const getDate = (wine: Wine) =>
      wine.updatedAt
        ? new Date(wine.updatedAt)
        : wine.createdAt
          ? new Date(wine.createdAt)
          : new Date(0);

    return getDate(b).getTime() - getDate(a).getTime();
  });
};

export const useUserWinesQuery = ({
  accessToken,
  enabled = true,
}: UseUserWinesOptions) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['user', 'wines', accessToken],
    queryFn: async () => {
      const data = await getUserWines();
      const wineList = Array.isArray(data.list) ? data.list : [];
      return sortWinesByUpdatedAt(wineList);
    },
    enabled: enabled && !!accessToken,
    staleTime: 1000 * 60 * 2, // 2분간 fresh 상태 유지
    gcTime: 1000 * 60 * 5, // 5분간 메모리에 캐시 보관
  });

  // 와인 업데이트 함수
  const updateWineInCache = useCallback(
    (wineId: number, updatedData: UpdateWineResponse) => {
      queryClient.setQueryData(
        ['user', 'wines', accessToken],
        (oldData: Wine[]) => {
          if (!oldData) return oldData;

          const updatedWines = oldData.map((wine) =>
            wine.id === wineId
              ? {
                  ...wine,
                  ...updatedData,
                  updatedAt: new Date().toISOString(),
                }
              : wine,
          );

          return sortWinesByUpdatedAt(updatedWines);
        },
      );

      // 와인 상세 캐시도 업데이트
      queryClient.setQueryData(
        ['wine', 'detail', wineId],
        (oldWineDetail: GetWineDetailResponse | undefined) => {
          if (oldWineDetail) {
            return {
              ...oldWineDetail,
              ...updatedData,
              updatedAt: new Date().toISOString(),
            };
          }
          return oldWineDetail;
        },
      );
    },
    [queryClient, accessToken],
  );

  // 와인 삭제 함수
  const deleteWine = useCallback(
    async (wineId: number) => {
      await deleteWineApi(wineId);
      // 캐시에서 해당 와인 삭제
      queryClient.setQueryData(
        ['user', 'wines', accessToken],
        (oldData: Wine[]) => {
          if (!oldData) return oldData;
          return oldData.filter((wine) => wine.id !== wineId);
        },
      );

      // 와인 상세 캐시 제거
      queryClient.removeQueries({
        queryKey: ['wine', 'detail', wineId],
      });

      return true;
    },
    [queryClient, accessToken],
  );

  // 캐시 무효화 함수
  const invalidateUserWines = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ['user', 'wines', accessToken],
    });
  }, [queryClient, accessToken]);

  return {
    ...query,
    data: query.data || [],
    updateWineInCache,
    deleteWine,
    invalidateUserWines,
  };
};

import { useInfiniteQuery } from '@tanstack/react-query';

import { WineFilterFormValues } from '@/feature/wines/schema/wine-filter.schema';
import { getWines } from '@/feature/wines/services/wine.service';

import { GetWinesResponse, WineTypeEnum } from '../schema/wine.schema';

const LIMIT = 5;

export const useWinesQuery = (
  filters: WineFilterFormValues,
  initialData?: GetWinesResponse,
) => {
  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['wines', 'infinite', filters],
    queryFn: ({ pageParam }) =>
      getWines({
        limit: LIMIT,
        cursor: pageParam,
        type: (filters.wineType?.toUpperCase() ?? 'ALL') as WineTypeEnum,
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        rating: filters.rating > 0 ? filters.rating : undefined,
        name: filters.name,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: initialData
      ? { pages: [initialData], pageParams: [undefined] }
      : undefined,
  });

  return {
    data: data?.pages.flatMap((page) => page.list) ?? [],
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPending,
  };
};

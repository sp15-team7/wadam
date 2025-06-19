import { useInfiniteQuery } from '@tanstack/react-query';

import { WineFilterFormValues } from '@/feature/wines/components/wine-filter/WineFilterForm';
import { getWines } from '@/feature/wines/services/wine.service';

import { WineTypeEnum } from '../schema/wine.schema';

const LIMIT = 5;

export const useWinesQuery = (filters: WineFilterFormValues) => {
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
        type: filters.wineType.toUpperCase() as WineTypeEnum,
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        rating: filters.rating > 0 ? filters.rating : undefined,
        name: filters.name,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
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

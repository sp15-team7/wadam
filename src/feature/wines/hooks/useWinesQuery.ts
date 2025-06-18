import { useInfiniteQuery } from '@tanstack/react-query';

import { getWines } from '@/feature/wines/services/wine.service';

const LIMIT = 5;

export const useWinesQuery = () => {
  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['wines', 'infinite'],
    queryFn: ({ pageParam }) => getWines({ limit: LIMIT, cursor: pageParam }),
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
  };
};

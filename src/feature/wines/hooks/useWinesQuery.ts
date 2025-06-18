import { useQuery } from '@tanstack/react-query';

import { getWines } from '@/feature/wines/services/wine.service';

const LIMIT = 10;

export const useWinesQuery = () => {
  const { data, status, error } = useQuery({
    queryKey: ['wines'],
    queryFn: () => getWines({ limit: LIMIT }),
    select: (data) => data.list,
  });

  return {
    data,
    status,
    error,
  };
};

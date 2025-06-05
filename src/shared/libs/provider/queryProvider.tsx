'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

const QueryProvider = ({ children }: { children: ReactNode }) => {
  // useState 또는 useRef를 이용해 QueryClient를 컴포넌트 라이프사이클 동안 한번만 생성
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 * 5,
            gcTime: 60 * 1000 * 10,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: 3,
          },
          mutations: {
            retry: 3,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;

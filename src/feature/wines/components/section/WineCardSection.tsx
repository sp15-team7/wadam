'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import WineCard from '@/feature/wines/components/card/WineCard';
import { useWinesQuery } from '@/feature/wines/hooks/useWinesQuery';
import SkeletonCard from '@/shared/components/common/skeleton-card';

const WineCardSection = () => {
  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useWinesQuery();
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === 'pending') {
    return (
      <div className='grid grid-cols-1 gap-16'>
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <section className='flex flex-1 flex-col gap-16'>
      <div className='flex gap-16'>
        <div className='flex w-full flex-col gap-16'>
          {data.map((wine) => (
            <WineCard key={wine.id} wine={wine} />
          ))}

          <div ref={ref} className='mt-10 h-12'>
            {isFetchingNextPage && (
              <div className='flex justify-center'>
                <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900' />
              </div>
            )}
            {!hasNextPage && !isFetchingNextPage && (
              <div className='h-30 w-full' />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WineCardSection;

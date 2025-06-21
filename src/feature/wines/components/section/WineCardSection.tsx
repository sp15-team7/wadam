'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import WineCard from '@/feature/wines/components/card/WineCard';
import { useWinesQuery } from '@/feature/wines/hooks/useWinesQuery';
import { WineFilterFormValues } from '@/feature/wines/schema/wine-filter.schema';
import SkeletonCard from '@/shared/components/common/skeleton-card';

interface WineCardSectionProps {
  filters: WineFilterFormValues;
}

const WineCardSection = ({ filters }: WineCardSectionProps) => {
  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPending,
  } = useWinesQuery(filters);
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const showSkeleton = isPending || (isFetching && !isFetchingNextPage);

  if (showSkeleton) {
    return (
      <section className='flex flex-1 flex-col gap-16'>
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </section>
    );
  }

  if (status === 'error') {
    return <div>Error: {error?.message}</div>;
  }

  if (data.length === 0) {
    return (
      <section className='flex-center flex-1 flex-col gap-10'>
        <Image
          src='/icons/ui/icon-warning.svg'
          alt='empty-wine'
          width={100}
          height={100}
        />
        <p className='text-gray text-[1.8rem]'>조건에 맞는 와인이 없어요.</p>
      </section>
    );
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

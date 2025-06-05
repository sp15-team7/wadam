'use client';

import { SkeletonCardLoader } from '@/shared/components/ui/skeleton-card-loader';
import { SkeletonCard } from '@/shared/components/ui/skeleton-card';
import { Wine, getWines } from '@/shared/libs/api/fake-wine-api';
import { Spinner } from '@/shared/components/ui/spinner';
const LoadingTest = () => {
  return (
    <div>
      <p className='text-xl-bold'>로딩 스피너</p>

      <Spinner size='large' color='primary' />
      <Spinner size='small' color='primary' />
      <p className='text-xl-bold'>추천 와인</p>
      <div className='flex items-end p-[2.4rem] pb-0 bg-orange-50 w-[19.3rem] rounded-md'>
        <SkeletonCardLoader
          queryKey={['recommended-wine']}
          queryFn={async () => {
            const wines = await getWines();
            return wines[0];
          }}
          variant='recommend'
          render={(wine: Wine) => (
            <div className='text-center'>
              <h3 className='text-lg font-bold'>{wine.name}</h3>
              <p className='text-sm text-gray-600'>{wine.description}</p>
              <p className='text-lg font-semibold mt-2'>
                {wine.price.toLocaleString()}원
              </p>
            </div>
          )}
        />
      </div>
      <br />
      <p className='text-xl-bold'>와인 리스트</p>
      <div className='flex items-end p-[2rem] bg-orange-50 w-[34.3rem] rounded-md'>
        <SkeletonCardLoader
          queryKey={['wine-list']}
          queryFn={getWines}
          variant='list'
          render={(wines: Wine[]) => (
            <div className='flex flex-col gap-4 w-full'>
              {wines.map((wine) => (
                <div
                  key={wine.id}
                  className='flex justify-between items-center'
                >
                  <div>
                    <h3 className='font-bold'>{wine.name}</h3>
                    <p className='text-sm text-gray-600'>{wine.description}</p>
                  </div>
                  <p className='font-semibold'>
                    {wine.price.toLocaleString()}원
                  </p>
                </div>
              ))}
            </div>
          )}
        />
      </div>
      <br />
      <p className='text-xl-bold'>와인 상세 상단</p>
      <br />
      <br />
      <br />
      <div className='flex items-end p-[2rem] pb-0 bg-orange-50 w-[34.3rem] h-[19rem] rounded-md'>
        <SkeletonCard variant='detailTop' />
      </div>
      <br />
      <p className='text-xl-bold'>와인 상세 리스트</p>
      <div className='flex items-end p-[1.6rem] pr-[2rem] pl-[1.6rem] bg-orange-50 w-[34.3rem] rounded-md'>
        <SkeletonCard variant='detailList' />
      </div>
    </div>
  );
};

export default LoadingTest;

'use client';

// loading-test 파일 추후 삭제 예정

// TanStack Query 상태를 이용해 로딩 시 SkeletonCard를 보여줌
import { SkeletonCardLoader } from '@/shared/components/ui/skeleton/SkeletonCardLoader';

// 단독 UI 테스트용 - 로직 없이 단순 렌더링
import { SkeletonCard } from '@/shared/components/ui/skeleton/SkeletonCard';

// 와인 더미 데이터 (API 연동 전 테스트용)
import { Wine, getWines } from '@/shared/libs/api/fake-wine-api';

// TanStack Query 상태를 이용해 로딩 시 Spinner를 보여줌
import { SpinnerLoader } from '@/shared/components/ui/spinner/SpinnerLoader';

// 단독 UI 테스트용 - 로직 없이 단순 렌더링
import { Spinner } from '@/shared/components/ui/spinner/Spinner';


export default function LoadingTest() {
  return (
    <div>
      <p className='text-xl-bold'>로딩 스피너</p>

      <Spinner size='large' color='primary' />
      <Spinner size='small' color='primary' />

      {/* SpinnerLoader 사용 예시 */}
      <SpinnerLoader
        queryKey={['wines']}
        queryFn={getWines}
        size='large'
        color='primary'
        spinnerWrapperClassName='flex justify-center items-center h-[20rem]'
        render={(wines) => (
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {wines.map((wine: any) => (
              <li
                key={wine.id}
                className='border rounded-lg p-4 shadow-sm hover:shadow-md transition'
              >
                <h2 className='text-lg font-semibold'>{wine.name}</h2>
                <p className='text-sm text-gray-500 mb-1'>{wine.description}</p>
                <p className='text-red-500 font-bold'>
                  {wine.price.toLocaleString()}원
                </p>
                <p className='text-yellow-500 text-sm'>⭐ {wine.rating}</p>
              </li>
            ))}
          </ul>
        )}
      />
      <br />
      <p className='text-xl-bold'>추천 와인</p>
      <div className='flex items-end p-[2.4rem] pb-0 bg-orange-50 w-[19.3rem] rounded-md'>
        {/* SkeletonCardLoader 사용 예시 */}
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
        {/* SkeletonCardLoader 사용 예시 */}
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
        {/* SkeletonCard UI 확인용 */}
        <SkeletonCard variant='detailTop' />
      </div>
      <br />
      <p className='text-xl-bold'>와인 상세 리스트</p>
      <div className='flex items-end p-[1.6rem] pr-[2rem] pl-[1.6rem] bg-orange-50 w-[34.3rem] rounded-md'>
        {/* SkeletonCard UI 확인용 */}
        <SkeletonCard variant='detailList' />
      </div>
    </div>
  );
};


import { SkeletonCard } from '@/shared/components/ui/skeleton-card';

const LandingPage = () => {
  return (
    <div>
      <p className='text-xl-bold'>추천 와인 카드</p>
      <div className='flex items-end p-[2.4rem] pb-0 bg-orange-50 w-[19.3rem] rounded-md'>
        <SkeletonCard variant='recommend' />
      </div>
      <br />
      <p className='text-xl-bold'>와인 리스트 카드</p>
      <div className='flex items-end p-[2rem] bg-orange-50 w-[34.3rem] rounded-md'>
        <SkeletonCard variant='list' />
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

export default LandingPage;

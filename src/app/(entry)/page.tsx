import FilterMyWineSection from '@/feature/landing/components/FilterMyWineSection';
import Hero from '@/feature/landing/components/Hero';
import TodayWineSection from '@/feature/landing/components/TodayWineSection';
import WineReviewSection from '@/feature/landing/components/WineReviewSection';
import SkeletonCard from '@/shared/components/common/skeleton-card';

const LandingPage = () => {
  return (
    <main className='mx-auto max-w-[37.5rem] overflow-hidden px-[1.6rem] pb-[4.5rem] md:max-w-[76.8rem] lg:max-w-[102.4rem] lg:pb-[10rem]'>
      <Hero />
      <TodayWineSection />
      <FilterMyWineSection />
      <WineReviewSection />
      <p>추천</p>
      <SkeletonCard variant='recommend' />
      <p>상세 상단</p>
      <SkeletonCard variant='detailTop' />
      <p>상세 리스트</p>
      <SkeletonCard variant='detailList' />
      <p>와인 리스트</p>
      <SkeletonCard variant='list' />
    </main>
  );
};

export default LandingPage;

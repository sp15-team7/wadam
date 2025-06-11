import FilterMyWineSection from '@/feature/landing/components/FilterMyWineSection';
import Hero from '@/feature/landing/components/Hero';
import TodayWineSection from '@/feature/landing/components/TodayWineSection';
import WineReviewSection from '@/feature/landing/components/WineReviewSection';

const LandingPage = () => {
  return (
    <main className='mx-auto max-w-[34.3rem] overflow-hidden px-[1.6rem] pb-[4.5rem] md:max-w-none'>
      <Hero />
      <TodayWineSection />
      <FilterMyWineSection />
      <WineReviewSection />
    </main>
  );
};

export default LandingPage;

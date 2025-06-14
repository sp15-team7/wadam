import FilterMyWineSection from '@/feature/landing/components/FilterMyWineSection';
import Hero from '@/feature/landing/components/Hero';
import TodayWineSection from '@/feature/landing/components/TodayWineSection';
import WineReviewSection from '@/feature/landing/components/WineReviewSection';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/Carousel';

const LandingPage = () => {
  return (
    <main className='mx-auto max-w-[37.5rem] overflow-hidden px-[1.6rem] pb-[4.5rem] md:max-w-[76.8rem] lg:max-w-[102.4rem] lg:pb-[10rem]'>
      <Hero />
      <TodayWineSection />
      <FilterMyWineSection />
      <WineReviewSection />
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div>1</div>
          </CarouselItem>
          <CarouselItem>
            <div>2</div>
          </CarouselItem>
          <CarouselItem>
            <div>3</div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
};

export default LandingPage;

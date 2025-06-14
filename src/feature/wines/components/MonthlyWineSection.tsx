import SkeletonCard from '@/shared/components/common/skeleton-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/shared/components/ui/Carousel';

const MonthlyWineSection = () => {
  return (
    <section className='bg-primary mb-[2.4rem] rounded-[1.2rem] p-[2rem]'>
      <h2 className='text-gray mb-[2rem] text-[1.8rem] font-bold'>
        이번 달 추천 와인
      </h2>
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          <CarouselItem>
            <SkeletonCard variant='recommend' />
          </CarouselItem>
          <CarouselItem>
            <SkeletonCard variant='recommend' />
          </CarouselItem>
          <CarouselItem>
            <SkeletonCard variant='recommend' />
          </CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default MonthlyWineSection;

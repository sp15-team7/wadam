import SkeletonCard from '@/shared/components/common/skeleton-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/shared/components/ui/Carousel';

/**
 * @author Sumin
 * @since 2025-06-14
 * @description 이번 달 추천 와인 섹션 컴포넌트
 * @returns {JSX.Element} 이번 달 추천 와인 섹션 컴포넌트
 *
 */

const MonthlyWineSection = () => {
  return (
    <section className='bg-primary mx-auto mb-[2.4rem] max-w-[114rem] overflow-hidden rounded-[1.2rem] p-[2rem] pr-0 md:p-[3rem] md:pr-0'>
      <h2 className='mb-[2rem] text-[1.8rem] font-bold text-white md:text-[2rem]'>
        이번 달 추천 와인
      </h2>
      <Carousel
        opts={{ loop: true, align: 'start' }}
        orientation='horizontal'
        autoplay
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={`item-${index}`}
              className='basis-1/1.6 md:basis-1/2.5 xl:basis-1/4.5'
            >
              <SkeletonCard variant='recommend' />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default MonthlyWineSection;

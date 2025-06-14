import SkeletonCard from '@/shared/components/common/skeleton-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/Carousel';

const MonthlyWineCarousel = () => {
  return (
    <Carousel>
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MonthlyWineCarousel;

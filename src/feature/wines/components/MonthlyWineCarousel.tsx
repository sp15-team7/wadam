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
  );
};

export default MonthlyWineCarousel;

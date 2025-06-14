'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import Image from 'next/image';
import * as React from 'react';

import { cn } from '@/shared/libs/utils/cn';

/**
 * @author Sumin
 * @since 2025-06-14
 * @description 캐러셀 컴포넌트
 * @param {CarouselProps} props - 컴포넌트 props
 * @param {CarouselOptions} [props.opts] - 캐러셀 옵션
 * @param {CarouselPlugin} [props.plugins] - 캐러셀 플러그인
 * @param {string} [props.orientation] - 캐러셀 방향 ('horizontal' | 'vertical')
 * @param {function} [props.setApi] - 캐러셀 API 설정 콜백
 * @param {boolean} [props.autoplay] - 자동 재생 여부
 * @param {number} [props.autoplayDelay] - 자동 재생 딜레이 시간
 * @returns {JSX.Element} 캐러셀 컴포넌트
 *
 */

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
  autoplay?: boolean;
  autoplayDelay?: number; // autoplay 딜레이 옵션 추가
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

function Carousel({
  orientation,
  opts,
  setApi,
  plugins,
  className,
  children,
  autoplay = false,
  autoplayDelay = 3000, // 기본 3초
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  // autoplay가 true일 때 autoplay 플러그인을 생성
  const autoplayPlugin = React.useMemo(
    () =>
      autoplay
        ? Autoplay({ delay: autoplayDelay, stopOnInteraction: false })
        : undefined,
    [autoplay, autoplayDelay],
  );

  // plugins 배열 생성 - autoplay가 true면 autoplay 플러그인 추가
  const finalPlugins = React.useMemo(() => {
    const pluginArray = plugins ? [...plugins] : [];
    if (autoplay && autoplayPlugin) {
      pluginArray.push(autoplayPlugin);
    }
    return pluginArray;
  }, [plugins, autoplay, autoplayPlugin]);

  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    finalPlugins, // autoplay가 포함된 plugins 사용
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
      api?.off('reInit', onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation ?? (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        autoplay,
        autoplayDelay,
      }}
    >
      <section
        role='region'
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        aria-roledescription='carousel'
        data-slot='carousel'
        {...props}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className='overflow-hidden'
      data-slot='carousel-content'
    >
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? '' : 'flex-col',
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel();

  return (
    <div
      role='group'
      aria-roledescription='slide'
      data-slot='carousel-item'
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'mr-[1rem]' : 'mt-4',
        className,
      )}
      {...props}
    />
  );
}

function CarouselNext({ className, ...props }: React.ComponentProps<'button'>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      data-slot='carousel-next'
      className={cn(
        'border-primary flex-center group absolute h-[4.8rem] w-[4.8rem] cursor-pointer rounded-full border-1 bg-white shadow-[0rem_0.4rem_0.4rem_rgba(0,0,0,0.25)]',
        orientation === 'horizontal'
          ? 'top-1/2 right-[0.8rem] -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      aria-disabled={!canScrollNext}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <Image
        src='/icons/ui/icon-arrow-right.svg'
        alt='next'
        width={24}
        height={24}
        className='group-hover:animate-[flowArrow_0.8s_ease-in-out_2]'
      />
      <span className='sr-only'>Next slide</span>
    </button>
  );
}

export {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
};

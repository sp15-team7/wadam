'use client';

import { useEffect, useState } from 'react';
// 참고: MonthlyCard가 WineSummary 타입을 받으므로, WineListItem을 WineSummary로 매핑해야 합니다.
import { toast } from 'sonner';
import { z } from 'zod';

import MonthlyCard from '@/feature/wines/components/card/MonthlyCard';
import { wineListItemSchema } from '@/feature/wines/schema/wine.schema';
import { getWines } from '@/feature/wines/services/wine.service';
import SkeletonCard from '@/shared/components/common/skeleton-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/shared/components/ui/carousel';

/**
 * @author Sumin, Sarang
 * @since 2025-06-14
 * @description 이번 달 추천 와인 섹션 컴포넌트
 * @returns {JSX.Element} 이번 달 추천 와인 섹션 컴포넌트
 *
 */

// 와인 목록을 랜덤으로 섞는 함수
function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const MonthlyWineSection = () => {
  const [wines, setWines] = useState<z.infer<typeof wineListItemSchema>[]>([]); // wineListItemSchema 타입으로 스테이트 관리
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonthlyWines = async () => {
      try {
        setIsLoading(true);
        setError(null); // 새로운 fetch 시작 시 에러 초기화

        // Zod 스키마를 사용하여 응답 유효성 검사 및 타입 변환
        const validatedResponse = await getWines({ limit: 10 });
        const fetchedWines: z.infer<typeof wineListItemSchema>[] =
          validatedResponse.list; // `list` 필드에서 와인 배열 추출

        // 현재 avgRating이 모두 0이라 임의로 상위 10개 선택하여 랜덤으로 셔플**
        const winesToProcess: z.infer<typeof wineListItemSchema>[] =
          fetchedWines.slice(0, 10);

        const shuffledWines = shuffleArray(winesToProcess); // 선택된 10개를 랜덤으로 섞기
        setWines(shuffledWines);
      } catch (err: unknown) {
        // 'err'의 타입을 'unknown'으로 명시
        let displayMessage = '알 수 없는 오류가 발생했습니다.';
        if (err instanceof Error) {
          displayMessage = err.message;
        }
        console.error('와인 데이터를 불러오는데 실패했습니다:', err);
        setError(
          '추천 와인 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요: ' +
            displayMessage,
        );
        if (typeof window !== 'undefined' && typeof toast !== 'undefined') {
          toast.error('추천 와인 로드 실패: ' + displayMessage);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMonthlyWines();
  }, []);

  return (
    <section className='bg-primary mb-[2.4rem] rounded-[1.2rem] p-[2rem] pr-0 md:p-[3rem] md:pr-0'>
      <h2 className='mb-[2rem] text-[1.8rem] font-semibold text-white md:text-[2rem]'>
        이번 달 추천 와인
      </h2>
      <Carousel
        opts={{ loop: true, align: 'start' }}
        orientation='horizontal'
        autoplay // 자동 재생 활성화
        autoplayDelay={4000} // 자동 재생 딜레이 4초 설정
        ariaLabel='이번 달 추천 와인 캐러셀'
      >
        <CarouselContent>
          {isLoading ? (
            // 로딩 중에는 SkeletonCard를 렌더링 (5개)
            Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={`skeleton-${index}`}
                className='basis-1/1.6 md:basis-1/2.5 xl:basis-1/4.5'
              >
                <SkeletonCard variant='recommend' />
              </CarouselItem>
            ))
          ) : error ? (
            // 에러 발생 시 메시지 표시
            <CarouselItem className='basis-full py-8 text-center text-red-300'>
              {error}
            </CarouselItem>
          ) : wines.length === 0 ? (
            // 데이터가 없지만 에러는 아닌 경우 메시지 표시
            <CarouselItem className='basis-full py-8 text-center text-gray-300'>
              표시할 추천 와인이 없습니다.
            </CarouselItem>
          ) : (
            // 데이터가 성공적으로 로드되면 실제 MonthlyCard 렌더링
            wines.map((wine) => (
              <CarouselItem
                key={wine.id}
                className='basis-1/1.6 md:basis-1/2.5 xl:basis-1/4.5'
              >
                {/* MonthlyCard에 WineListItem 타입의 wine 객체 전달 */}
                <MonthlyCard wine={wine} />
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        {/* 와인이 1개 이상일 때만 캐러셀 이동 버튼 표시 (0개일 땐 불필요) */}
        {wines.length > 0 && <CarouselNext />}
      </Carousel>
    </section>
  );
};

export default MonthlyWineSection;

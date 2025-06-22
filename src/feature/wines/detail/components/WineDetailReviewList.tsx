'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import ReviewCard from '@/feature/wines/components/card/ReviewCard';
import WineDetailTitle from '@/feature/wines/detail/components/WineDetailTitle';
import {
  useWineDetail,
  useWineReviewsInfinite,
} from '@/feature/wines/hooks/useWineDetailsQuery';
import ErrorDisplay from '@/shared/components/common/error-display';
import SkeletonCard from '@/shared/components/common/skeleton-card';
import Spinner from '@/shared/components/common/spinner';

interface WineDetailReviewListProps {
  wineId: number;
  currentUserId?: number;
}

const WineDetailReviewList = ({
  wineId,
  currentUserId,
}: WineDetailReviewListProps) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useWineReviewsInfinite({
    wineId,
    enabled: !!wineId,
  });

  const { data: wineDetail } = useWineDetail({ wineId, enabled: !!wineId });
  const queryClient = useQueryClient();

  // infinite scroll을 위한 ref
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // infinite query의 모든 페이지 데이터를 flat하게 만들기
  const allReviews = data?.pages.flatMap((page) => page.list) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  // 리뷰 업데이트 콜백 (수정/삭제 후 데이터 새로고침)
  const handleReviewUpdate = useCallback(async () => {
    // 와인 리뷰 목록 및 상세 정보 쿼리 무효화
    await queryClient.invalidateQueries({
      queryKey: ['wine', 'reviews', wineId],
    });
    await queryClient.invalidateQueries({
      queryKey: ['wine', 'detail', wineId],
    });
  }, [queryClient, wineId]);

  // Intersection Observer를 사용한 무한 스크롤 구현
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '100px', // 100px 전에 미리 로드 시작
      threshold: 0.1,
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  if (isLoading)
    return (
      <>
        <WineDetailTitle title='리뷰 목록' />
        <div className='mt-[2rem] flex flex-col gap-[3rem]'>
          <SkeletonCard variant='detailList' />
          <SkeletonCard variant='detailList' />
        </div>
      </>
    );

  if (isError) return null;

  return (
    <>
      <WineDetailTitle title='리뷰 목록' />
      <ul className='mt-[2rem] flex flex-col gap-[3rem]'>
        {totalCount > 0 ? (
          <>
            {allReviews.map((review) => (
              <li key={review.id}>
                <ReviewCard
                  review={review}
                  currentUser={currentUserId ?? 0}
                  wineId={wineId}
                  wineDetail={wineDetail}
                  onReviewUpdate={handleReviewUpdate}
                />
              </li>
            ))}

            {/* 무한 스크롤 트리거 요소 */}
            {hasNextPage && (
              <div ref={loadMoreRef} className='flex justify-center py-[2rem]'>
                {isFetchingNextPage && <Spinner size='large' />}
              </div>
            )}
          </>
        ) : (
          <ErrorDisplay message='작성된 리뷰가 없어요' />
        )}
      </ul>
    </>
  );
};

export default WineDetailReviewList;

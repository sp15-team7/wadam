'use client';

import ReviewForm from '@/feature/reviews/components/review-form/ReviewFormButton';
import ReviewCard from '@/feature/wines/components/card/ReviewCard';
import { useWineDetail } from '@/feature/wines/hooks/useWineDetailsQuery';
import { WineDetailReview } from '@/feature/wines/schema/wine.schema';
import Error from '@/shared/components/common/error';
import SkeletonCard from '@/shared/components/common/skeleton-card';

interface WineDetailReviewListProps {
  wineId: number;
  currentUserId?: number;
}

const WineDetailReviewList = ({
  wineId,
  currentUserId,
}: WineDetailReviewListProps) => {
  const {
    data: wineDetail,
    isLoading,
    isError,
  } = useWineDetail({ wineId, enabled: !!wineId });

  if (isLoading)
    return (
      <div className='mt-[2rem] flex flex-col gap-[3rem]'>
        <SkeletonCard variant='detailList' />
        <SkeletonCard variant='detailList' />
      </div>
    );
  if (isError) return <Error message='리뷰를 불러올 수 없습니다.' isRetry />;
  if (!wineDetail)
    return <Error message='리뷰를 불러올 수 없습니다.' isRetry />;

  const reviews: WineDetailReview[] = wineDetail?.reviews ?? [];
  return (
    <ul className='mt-[2rem] flex flex-col gap-[3rem]'>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <li key={review.id}>
            <ReviewCard review={review} currentUser={currentUserId ?? 0} />
          </li>
        ))
      ) : (
        <Error message='작성된 리뷰가 없어요'>
          <ReviewForm wineId={wineId} />
        </Error>
      )}
    </ul>
  );
};

export default WineDetailReviewList;

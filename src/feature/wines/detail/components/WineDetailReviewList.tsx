'use client';

import ReviewForm from '@/feature/reviews/components/review-form/ReviewFormButton';
import ReviewCard from '@/feature/wines/components/card/ReviewCard';
import WineDetailTitle from '@/feature/wines/detail/components/WineDetailTitle';
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
      <>
        <WineDetailTitle title='리뷰 목록' />
        <div className='mt-[2rem] flex flex-col gap-[3rem]'>
          <SkeletonCard variant='detailList' />
          <SkeletonCard variant='detailList' />
        </div>
      </>
    );
  if (isError) return null;
  if (!wineDetail) return null;

  const reviews: WineDetailReview[] = wineDetail?.reviews ?? [];
  return (
    <>
      <WineDetailTitle title='리뷰 목록' />
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
    </>
  );
};

export default WineDetailReviewList;

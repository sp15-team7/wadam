'use client';

import ReviewCard from '@/feature/wines/components/card/ReviewCard';
import { useWineDetail } from '@/feature/wines/hooks/useWineDetailsQuery';
import { WineDetailReview } from '@/feature/wines/schema/wine.schema';

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

  if (isLoading) return <div>리뷰를 불러오는 중...</div>;
  if (isError) return <div>리뷰를 불러올 수 없습니다.</div>;
  if (!wineDetail) return null;

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
        <li className='text-center text-gray-500'>아직 리뷰가 없습니다.</li>
      )}
    </ul>
  );
};

export default WineDetailReviewList;

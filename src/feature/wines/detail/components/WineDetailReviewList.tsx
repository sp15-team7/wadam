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
  const { data: wineDetail } = useWineDetail({ wineId, enabled: !!wineId });
  return (
    <ul className='mt-[2rem] flex flex-col gap-[3rem]'>
      {wineDetail?.reviews.map((review) => (
        <li key={review.id}>
          <ReviewCard
            review={review as WineDetailReview}
            currentUser={currentUserId ?? 0}
          />
        </li>
      ))}
    </ul>
  );
};

export default WineDetailReviewList;

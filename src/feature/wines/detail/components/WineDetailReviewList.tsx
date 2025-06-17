import { ReviewCard } from '@/feature/wines/components/card/ReviewCard';
import { mockWine } from '@/feature/wines/mocks';

const WineDetailReviewList = () => {
  return (
    <ul>
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index}>
          <ReviewCard review={mockWine.recentReview} currentUser={1} />
        </li>
      ))}
    </ul>
  );
};

export default WineDetailReviewList;

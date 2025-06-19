import ReviewCard from '@/feature/wines/components/card/ReviewCard';
import { mockWine } from '@/feature/wines/mocks';

const WineDetailReviewList = () => {
  return (
    <ul className='mt-[2rem] flex flex-col gap-[3rem]'>
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index}>
          <ReviewCard review={mockWine.recentReview} currentUser={1} />
        </li>
      ))}
    </ul>
  );
};

export default WineDetailReviewList;

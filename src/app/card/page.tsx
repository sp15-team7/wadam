import { auth } from '@/feature/auth';
import DetailCard from '@/feature/wines/components/card/DetailCard';
import MonthlyCard from '@/feature/wines/components/card/MonthlyCard';
import MyReviewCard from '@/feature/wines/components/card/MyReviewCard';
import ReviewCard from '@/feature/wines/components/card/ReviewCard';
import WineCard from '@/feature/wines/components/card/WineCard';
import { mockReview, mockWine } from '@/feature/wines/mocks';

const CardPage = async () => {
  const session = await auth();
  const currentUser = session?.user?.id;

  return (
    <div className='flex flex-col gap-6'>
      <MonthlyCard wine={mockWine} />
      <WineCard wine={mockWine} />
      <DetailCard wine={mockWine} currentUser={currentUser!} />

      <ReviewCard
        review={mockWine.recentReview}
        currentUser={currentUser!}
        wineId={mockWine.id}
      />

      <MyReviewCard review={mockReview.list[0]} />
    </div>
  );
};
export default CardPage;

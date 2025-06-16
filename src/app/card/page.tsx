import { auth } from '@/feature/auth';
import DetailCard from '@/feature/wines/components/card/DetailCard';
import MonthlyCard from '@/feature/wines/components/card/MonthlyCard';
import { ReviewCard } from '@/feature/wines/components/card/ReviewCard';
import WineCard from '@/feature/wines/components/card/WineCard';
import { mockWine } from '@/feature/wines/mocks';

const CardPage = async () => {
  const session = await auth();
  const currentUser = session?.user?.id;

  return (
    <div className='flex flex-col gap-6'>
      <MonthlyCard wine={mockWine} />
      <WineCard wine={mockWine} />
      {currentUser && <DetailCard wine={mockWine} currentUser={currentUser} />}
      {currentUser && (
        <ReviewCard review={mockWine.recentReview} currentUser={currentUser} />
      )}
    </div>
  );
};
export default CardPage;

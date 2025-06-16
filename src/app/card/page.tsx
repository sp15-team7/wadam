'use client';
import DetailCard from '@/feature/wines/components/card/DetailCard';
import MonthlyCard from '@/feature/wines/components/card/MonthlyCard';
import { ReviewCard } from '@/feature/wines/components/card/ReviewCard';
import WineCard from '@/feature/wines/components/card/WineCard';
import { mockWine } from '@/feature/wines/mocks';

const CardPage = () => {
  return (
    <div className='flex flex-col gap-6'>
      <MonthlyCard wine={mockWine} />
      <WineCard wine={mockWine} />
      <DetailCard wine={mockWine} />
      <ReviewCard review={mockWine.recentReview} />
      <ReviewCard review={mockWine.recentReview} />
    </div>
  );
};
export default CardPage;

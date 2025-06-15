'use client';
import { ReviewCard } from '@/feature/reviews/components/ReviewCard';
import DetailCard from '@/feature/wines/components/DetailCard';
import MonthlyCard from '@/feature/wines/components/MonthlyCard';
import WineCard from '@/feature/wines/components/WineCard';

const CardPage = () => {
  return (
    <div className='flex flex-col gap-6'>
      <MonthlyCard />
      <WineCard />
      <DetailCard />
      <ReviewCard />
    </div>
  );
};
export default CardPage;

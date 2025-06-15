'use client';
import DetailCard from '@/feature/wines/components/card/DetailCard';
import MonthlyCard from '@/feature/wines/components/card/MonthlyCard';
import { ReviewCard } from '@/feature/wines/components/card/ReviewCard';
import WineCard from '@/feature/wines/components/card/WineCard';

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

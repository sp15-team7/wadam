import DetailCard from '@/feature/wines/components/DetailCard';
import MonthlyCard from '@/feature/wines/components/MonthlyCard';
import WineCard from '@/feature/wines/components/WineCard';

const CardPage = () => {
  return (
    <div className='flex flex-col gap-6'>
      <MonthlyCard />
      <WineCard />
      <DetailCard />
    </div>
  );
};
export default CardPage;

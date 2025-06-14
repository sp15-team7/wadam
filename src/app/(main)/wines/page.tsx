import MonthlyWineSection from '@/feature/wines/components/MonthlyWineSection';

const WinesPage = () => {
  return (
    <main className='mx-auto overflow-hidden px-[1.6rem] pb-[4.5rem]'>
      <h1 className='sr-only'>와인 목록 페이지</h1>
      <MonthlyWineSection />
    </main>
  );
};

export default WinesPage;

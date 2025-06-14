import MonthlyWineCarousel from '@/feature/wines/components/MonthlyWineCarousel';

const WinesPage = () => {
  return (
    <main className='mx-auto max-w-[37.5rem] overflow-hidden px-[1.6rem] pb-[4.5rem]'>
      <section className='bg-primary mb-[2.4rem] rounded-[1.2rem] p-[2rem]'>
        <h2 className='text-gray text-[1.8rem] font-bold'>이번 달 추천 와인</h2>
        <MonthlyWineCarousel />
      </section>
    </main>
  );
};

export default WinesPage;

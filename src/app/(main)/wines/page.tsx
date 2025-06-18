'use client';

import MonthlyWineSection from '@/feature/wines/components/MonthlyWineSection';
import WineCardSection from '@/feature/wines/components/section/WineCardSection';
import InnerContainer from '@/shared/components/container/InnerContainer';

const WinesPage = () => {
  return (
    <main>
      <InnerContainer>
        <h1 className='sr-only'>와인 목록 페이지</h1>
        <MonthlyWineSection />
        <WineCardSection />
      </InnerContainer>
    </main>
  );
};

export default WinesPage;

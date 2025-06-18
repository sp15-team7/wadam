'use client';

import MonthlyWineSection from '@/feature/wines/components/MonthlyWineSection';
import { useWinesQuery } from '@/feature/wines/hooks/useWinesQuery';
import InnerContainer from '@/shared/components/container/InnerContainer';

const WinesPage = () => {
  const { data, status, error } = useWinesQuery();

  console.log('data:', data);
  console.log('status:', status);
  console.log('error:', error);

  return (
    <main>
      <InnerContainer>
        <h1 className='sr-only'>와인 목록 페이지</h1>
        <MonthlyWineSection />
      </InnerContainer>
    </main>
  );
};

export default WinesPage;

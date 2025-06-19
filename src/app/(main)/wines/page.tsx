'use client';

import WineRegistrationModal from '@/feature/wines/components/modal/WineRegistrationModal';
import MonthlyWineSection from '@/feature/wines/components/MonthlyWineSection';
import { useWinesQuery } from '@/feature/wines/hooks/useWinesQuery';
import InnerContainer from '@/shared/components/container/InnerContainer';
import { Button } from '@/shared/components/ui/button'; // shadcn/ui 버튼
import { useModalStore } from '@/shared/stores/useModalStore';

const WinesPage = () => {
  const { data, status, error } = useWinesQuery();

  console.log('data:', data);
  console.log('status:', status);
  console.log('error:', error);

  const { open } = useModalStore();

  const handleOpenModal = () => {
    open('wineRegistrationModal');
  };

  return (
    <main>
      <InnerContainer>
        <h1 className='sr-only'>와인 목록 페이지</h1>
        <MonthlyWineSection />
        <h1 className='mb-6 text-3xl font-bold'>와인 등록 페이지</h1>
        <Button onClick={handleOpenModal} className='px-6 py-3 text-lg'>
          새 와인 등록하기
        </Button>

        {/* 와인 등록 모달 컴포넌트 렌더링 */}
        <WineRegistrationModal />
      </InnerContainer>
    </main>
  );
};

export default WinesPage;

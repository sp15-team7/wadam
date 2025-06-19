'use client';

import WineFilterModal, {
  WINE_FILTER_MODAL_ID,
} from '@/feature/wines/components/modal/WineFilterModal';
import MonthlyWineSection from '@/feature/wines/components/MonthlyWineSection';
import WineCardSection from '@/feature/wines/components/section/WineCardSection';
import WineFilterSection from '@/feature/wines/components/section/WineFilterSection';
import InnerContainer from '@/shared/components/container/InnerContainer';
import { Button } from '@/shared/components/ui/button';
import { useModalStore } from '@/shared/stores/useModalStore';

const WinesPage = () => {
  const { isOpen } = useModalStore();
  return (
    <main className='relative'>
      <InnerContainer>
        <h1 className='sr-only'>와인 목록 페이지</h1>
        <MonthlyWineSection />
        <div className='mt-20 flex flex-col gap-20 lg:flex-row'>
          <WineFilterSection />
          <WineCardSection />
        </div>
        <div className='fixed bottom-10 w-full'>
          <Button size='full' className='w-full px-10'>
            와인 추가하기
          </Button>
        </div>
        {isOpen(WINE_FILTER_MODAL_ID) && <WineFilterModal />}
      </InnerContainer>
    </main>
  );
};

export default WinesPage;

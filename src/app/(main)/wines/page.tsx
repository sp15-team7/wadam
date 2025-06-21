'use client';

import { useState } from 'react';

import WineFilterModal, {
  WINE_FILTER_MODAL_ID,
} from '@/feature/wines/components/modal/WineFilterModal';
import MonthlyWineSection from '@/feature/wines/components/MonthlyWineSection';
import WineCardSection from '@/feature/wines/components/section/WineCardSection';
import WineFilterSection from '@/feature/wines/components/section/WineFilterSection';
import {
  DEFAULT_WINE_FILTER_VALUES,
  WineFilterFormValues,
} from '@/feature/wines/schema/wine-filter.schema';
import InnerContainer from '@/shared/components/container/InnerContainer';
import { Button } from '@/shared/components/ui/button';
import { useModalStore } from '@/shared/stores/useModalStore';
import { devLog } from '@/shared/utils/devLogger';

const WinesPage = () => {
  const { isOpen, open } = useModalStore();
  const [filters, setFilters] = useState<WineFilterFormValues>(
    DEFAULT_WINE_FILTER_VALUES,
  );

  const handleFilterChange = (newFilters: WineFilterFormValues) => {
    setFilters(newFilters);
    devLog('Filters updated in page:', newFilters);
  };

  const handleOpenFilterModal = () => {
    open(WINE_FILTER_MODAL_ID);
  };

  return (
    <main className='relative'>
      <InnerContainer>
        <h1 className='sr-only'>와인 목록 페이지</h1>
        <MonthlyWineSection />
        <div className='mt-20 flex flex-col gap-20 lg:flex-row'>
          <WineFilterSection
            onFilterChange={handleFilterChange}
            initialFilters={filters}
            onOpenModal={handleOpenFilterModal}
          />
          <WineCardSection filters={filters} />
        </div>
        <div className='fixed bottom-10 w-full lg:hidden'>
          <Button size='full' className='w-full px-10'>
            와인 추가하기
          </Button>
        </div>
        {isOpen(WINE_FILTER_MODAL_ID) && (
          <WineFilterModal
            initialFilters={filters}
            onFilterSubmit={handleFilterChange}
          />
        )}
      </InnerContainer>
    </main>
  );
};

export default WinesPage;

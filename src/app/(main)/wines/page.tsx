'use client';

import { useState } from 'react';

import AddWineButton from '@/feature/wines/components/button/AddWineButton';
import WineCreateModal, {
  WINE_CREATE_MODAL_ID,
} from '@/feature/wines/components/modal/WineCreateModal';
import WineFilterModal, {
  WINE_FILTER_MODAL_ID,
} from '@/feature/wines/components/modal/WineFilterModal';
import MonthlyWineSection from '@/feature/wines/components/section/MonthlyWineSection';
import WineCardSection from '@/feature/wines/components/section/WineCardSection';
import WineFilterSection from '@/feature/wines/components/section/WineFilterSection';
import { useCreateWineQuery } from '@/feature/wines/hooks/useCreateWineQuery';
import { CreateWineRequest } from '@/feature/wines/schema/wine.schema';
import {
  DEFAULT_WINE_FILTER_VALUES,
  WineFilterFormValues,
} from '@/feature/wines/schema/wine-filter.schema';
import InnerContainer from '@/shared/components/container/InnerContainer';
import { useModalStore } from '@/shared/stores/useModalStore';
import { devLog } from '@/shared/utils/devLogger';

const WinesPage = () => {
  const { isOpen, open, close } = useModalStore();
  const [filters, setFilters] = useState<WineFilterFormValues>(
    DEFAULT_WINE_FILTER_VALUES,
  );
  const { mutate: createWine } = useCreateWineQuery();

  const handleFilterChange = (newFilters: WineFilterFormValues) => {
    setFilters(newFilters);
    devLog('Filters updated in page:', newFilters);
  };

  const handleOpenFilterModal = () => {
    open(WINE_FILTER_MODAL_ID);
  };

  const handleOpenCreateModal = () => {
    open(WINE_CREATE_MODAL_ID);
  };

  const handleCreateWine = (data: CreateWineRequest) => {
    createWine(data, {
      onSuccess: () => close(WINE_CREATE_MODAL_ID),
    });
  };

  const handleCloseCreateModal = () => {
    close(WINE_CREATE_MODAL_ID);
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
            onOpenCreateModal={handleOpenCreateModal}
          />
          <WineCardSection filters={filters} />
        </div>
        <div className='fixed right-10 bottom-10 lg:hidden'>
          <AddWineButton onClick={handleOpenCreateModal} />
        </div>
        {isOpen(WINE_FILTER_MODAL_ID) && (
          <WineFilterModal
            initialFilters={filters}
            onFilterSubmit={handleFilterChange}
          />
        )}
        {isOpen(WINE_CREATE_MODAL_ID) && (
          <WineCreateModal
            onSubmit={handleCreateWine}
            onClose={handleCloseCreateModal}
          />
        )}
      </InnerContainer>
    </main>
  );
};

export default WinesPage;

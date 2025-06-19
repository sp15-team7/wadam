'use client';

import { SlidersHorizontal } from 'lucide-react';

import { useModalStore } from '@/shared/stores/useModalStore';

const WINE_FILTER_MODAL_ID = 'wine-filter-modal';

const WineFilterButton = () => {
  const { open } = useModalStore();
  return (
    <button
      className='border-secondary hover:bg-secondary active:bg-secondary active:ring-primary flex items-center rounded-3xl border p-4 transition-all active:ring-2 md:p-5'
      onClick={() => open(WINE_FILTER_MODAL_ID)}
      type='button'
    >
      <SlidersHorizontal color='#b2ae98' className='size-[2.2rem]' />
    </button>
  );
};
export default WineFilterButton;

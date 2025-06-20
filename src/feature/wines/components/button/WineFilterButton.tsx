'use client';

import { SlidersHorizontal } from 'lucide-react';

interface WineFilterButtonProps {
  onClick: () => void;
}

const WineFilterButton = ({ onClick }: WineFilterButtonProps) => {
  return (
    <button
      className='border-secondary hover:bg-secondary active:bg-secondary active:ring-primary flex items-center rounded-3xl border p-4 transition-all active:ring-2 md:p-5'
      onClick={onClick}
      type='button'
    >
      <SlidersHorizontal color='#b2ae98' className='size-[2.2rem]' />
    </button>
  );
};
export default WineFilterButton;

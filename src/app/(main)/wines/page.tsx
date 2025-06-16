'use client';
import { useState } from 'react';

import WineTasteSlider from '@/feature/reviews/components/wine-taste-slider';
import MonthlyWineSection from '@/feature/wines/components/MonthlyWineSection';
import WineFlavors from '@/feature/wines/components/wine-flavors';
import WinePriceSlider from '@/feature/wines/components/wine-price-slider';
import { WineTypes } from '@/feature/wines/components/wine-types';
import {
  defaultTasteValues,
  TasteType,
} from '@/feature/wines/types/wine-taste';
import {
  Modal,
  ModalContent,
  ModalFooter,
} from '@/shared/components/common/modal';
import StarRating from '@/shared/components/common/star-rating';
import UserAvatar from '@/shared/components/common/user-avatar';
import { Button } from '@/shared/components/ui/button';
import { useModalStore } from '@/shared/stores/useModalStore';

const WinesPage = () => {
  const { open, close } = useModalStore();
  const [taste, setTaste] =
    useState<Record<TasteType, number>>(defaultTasteValues);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log('data:', data);
  };

  return (
    <main className='mx-auto overflow-hidden px-[1.6rem] pb-[4.5rem]'>
      <h1 className='sr-only'>와인 목록 페이지</h1>
      <MonthlyWineSection />
      <button onClick={() => open('test01')}>Open Modal 01</button>
      <Modal modalId='test01' title='test' showCloseButton>
        <ModalContent>
          <div className='flex items-center gap-4'>
            <UserAvatar />
            <div className='flex flex-col'>
              <p>Sentinel Carbernet Sauvignon 2016</p>
              <StarRating value={4} size='md' />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              name='리뷰 내용'
              className='border-secondary h-[10rem] w-full rounded-2xl border p-4'
            />
            <WineTasteSlider values={taste} onChange={setTaste} />
            <WineFlavors />
            <Button type='submit'>Submit</Button>
          </form>
        </ModalContent>
        <ModalFooter layout='secondary-primary'>
          <Button size='full' onClick={() => close()}>
            Close
          </Button>
          <Button size='full' onClick={() => close()}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <button onClick={() => open('test02')}>Open Modal 02</button>
      <Modal modalId='test02' title='test02' showCloseButton>
        <ModalFooter layout='secondary-primary'>
          <Button size='full' onClick={() => close()}>
            Close
          </Button>
          <Button size='full' onClick={() => close()}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <form onSubmit={handleSubmit}>
        <WineTypes />
        <WinePriceSlider />
        <Button type='submit'>Submit</Button>
      </form>
    </main>
  );
};

export default WinesPage;

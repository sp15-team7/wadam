'use client';
import FilterMyWineSection from '@/feature/landing/components/FilterMyWineSection';
import Hero from '@/feature/landing/components/Hero';
import TodayWineSection from '@/feature/landing/components/TodayWineSection';
import WineReviewSection from '@/feature/landing/components/WineReviewSection';
import {
  Modal,
  ModalFooter,
} from '@/shared/components/common/modal';
import { Button } from '@/shared/components/ui/button';
import { useModalStore } from '@/shared/stores/useModalStore';

const LandingPage = () => {
  const { open } = useModalStore();
  return (
    <main className='mx-auto max-w-[37.5rem] overflow-hidden px-[1.6rem] pb-[4.5rem] md:max-w-[76.8rem] lg:max-w-[102.4rem] lg:pb-[10rem]'>
      <Hero />
      <TodayWineSection />
      <FilterMyWineSection />
      <WineReviewSection />
      <button onClick={() => open()}>open</button>
      <Modal size='md' title='제목' showCloseButton={true}>
        {/* <div>내용이 들어갑니다.</div> */}
        <ModalFooter layout='secondary-primary'>
          <Button variant='secondary' size='full'>
            취소
          </Button>
          <Button variant='primary' size='full'>
            확인
          </Button>
        </ModalFooter>
      </Modal>
    </main>
  );
};

export default LandingPage;

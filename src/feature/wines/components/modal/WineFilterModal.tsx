import { useRef, useState } from 'react';

import WineFilterForm, {
  WineFilterFormRef,
  WineFilterFormValues,
} from '@/feature/wines/components/wine-filter/WineFilterForm';
import {
  Modal,
  ModalContent,
  ModalFooter,
} from '@/shared/components/common/modal';
import { Button } from '@/shared/components/ui/button';
import { useModalStore } from '@/shared/stores/useModalStore';
import { devLog } from '@/shared/utils/devLogger';

export const WINE_FILTER_MODAL_ID = 'wine-filter-modal';

interface WineFilterModalProps {
  onFilterSubmit: (filters: WineFilterFormValues) => void;
  initialFilters: WineFilterFormValues;
}

const WineFilterModal = ({
  onFilterSubmit,
  initialFilters,
}: WineFilterModalProps) => {
  const formRef = useRef<WineFilterFormRef>(null);
  const { close } = useModalStore();
  const [modalFilters, setModalFilters] =
    useState<WineFilterFormValues>(initialFilters);

  const handleValuesChange = (data: WineFilterFormValues) => {
    setModalFilters(data);
  };

  const handleReset = () => {
    formRef.current?.reset();
    devLog('필터 초기화');
  };

  const handleApply = () => {
    onFilterSubmit(modalFilters);
    close(WINE_FILTER_MODAL_ID);
  };

  return (
    <Modal modalId={WINE_FILTER_MODAL_ID} title='와인 필터' showCloseButton>
      <ModalContent>
        <WineFilterForm
          ref={formRef}
          onSubmit={handleValuesChange}
          initialValues={modalFilters}
          submitOnChange
        />
      </ModalContent>
      <ModalFooter layout='secondary-primary'>
        <Button size='full' variant='secondary' onClick={handleReset}>
          초기화
        </Button>
        <Button size='full' variant='primary' onClick={handleApply}>
          필터 적용하기
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default WineFilterModal;

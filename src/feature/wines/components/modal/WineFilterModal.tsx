import { useRef } from 'react';

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
import { devLog } from '@/shared/utils/devLogger';

export const WINE_FILTER_MODAL_ID = 'wine-filter-modal';

const WineFilterModal = () => {
  const formRef = useRef<WineFilterFormRef>(null);

  const handleSubmit = (data: WineFilterFormValues) => {
    devLog('필터 적용 (디바운싱):', data);
  };

  const handleReset = () => {
    formRef.current?.reset();
    devLog('필터 초기화');
  };

  const handleApply = () => {
    formRef.current?.submit();
  };

  return (
    <Modal modalId={WINE_FILTER_MODAL_ID} title='와인 필터' showCloseButton>
      <ModalContent>
        <WineFilterForm ref={formRef} onSubmit={handleSubmit} />
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

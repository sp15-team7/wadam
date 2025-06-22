import WineCreateForm from '@/feature/wines/components/form/WineCreateForm';
import { CreateWineRequest } from '@/feature/wines/schema/wine.schema';
import {
  Modal,
  ModalContent,
  ModalFooter,
} from '@/shared/components/common/modal';
import { Button } from '@/shared/components/ui/button';

export const WINE_CREATE_MODAL_ID = 'wine-create-modal';
const WINE_CREATE_FORM_ID = 'wine-create-form';

const WineCreateModal = ({
  onSubmit,
  onClose,
}: {
  onSubmit: (data: CreateWineRequest) => void;
  onClose: () => void;
}) => {
  return (
    <Modal modalId={WINE_CREATE_MODAL_ID} title='와인 등록'>
      <ModalContent>
        <WineCreateForm id={WINE_CREATE_FORM_ID} onSubmit={onSubmit} />
      </ModalContent>
      <ModalFooter layout='secondary-primary'>
        <Button size='full' variant='secondary' type='button' onClick={onClose}>
          취소
        </Button>
        <Button
          size='full'
          variant='primary'
          type='submit'
          form={WINE_CREATE_FORM_ID}
        >
          와인 등록하기
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WineCreateModal;

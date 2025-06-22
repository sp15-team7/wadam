import { toast } from 'sonner';

import { deleteReview, deleteWine } from '@/feature/libs/api/userApi';
import {
  Modal,
  ModalContent,
  ModalFooter,
} from '@/shared/components/common/modal';
import { Button } from '@/shared/components/ui/button';
import { useModalStore } from '@/shared/stores/useModalStore';

const DeleteForm = ({
  reviewId,
  wineId,
  onReviewUpdate,
  onClose,
  type,
  modalId = 'delete-form',
}: {
  reviewId?: number;
  wineId?: number;
  onReviewUpdate: () => void;
  onClose: () => void;
  type: 'review' | 'wine';
  modalId?: string;
}) => {
  const { close } = useModalStore();

  const handleDelete = async () => {
    try {
      if (type === 'review') {
        await deleteReview(reviewId!);
      } else {
        await deleteWine(wineId!);
      }
      toast.success(`${type === 'review' ? '리뷰' : '와인'} 삭제 성공`);
      onReviewUpdate?.();
      onClose();
      close(modalId);
    } catch (error) {
      console.error(error);
      toast.error(`${type === 'review' ? '리뷰' : '와인'} 삭제 실패`);
    }
  };

  const handleCancel = () => {
    onClose();
    close(modalId);
  };

  return (
    <Modal modalId={modalId} size='sm' title=''>
      <ModalContent className='flex-center'>
        <p className='text-[1.6rem] font-semibold'>정말 삭제하시겠습니까?</p>
      </ModalContent>
      <ModalFooter layout='equal'>
        <Button variant='secondary' size='full' onClick={handleCancel}>
          취소
        </Button>
        <Button variant='primary' size='full' onClick={handleDelete}>
          삭제
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default DeleteForm;

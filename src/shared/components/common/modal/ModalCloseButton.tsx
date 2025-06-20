import Image from 'next/image';

import { useModalStore } from '@/shared/stores/useModalStore';

/**
 * @author: Sumin
 * @since: 2025-06-12
 * @description: ModalCloseButton 컴포넌트
 * 모달 닫기 버튼 컴포넌트
 * @interface ModalCloseButtonProps
 * @property {string} className - 모달 닫기 버튼 클래스
 */

interface ModalCloseButtonProps {
  className?: string;
  onClose?: () => void;
}

const ModalCloseButton = ({
  className = '',
  onClose,
}: ModalCloseButtonProps) => {
  const { close, openModalId } = useModalStore();

  const handleClose = onClose || (() => close(openModalId || ''));

  return (
    <button
      type='button'
      onClick={handleClose}
      aria-label='Close modal'
      className={`cursor-pointer ${className}`}
    >
      <Image
        src='/icons/ui/icon-close.svg'
        alt='close'
        width={14}
        height={14}
      />
    </button>
  );
};

export default ModalCloseButton;

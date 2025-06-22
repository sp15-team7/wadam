import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/libs/utils/cn';
import { useModalStore } from '@/shared/stores/useModalStore';

import ModalCloseButton from './ModalCloseButton';
import ModalTitle from './ModalTitle';

/**
 * @author: Sumin
 * @since: 2025-06-12
 * @description: Modal 컴포넌트
 * 모달 컨테이너 컴포넌트
 * @interface ModalProps
 * @property {string} size - 모달 크기
 * @property {React.ReactNode} children - 모달 내용
 * @property {boolean} showCloseButton - 닫기 버튼 표시 여부
 */

/**
 * @property {string} sm - 작은 모달 크기 (Alert Dialog)
 * @property {string} md - 중간 모달 크기 (Dialog)
 */

interface ModalProps {
  modalId: string;
  size?: 'sm' | 'md';
  title: string;
  showCloseButton?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

const sizeClasses = {
  sm: 'max-w-[35.3rem]',
  md: 'max-w-[37.5rem] md:max-w-[46rem]',
};

const Modal = ({
  modalId,
  size = 'md',
  title,
  showCloseButton = false,
  children,
  onClose,
}: ModalProps) => {
  const { isOpen, close } = useModalStore();
  const open = isOpen(modalId);

  const isMouseDownOnBackdrop = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDownOnBackdrop.current = e.target === e.currentTarget;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isMouseDownOnBackdrop.current && e.target === e.currentTarget) {
      close(modalId);
      onClose?.();
    }
  };

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close(modalId);
        onClose?.();
      }
    };

    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onEsc);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onEsc);
      };
    }
  }, [open, close, modalId, onClose]);

  if (!open) return null;

  const modalContent = (
    <div
      role='dialog'
      aria-modal='true'
      className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30'
      onPointerDown={handleMouseDown}
      onPointerUp={handleMouseUp}
    >
      <div
        className={cn(
          'mx-4 flex max-h-[90vh] w-full flex-col overflow-hidden rounded-2xl bg-white',
          size === 'md' ? 'p-[2.4rem]' : 'px-[1.6rem] py-[3.2rem]',
          sizeClasses[size],
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between',
            size === 'md' ? 'justify-between' : 'justify-center',
          )}
        >
          <ModalTitle size={size}>{title}</ModalTitle>
          {showCloseButton && <ModalCloseButton onClose={onClose} />}
        </div>
        <div className='h-full overflow-y-auto'>{children}</div>
      </div>
    </div>
  );

  // Portal을 사용하여 body에 직접 렌더링
  return createPortal(modalContent, document.body);
};

export default Modal;

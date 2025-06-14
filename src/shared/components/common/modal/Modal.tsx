import React, { useEffect } from 'react';

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
  size?: 'sm' | 'md';
  title: string;
  showCloseButton?: boolean;
  children: React.ReactNode;
}

const sizeClasses = {
  sm: 'max-w-[35.3rem]',
  md: 'max-w-[37.5rem] md:max-w-[40rem]',
};

const Modal = ({
  size = 'md',
  title,
  showCloseButton = false,
  children,
}: ModalProps) => {
  const { isOpen, close } = useModalStore();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close();
  };

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onEsc);
      };
    }
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      role='dialog'
      aria-modal='true'
      className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30'
      onClick={handleBackdropClick}
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
          {showCloseButton && <ModalCloseButton />}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

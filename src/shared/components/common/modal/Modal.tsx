import React, { useEffect } from 'react';

import { useModalStore } from '@/shared/stores/useModalStore';

/**
 * @author: Sumin
 * @since: 2025-06-12
 * @description: Modal 컴포넌트
 * 모달 컨테이너 컴포넌트
 * @interface ModalProps
 * @property {string} size - 모달 크기
 * @property {React.ReactNode} children - 모달 내용
 */

/**
 * @property {string} sm - 작은 모달 크기 (Alert Dialog)
 * @property {string} md - 중간 모달 크기 (Dialog)
 */
interface ModalProps {
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

const sizeClasses = {
  sm: 'max-w-[35.3rem]',
  md: 'max-w-[37.5rem]',
};

const Modal = ({ size = 'md', children }: ModalProps) => {
  const { isOpen, close } = useModalStore();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close();
  };

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    if (isOpen) {
      document.addEventListener('keydown', onEsc);
      return () => document.removeEventListener('keydown', onEsc);
    }
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'
      onClick={handleBackdropClick}
    >
      <div
        className={`mx-4 w-full rounded-lg bg-white ${sizeClasses[size]} flex max-h-[90vh] flex-col overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

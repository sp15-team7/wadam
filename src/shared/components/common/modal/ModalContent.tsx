import React from 'react';

import { cn } from '@/shared/libs/utils/cn';

/**
 * @author: Sumin
 * @since: 2025-06-13
 * @description: ModalContent 컴포넌트
 * 모달 내용 컴포넌트
 * @interface ModalContentProps
 * @property {React.ReactNode} children - 모달 내용
 * @property {boolean} showCloseButton - 닫기 버튼 표시 여부
 */

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

const ModalContent = ({ children, className }: ModalContentProps) => {
  return <div className={cn('mt-[3.2rem]', className)}>{children}</div>;
};

export default ModalContent;

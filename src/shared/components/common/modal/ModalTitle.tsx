import React from 'react';

/**
 * @author: Sumin
 * @since: 2025-06-12
 * @description: ModalTitle 컴포넌트
 * 모달 타이틀 컴포넌트
 * @interface ModalTitleProps
 * @property {React.ReactNode} children - 모달 타이틀
 * @property {string} className - 모달 타이틀 클래스
 */

interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

const ModalTitle = ({ children, className = '' }: ModalTitleProps) => (
  <h2 className={`text-[2rem] font-bold text-gray-800 ${className}`}>
    {children}
  </h2>
);

export default ModalTitle;

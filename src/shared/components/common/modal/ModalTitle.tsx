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
  size: 'sm' | 'md';
}

const ModalTitle = ({ children, className = '', size }: ModalTitleProps) => (
  <h2
    className={`${size === 'md' ? 'text-[2rem] md:text-[2.4rem]' : 'text-[1.8rem] md:text-[2rem]'} font-bold text-gray-800 ${className}`}
  >
    {children}
  </h2>
);

export default ModalTitle;

import React from 'react';

import { cn } from '@/shared/libs/utils/cn';

/**
 * @author: Sumin
 * @since: 2025-06-12
 * @description: ModalFooter 컴포넌트
 * 모달 푸터 컴포넌트 - 다양한 버튼 레이아웃을 지원
 * @interface ModalFooterProps
 * @property {React.ReactNode} children - 모달 푸터 내용
 * @property {string} className - 추가 클래스명
 * @property {ModalFooterLayout} layout - 버튼 배치 방식
 */

type ModalFooterLayout =
  | 'single' // 버튼 1개, 전체 너비
  | 'equal' // 버튼 2개, 동일한 비율
  | 'secondary-primary'; // 버튼 2개, 우측 버튼이 더 큰 비율

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
  layout?: ModalFooterLayout;
}

const getLayoutClasses = (layout: ModalFooterLayout): string => {
  const layoutMap = {
    single: 'flex',
    equal: 'grid grid-cols-2 gap-[0.8rem]',
    'secondary-primary': 'grid grid-cols-[96fr_223fr] gap-[0.8rem]', // 96px : 223px 비율
  };

  return layoutMap[layout];
};

const ModalFooter = ({
  children,
  className = '',
  layout = 'single',
}: ModalFooterProps) => {
  const layoutClasses = getLayoutClasses(layout);

  return (
    <div className={cn('mt-[4rem]', layoutClasses, className)}>{children}</div>
  );
};

export default ModalFooter;

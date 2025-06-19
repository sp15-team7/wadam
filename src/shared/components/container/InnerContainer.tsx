import { ReactNode } from 'react';

import { cn } from '@/shared/libs/utils/cn';

/**
 * @author Sumin
 * @since 2025-06-17
 * @description 콘텐츠 영역을 감싸는 컴포넌트
 */
interface InnerContainerProps {
  children: ReactNode;
  className?: string;
}

const InnerContainer: React.FC<InnerContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'mx-auto max-w-[118rem] px-[2rem] md:px-[2.5rem] lg:px-[3.2rem]',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default InnerContainer;

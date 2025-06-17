import { ReactNode } from 'react';

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
      className={`mx-auto max-w-[114rem] px-[1.6rem] md:px-[2rem] ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default InnerContainer;

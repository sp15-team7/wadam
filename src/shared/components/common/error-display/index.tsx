import Image from 'next/image';

import { Button } from '@/shared/components/ui/button';

const ErrorDisplay = ({
  message,
  children,
  isRetry = false,
  onRetry,
}: {
  message: string;
  children?: React.ReactNode;
  isRetry?: boolean;
  onRetry?: () => void;
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };
  return (
    <div className='flex-center flex flex-col text-center'>
      <div className='relative mb-[2.4rem] h-[13.6rem] w-[13.6rem]'>
        <Image
          src='/icons/ui/icon-error.png'
          alt='error'
          fill
          className='object-contain'
        />
      </div>
      <p className='txt-2lg-regular text-gray'>{message}</p>
      {isRetry ? (
        <Button variant='primary' className='mt-[2.4rem]' onClick={handleRetry}>
          다시 시도하기
        </Button>
      ) : (
        children
      )}
    </div>
  );
};

export default ErrorDisplay;

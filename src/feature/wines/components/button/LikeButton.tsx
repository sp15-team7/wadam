'use client';

import Image from 'next/image';

import { cn } from '@/shared/libs/utils/cn';

const LikeButton = ({
  isLiked,
  className,
}: {
  isLiked: boolean;
  className?: string;
}) => {
  const handleLike = () => {
    console.log('like');
  };

  return (
    <button className={'cursor-pointer'} onClick={handleLike}>
      <Image
        src={
          isLiked
            ? '/icons/ui/icon-heart-filled.svg'
            : '/icons/ui/icon-heart-stroked.svg'
        }
        alt='heart'
        width={24}
        height={24}
        className={cn(
          'transition-all duration-300 active:scale-80 md:size-[3rem]',
          className,
        )}
      />
    </button>
  );
};
export default LikeButton;

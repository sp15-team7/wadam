'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/shared/libs/utils/cn';

const LikeButton = ({ className }: { className?: string }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
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

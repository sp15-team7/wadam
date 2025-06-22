'use client';

import Image from 'next/image';

import { useLikeReviewMutation } from '@/feature/reviews/hooks/useLikeReviewMutation';

const LikeButton = ({
  isLiked,
  reviewId,
  wineId,
}: {
  isLiked: boolean;
  reviewId: number;
  wineId: number;
}) => {
  const { mutate } = useLikeReviewMutation(wineId);

  const handleLike = () => {
    mutate({ reviewId, isLiked });
    console.log('like');
  };

  return (
    <button onClick={handleLike} aria-label='좋아요' className='cursor-pointer'>
      <Image
        src={
          isLiked
            ? '/icons/ui/icon-heart-filled.svg'
            : '/icons/ui/icon-heart-stroked.svg'
        }
        alt='heart'
        width={24}
        height={24}
        draggable={false}
        className='select-none'
      />
    </button>
  );
};

export default LikeButton;

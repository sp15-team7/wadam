'use client';
import Image from 'next/image';
import React, { useState } from 'react';

/**
 * @author Sumin
 * @since 2025-06-18
 * @description 와인 향 카드 컴포넌트
 * @returns {JSX.Element} 와인 향 카드 컴포넌트
 *
 */

interface WineAromaCardProps {
  name: string;
  imageUrl: string;
}

const WineAromaCard: React.FC<WineAromaCardProps> = ({ name, imageUrl }) => {
  const [imageSrc, setImageSrc] = useState(imageUrl);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc('/icons/ui/icon-aroma-default.png');
    }
  };
  return (
    <div className='border-secondary flex flex-col items-center justify-center gap-[1.5rem] rounded-[1.6rem] border-1 bg-white'>
      <div className='relative h-[4.5rem] w-[4.5rem] overflow-hidden'>
        <Image
          src={imageSrc}
          alt={name}
          fill
          className='object-cover'
          onError={handleImageError}
        />
      </div>
      <p className='text-gray txt-lg-regular'>{name}</p>
    </div>
  );
};

export default WineAromaCard;

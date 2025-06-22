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
    <div className='border-secondary flex h-[11.2rem] flex-col items-center justify-center gap-[1.5rem] rounded-[1.6rem] border-1 bg-white md:h-[13.4rem] lg:h-full'>
      <div className='relative h-[3rem] w-[3rem] overflow-hidden md:h-[4.5rem] md:w-[4.5rem]'>
        <Image
          src={imageSrc}
          alt={name}
          fill
          draggable='false'
          className='object-cover select-none'
          onError={handleImageError}
        />
      </div>
      <p className='text-gray md:txt-lg-regular txt-md-regular'>{name}</p>
    </div>
  );
};

export default WineAromaCard;

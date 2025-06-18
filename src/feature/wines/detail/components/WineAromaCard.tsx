import Image from 'next/image';
import React from 'react';

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
  return (
    <div className='border-secondary flex flex-col items-center justify-center gap-[1.5rem] rounded-[1.6rem] border-1 bg-white'>
      <div className='relative h-[4.5rem] w-[4.5rem] overflow-hidden'>
        <Image src={imageUrl} alt={name} fill />
      </div>
      <p className='text-gray txt-lg-regular'>{name}</p>
    </div>
  );
};

export default WineAromaCard;

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
    <div className='wine-aroma-card'>
      <div className='wine-aroma-image'>
        <Image src={imageUrl} alt={name} width={80} height={80} />{' '}
      </div>
      <p className='wine-aroma-name'>{name}</p>
    </div>
  );
};

export default WineAromaCard;

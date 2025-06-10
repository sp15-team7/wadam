'use client';

import Image from 'next/image';
import { useState } from 'react';

type StarRatingProps = {
  value: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
};

const StarRating = ({ value, readOnly = false, onChange }: StarRatingProps) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const handleMouseEnter = (starValue: number) => {
    if (!readOnly) {
      setHoveredValue(starValue);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoveredValue(null);
    }
  };

  const handleClick = (starValue: number) => {
    if (!readOnly && onChange) {
      onChange(starValue);
    }
  };

  // 현재 표시할 값 (호버 중이면 hoveredValue, 아니면 value)
  const displayValue = hoveredValue !== null ? hoveredValue : value;

  return (
    <div className='flex gap-[0.7rem]'>
      {Array.from({ length: 5 }, (_, i) => {
        const starIndex = i + 1;
        const leftHalfValue = starIndex - 0.5;
        const rightHalfValue = starIndex;

        // 각 반쪽의 활성화 상태 계산
        const isLeftHalfActive = displayValue >= leftHalfValue;
        const isRightHalfActive = displayValue >= rightHalfValue;

        return (
          <div
            key={`star-${i}`}
            className='relative flex h-[1.6rem] w-[1.6rem]'
            onMouseLeave={handleMouseLeave}
          >
            {/* 배경 (빈 별) */}
            <div className='absolute inset-0 bg-[url("/icons/ui/icon-star-empty.svg")] bg-cover bg-center' />

            {/* 왼쪽 반 (0.5점) */}
            <div
              className='relative z-10 w-1/2'
              onMouseEnter={() => handleMouseEnter(leftHalfValue)}
              onClick={() => handleClick(leftHalfValue)}
            >
              <Image
                src='/icons/ui/icon-star-filled-left.svg'
                alt='0.5점'
                width={16}
                height={16}
                className={`h-full ${readOnly ? '' : 'cursor-pointer'} transition-opacity duration-150 ${
                  isLeftHalfActive ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            {/* 오른쪽 반 (1점) */}
            <div
              className='relative z-10 w-1/2'
              onMouseEnter={() => handleMouseEnter(rightHalfValue)}
              onClick={() => handleClick(rightHalfValue)}
            >
              <Image
                src='/icons/ui/icon-star-filled-right.svg'
                alt='1점'
                width={16}
                height={16}
                className={`h-full ${readOnly ? '' : 'cursor-pointer'} transition-opacity duration-150 ${
                  isRightHalfActive ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;

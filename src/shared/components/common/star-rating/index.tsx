'use client';

import { useState, useEffect } from 'react';

type StarRatingProps = {
  value?: number;
  size?: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
};

const StarRating = ({
  value = 3, // 기본값 3점
  size = 16,
  readOnly = false,
  onChange,
}: StarRatingProps) => {
  const [selectedValue, setSelectedValue] = useState<number>(value); // 클릭한 값을 기억
  const [hoverValue, setHoverValue] = useState<number | null>(null); // 마우스 호버 값

  const displayValue = hoverValue ?? selectedValue;

  const getStarPartOpacity = (index: number, isHalf: boolean) => {
    const current = index + (isHalf ? 0.5 : 1);
    return displayValue >= current ? 1 : 0;
  };

  const handleMouseEnter = (val: number) => {
    if (!readOnly) setHoverValue(val);
  };

  const handleMouseLeave = () => {
    if (!readOnly) setHoverValue(null);
  };

  const handleClick = (val: number) => {
    if (!readOnly) {
      setSelectedValue(val);
      if (onChange) onChange(val);
    }
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <ul
      className='flex gap-[0.7rem]'
      onMouseLeave={handleMouseLeave}
      role='radiogroup'
      aria-label='별점 선택'
    >
      {Array.from({ length: 5 }, (_, i) => (
        <li
          key={`star-${i}`}
          className="flex bg-[url('/icons/ui/icon-star-empty.svg')] bg-cover bg-center"
          style={{ width: size, height: size }}
        >
          {/* 왼쪽 반 (0.5점) */}
          <button
            type='button'
            role='radio'
            disabled={readOnly}
            onMouseEnter={() => handleMouseEnter(i + 0.5)}
            onClick={() => handleClick(i + 0.5)}
            className={`flex-1 h-full transition-opacity duration-300 ease-in-out ${!readOnly ? 'cursor-pointer' : ''}`}
            style={{ opacity: getStarPartOpacity(i, true) }}
          >
            <img
              src='/icons/ui/icon-star-filled-left.svg'
              alt='0.5점'
              style={{ width: '100%', height: '100%' }}
            />
          </button>
          {/* 오른쪽 반 (1점) */}
          <button
            type='button'
            role='radio'
            disabled={readOnly}
            onMouseEnter={() => handleMouseEnter(i + 1)}
            onClick={() => handleClick(i + 1)}
            className={`flex-1 h-full transition-opacity duration-300 ease-in-out ${!readOnly ? 'cursor-pointer' : ''}`}
            style={{ opacity: getStarPartOpacity(i, false) }}
          >
            <img
              src='/icons/ui/icon-star-filled-right.svg'
              alt='1점'
              style={{ width: '100%', height: '100%' }}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default StarRating;

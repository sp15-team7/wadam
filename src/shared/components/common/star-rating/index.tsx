'use client';

import { useState, useEffect } from 'react';

// 사용자가 선택할 수 있는 값 (0.5점 단위)
type StarValue = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

type StarRatingProps = {
  value: number;
  readOnly?: boolean;
  onChange?: (value: StarValue) => void;
};

// StarValue 유효성 검사 함수
const isValidStarValue = (val: number): val is StarValue => {
  const validValues: StarValue[] = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  return validValues.includes(val as StarValue);
};

// number를 0.5점 단위 반올림
const roundToStarValue = (val: number): StarValue => {
  if (val <= 0.5) return 0.5;
  if (val >= 5) return 5;

  // 0.5 단위로 반올림
  const rounded = Math.round(val * 2) / 2;
  return isValidStarValue(rounded) ? rounded : 0.5;
};

const StarRating = ({
  value,
  readOnly = false,
  onChange,
}: StarRatingProps) => {
  // 사용자가 선택한 값 (편집 가능시)
  const [selectedValue, setSelectedValue] = useState<StarValue>(
    roundToStarValue(value),
  );
  // 마우스 호버 값
  const [hoverValue, setHoverValue] = useState<StarValue | null>(null);

  // 실제 표시할 값 결정
  const displayValue = (() => {
    if (readOnly) {
      // 읽기 전용시 전달받은 value를 반올림해서 표시
      return roundToStarValue(value);
    } else {
      // 편집 가능시 호버값이 있으면 호버값, 없으면 선택값
      return hoverValue ?? selectedValue;
    }
  })();

  const handleMouseEnter = (val: StarValue) => {
    if (!readOnly) setHoverValue(val);
  };

  const handleMouseLeave = () => {
    if (!readOnly) setHoverValue(null);
  };

  const handleClick = (val: StarValue) => {
    if (!readOnly) {
      setSelectedValue(val);
      if (onChange) onChange(val);
    }
  };

  useEffect(() => {
    if (!readOnly) {
      // 편집 가능 모드에서만 selectedValue 업데이트
      setSelectedValue(roundToStarValue(value));
    }
  }, [value, readOnly]);

  return (
    <div className='flex flex-col gap-2'>
      <ul
        className='flex gap-[0.7rem]'
        onMouseLeave={handleMouseLeave}
        role='radiogroup'
        aria-label='별점 선택'
      >
        {Array.from({ length: 5 }, (_, i) => (
          <li
            key={`star-${i}`}
            className='flex h-[1.6rem] w-[1.6rem] bg-[url("/icons/ui/icon-star-empty.svg")] bg-cover bg-center'
          >
            {/* 왼쪽 반 (0.5점) */}
            <button
              type='button'
              role='radio'
              disabled={readOnly}
              onMouseEnter={() => handleMouseEnter((i + 0.5) as StarValue)}
              onClick={() => handleClick((i + 0.5) as StarValue)}
              className={`h-full flex-1 transition-opacity duration-300 ease-in-out ${
                !readOnly ? 'cursor-pointer' : 'cursor-default'
              } ${displayValue >= i + 0.5 ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src='/icons/ui/icon-star-filled-left.svg'
                alt='0.5점'
                className='h-full w-full'
              />
            </button>
            {/* 오른쪽 반 (1점) */}
            <button
              type='button'
              role='radio'
              disabled={readOnly}
              onMouseEnter={() => handleMouseEnter((i + 1) as StarValue)}
              onClick={() => handleClick((i + 1) as StarValue)}
              className={`h-full flex-1 transition-opacity duration-300 ease-in-out ${
                !readOnly ? 'cursor-pointer' : 'cursor-default'
              } ${displayValue >= i + 1 ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src='/icons/ui/icon-star-filled-right.svg'
                alt='1점'
                className='h-full w-full'
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StarRating;

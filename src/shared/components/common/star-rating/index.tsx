/**
 * @author Sumin
 * @since 2025-06-10
 * @description 별점 컴포넌트
 * @param {StarRatingProps} props - 컴포넌트 props
 * @param {number} props.value - 현재 별점 값 (0.5 ~ 5)
 * @param {boolean} [props.readOnly=false] - 읽기 전용 모드 여부
 * @param {function} [props.onChange] - 별점 변경 시 호출되는 콜백 함수
 * @returns {JSX.Element} 별점 컴포넌트
 * @param {string} [props.size='sm'] - 별점 크기 ('sm' | 'md' | 'lg')
 *
 */
'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/shared/libs/utils/cn';

type StarRatingProps = {
  value: number;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
};

const StarRating = ({
  value,
  readOnly = false,
  size = 'sm',
  onChange,
}: StarRatingProps) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  /**
   * 읽기 전용 모드에서 실제 표시할 값을 계산
   * 소수점이 있으면 정수 부분 + 0.5로 변환 (예: 4.7 → 4.5)
   * 정수면 그대로 유지 (예: 4 → 4)
   * @param {number} rawValue - 원본 값
   * @returns {number} 변환된 표시 값
   */
  const getDisplayValue = (rawValue: number): number => {
    if (!readOnly) return rawValue;

    const hasDecimal = rawValue % 1 !== 0;
    if (hasDecimal) {
      // 소수점이 있으면 정수 부분 + 0.5
      return Math.floor(rawValue) + 0.5;
    }
    // 정수면 그대로
    return rawValue;
  };

  /**
   * 마우스가 별 위에 올라갔을 때 호출되는 핸들러
   * @param {number} starValue - 호버된 별의 값
   */
  const handleMouseEnter = (starValue: number) => {
    if (!readOnly) {
      setHoveredValue(starValue);
    }
  };

  /**
   * 마우스가 '별점 컴포넌트'에서 벗어났을 때 호출되는 핸들러
   */
  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoveredValue(null);
    }
  };

  /**
   * 별점이 변경되었을 때 호출되는 핸들러
   * @param {number} starValue - 선택된 별의 값
   */
  const handleChange = (starValue: number) => {
    if (!readOnly && onChange) {
      onChange(starValue);
    }
  };

  /**
   * 키보드 이벤트 핸들러
   * @param {React.KeyboardEvent} event - 키보드 이벤트
   * @param {number} starValue - 별의 값
   */
  const handleKeyDown = (event: React.KeyboardEvent, starValue: number) => {
    if (readOnly) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleChange(starValue);
    }
  };

  // 현재 표시할 값
  const processedValue = getDisplayValue(value);
  const displayValue = hoveredValue !== null ? hoveredValue : processedValue;

  return (
    <form
      className={cn(
        'flex',
        {
          sm: 'gap-[0.4rem] md:gap-[0.5rem]',
          md: 'gap-[0.5rem]',
          lg: 'gap-[0.6rem] md:gap-[0.9rem]',
        }[size],
      )}
      onMouseLeave={handleMouseLeave}
    >
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
            className={cn(
              'flex bg-[url("/icons/ui/icon-star-empty.svg")] bg-cover bg-center',
              {
                sm: 'h-[0.9rem] w-[0.9rem] md:h-[1.3rem] md:w-[1.3rem]',
                md: 'h-[1.3rem] w-[1.3rem] md:h-[1.7rem] md:w-[1.7rem]',
                lg: 'h-[1.7rem] w-[1.7rem] md:h-[2.4rem] md:w-[2.4rem]',
              }[size],
            )}
          >
            {/* 왼쪽 반 (0.5점) */}
            <div className='relative w-1/2'>
              <label
                htmlFor={`star-${i}-left`}
                className='block h-full'
                role={readOnly ? 'presentation' : 'button'}
                tabIndex={readOnly ? -1 : 0}
                aria-label={`${leftHalfValue}점 별점`}
                onMouseEnter={() => handleMouseEnter(leftHalfValue)}
                onKeyDown={(event) => handleKeyDown(event, leftHalfValue)}
              >
                <Image
                  src='/icons/ui/icon-star-filled-left.svg'
                  alt='0.5점'
                  width={16}
                  height={16}
                  className={`h-full ${readOnly ? '' : 'cursor-pointer'} ${
                    isLeftHalfActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </label>
              <input
                type='radio'
                name='star'
                id={`star-${i}-left`}
                value={leftHalfValue}
                checked={!readOnly && value === leftHalfValue}
                onChange={() => handleChange(leftHalfValue)}
                className='absolute h-0 w-0 overflow-hidden'
                disabled={readOnly}
              />
            </div>

            {/* 오른쪽 반 (1점) */}
            <div className='relative w-1/2'>
              <label
                htmlFor={`star-${i}-right`}
                className='block h-full'
                role={readOnly ? 'presentation' : 'button'}
                tabIndex={readOnly ? -1 : 0}
                aria-label={`${rightHalfValue}점 별점`}
                onMouseEnter={() => handleMouseEnter(rightHalfValue)}
                onKeyDown={(event) => handleKeyDown(event, rightHalfValue)}
              >
                <Image
                  src='/icons/ui/icon-star-filled-right.svg'
                  alt='1점'
                  width={16}
                  height={16}
                  className={`h-full ${readOnly ? '' : 'cursor-pointer'} ${
                    isRightHalfActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </label>
              <input
                type='radio'
                name='star'
                id={`star-${i}-right`}
                value={rightHalfValue}
                checked={!readOnly && value === rightHalfValue}
                onChange={() => handleChange(rightHalfValue)}
                className='absolute h-0 w-0 overflow-hidden'
                disabled={readOnly}
              />
            </div>
          </div>
        );
      })}
    </form>
  );
};

export default StarRating;

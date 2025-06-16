'use client';
/**
 * @author: Hyun
 * @since: 2025-06-14
 * @description: 와인 가격 슬라이더 컴포넌트
 */
import { useState } from 'react';

import DualRangeSlider from '@/shared/components/ui/dual-range-slider';

// 가격 범위가 겹치는 기준 (가격 범위 도형이 겹치는 정도 (30%))
const PRICE_RANGE_OVERLAP_THRESHOLD = 0.3;

const WinePriceSlider = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  const min = 0;
  const max = 500000;

  // 슬라이더 값을 퍼센트로 계산
  const getPositionPercent = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  // 두 가격이 가까운지 확인 (전체 범위의 30% 미만일 때)
  const isOverlapping = () => {
    const diff = Math.abs(priceRange[1] - priceRange[0]);
    const totalRange = max - min;
    return diff / totalRange < PRICE_RANGE_OVERLAP_THRESHOLD;
  };

  return (
    <div className='flex w-full max-w-[26.3rem] flex-col items-center'>
      <div className='relative mb-8 w-full'>
        {isOverlapping() ? (
          // 겹칠 때: 하나의 범위 표시로 통합 (className: 정적 스타일링, style: 동적 스타일링(js로))
          <div
            className='absolute -top-8 -translate-x-1/2 transform transition-all duration-200 ease-out'
            style={{
              left: `${(getPositionPercent(priceRange[0]) + getPositionPercent(priceRange[1])) / 2}%`,
            }}
          >
            <span className='txt-lg-regular text-primary rounded-full border bg-white px-3 py-1 whitespace-nowrap shadow-sm'>
              ₩ {priceRange[0].toLocaleString()} - ₩{' '}
              {priceRange[1].toLocaleString()}
            </span>
          </div>
        ) : (
          // 겹치지 않을 때: 각각 표시
          <>
            <div
              className='absolute -top-8 -translate-x-1/2 transform transition-all duration-200 ease-out'
              style={{ left: `${getPositionPercent(priceRange[0])}%` }}
            >
              <span className='txt-lg-regular text-primary rounded-full border bg-white px-2 py-1 whitespace-nowrap shadow-sm'>
                ₩ {priceRange[0].toLocaleString()}
              </span>
            </div>

            <div
              className='absolute -top-8 -translate-x-1/2 transform transition-all duration-200 ease-out'
              style={{ left: `${getPositionPercent(priceRange[1])}%` }}
            >
              <span className='txt-lg-regular text-primary rounded-full border bg-white px-2 py-1 whitespace-nowrap shadow-sm'>
                ₩ {priceRange[1].toLocaleString()}
              </span>
            </div>
          </>
        )}
      </div>

      <DualRangeSlider
        min={min}
        max={max}
        step={1000}
        value={priceRange}
        onValueChange={setPriceRange}
      />
    </div>
  );
};

export default WinePriceSlider;

'use client';
/**
 * @author: Hyun
 * @since: 2025-06-14
 * @description: 와인 가격 슬라이더 컴포넌트
 */
import { useLayoutEffect,useRef, useState } from 'react';

import DualRangeSlider from '@/shared/components/ui/dual-range-slider';

// 가격 범위가 겹치는 기준 (가격 범위 도형이 겹치는 정도 (30%))
const PRICE_RANGE_OVERLAP_THRESHOLD = 0.3;

const MAX_PRICE = 500000;
const MIN_PRICE = 0;

interface WinePriceSliderProps {
  value?: [number, number];
  onValueChange?: (value: [number, number]) => void;
}

const WinePriceSlider = ({ value, onValueChange }: WinePriceSliderProps) => {
  const [internalPriceRange, setInternalPriceRange] = useState<
    [number, number]
  >([MIN_PRICE, MAX_PRICE]);

  const priceRange = value ?? internalPriceRange;
  const setPriceRange = onValueChange ?? setInternalPriceRange;

  const [labelWidths, setLabelWidths] = useState({
    min: 0,
    max: 0,
    combined: 0,
  });

  const minLabelRef = useRef<HTMLDivElement>(null);
  const maxLabelRef = useRef<HTMLDivElement>(null);
  const combinedLabelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const min = MIN_PRICE;
  const max = MAX_PRICE;

  useLayoutEffect(() => {
    setLabelWidths({
      min: minLabelRef.current?.offsetWidth || 0,
      max: maxLabelRef.current?.offsetWidth || 0,
      combined: combinedLabelRef.current?.offsetWidth || 0,
    });
  }, [priceRange]);

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

  const getClampedLeft = (percent: number, width: number) => {
    if (!containerRef.current) return `${percent}%`;
    const containerWidth = containerRef.current.offsetWidth;
    const halfWidth = width / 2;
    const minPercent = (halfWidth / containerWidth) * 100;
    const maxPercent = ((containerWidth - halfWidth) / containerWidth) * 100;
    return `clamp(${minPercent}%, ${percent}%, ${maxPercent}%)`;
  };

  return (
    <div className='flex w-full flex-col items-center'>
      <div className='relative mb-8 w-full' ref={containerRef}>
        {isOverlapping() ? (
          // 겹칠 때: 하나의 범위 표시로 통합 (className: 정적 스타일링, style: 동적 스타일링(js로))
          <div
            ref={combinedLabelRef}
            className='absolute -top-8 -translate-x-1/2 transform transition-all duration-200 ease-out'
            style={{
              left: getClampedLeft(
                (getPositionPercent(priceRange[0]) +
                  getPositionPercent(priceRange[1])) /
                  2,
                labelWidths.combined,
              ),
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
              ref={minLabelRef}
              className='absolute -top-8 -translate-x-1/2 transform transition-all duration-200 ease-out'
              style={{
                left: getClampedLeft(
                  getPositionPercent(priceRange[0]),
                  labelWidths.min,
                ),
              }}
            >
              <span className='txt-lg-regular text-primary rounded-full border bg-white px-2 py-1 whitespace-nowrap shadow-sm'>
                ₩ {priceRange[0].toLocaleString()}
              </span>
            </div>

            <div
              ref={maxLabelRef}
              className='absolute -top-8 -translate-x-1/2 transform transition-all duration-200 ease-out'
              style={{
                left: getClampedLeft(
                  getPositionPercent(priceRange[1]),
                  labelWidths.max,
                ),
              }}
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
export { MAX_PRICE, MIN_PRICE };

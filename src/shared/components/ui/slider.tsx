/**
 * @author: Hyun
 * @since: 2025-06-14
 * @description: 슬라이더 컴포넌트
 */

/**
 * 기존 React.ComponentProps<typeof SliderPrimitive.Root> 타입에서 extends 해서 커스텀 인터페이스 작성 (기본 타입 확장)
 * trackClassName: 슬라이더 트랙 커스텀 클래스
 * rangeClassName: 슬라이더 범위 커스텀 클래스
 * thumbClassName: 슬라이더 점 커스텀 클래스
 *  */
interface SliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  trackClassName?: string;
  rangeClassName?: string;
  thumbClassName?: string;
}

import { cn } from '@/shared/libs/utils/cn';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  trackClassName,
  rangeClassName,
  thumbClassName,
  ...props
}: SliderProps) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot='slider'
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot='slider-track'
        className={cn(
          'bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
          trackClassName,
        )}
      >
        <SliderPrimitive.Range
          data-slot='slider-range'
          className={cn(
            'bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
            rangeClassName,
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot='slider-thumb'
          key={index}
          className={cn(
            'border-primary bg-background ring-ring/50 focus-visible: block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
            thumbClassName,
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };

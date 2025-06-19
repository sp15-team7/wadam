'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/shared/libs/utils/cn';

interface DualRangeSliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  min: number;
  max: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
}

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(({ className, min, max, value, onValueChange, ...props }, ref) => {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full items-center', className ?? '')}
      min={min}
      max={max}
      step={1}
      value={value}
      onValueChange={onValueChange}
      {...props}
    >
      <SliderPrimitive.Track className='bg-secondary relative h-2 w-full grow overflow-hidden rounded-full'>
        <SliderPrimitive.Range className='bg-primary absolute h-full' />
      </SliderPrimitive.Track>
      {value.map((_, idx) => (
        <SliderPrimitive.Thumb
          key={idx}
          className='border-primary slider-thumb-touch-target relative block h-6 w-6 rounded-full border-2 bg-white shadow'
        />
      ))}
    </SliderPrimitive.Root>
  );
});
DualRangeSlider.displayName = 'DualRangeSlider';

export default DualRangeSlider;

'use client';

/**
 * @author: Hyun
 * @since: 2025-06-14
 * @description: 와인 맛 평가를 위한 슬라이더 컴포넌트 (4가지 맛을 각각 슬라이더로 보여주고, 각 맛의 값을 조정하거나 상위 컴포넌트에서 readonly에 따른 읽기 전용 모드 제공)
 */

import { useCallback } from 'react';

import {
  defaultTasteValues,
  tasteLabels,
  tasteList,
  TasteType,
} from '@/feature/wines/types/wine-taste';
import { Slider } from '@/shared/components/ui/slider';
import { cn } from '@/shared/libs/utils/cn';

/**
 * values: { 바디감: number, 타닌: number, 당도: number, 산미: number }
 * onChange: 슬라이더 값 바뀔 때 상위컴포넌트로 값을 넘겨줌 (상위 컴포넌트에서 상태관리 해서 onChange 함수 호출)
 * readonly: 읽기 전용 모드 제공 (default: false)
 */
interface WineTasteSliderProps {
  values?: Record<TasteType, number>;
  onChange?: (values: Record<TasteType, number>) => void;
  readonly?: boolean;
  className?: string;
}

/**
 * 추후 api를 통해 값을 받아올때는(db에서 해당 id 와인을 가져와 조회) values에 api 통신 데이터 넣어주면 되고
 * 사용자가 직접 입력해야하는 작업(리뷰 작성)은 onChange로 상태 관리
 * */
const WineTasteSlider = ({
  values = defaultTasteValues,
  onChange,
  readonly = false,
  className,
}: WineTasteSliderProps) => {
  const handleChange = useCallback(
    (type: TasteType, value: number) => {
      if (!onChange) return;
      const newValues = { ...values, [type]: value };
      onChange(newValues);
    },
    [onChange, values],
  );

  return (
    <div className={cn('w-full space-y-4', className)}>
      {tasteList.map((type) => (
        <div key={type} className='flex items-center gap-4'>
          <div className='txt-md-semibold bg-secondary w-22 flex-shrink-0 rounded-xl py-1 text-center text-gray-800'>
            {type}
          </div>
          <div className='txt-md-regular w-25 text-right text-gray-800'>
            {tasteLabels[type].left}
          </div>
          <div className='flex-1 px-2'>
            <Slider
              value={[values[type] ?? defaultTasteValues[type]]}
              min={0}
              max={100}
              step={5}
              onValueChange={(val) => handleChange(type, val[0])}
              disabled={readonly}
              className='w-full'
              trackClassName='!h-2.5 bg-secondary rounded-full'
              rangeClassName='bg-transparent'
              thumbClassName='w-5 h-5 bg-primary border-none shadow-none'
            />
          </div>
          <div className='txt-md-regular lg:txt-md-regular w-25 text-left text-gray-800'>
            {tasteLabels[type].right}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WineTasteSlider;

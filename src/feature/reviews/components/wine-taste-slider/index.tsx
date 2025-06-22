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
  tasteTypeToEnglish,
} from '@/feature/wines/types/wine-taste';
import ErrorDisplay from '@/shared/components/common/error-display';
import Skeleton from '@/shared/components/ui/skeleton';
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
  isLoading?: boolean;
  isError?: boolean;
  isNoData?: boolean;
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
  isLoading,
  isError,
  isNoData,
}: WineTasteSliderProps) => {
  const handleChange = useCallback(
    (type: TasteType, value: number) => {
      if (!onChange) return;
      const newValues = { ...values, [type]: value };
      onChange(newValues);
    },
    [onChange, values],
  );

  if (isLoading)
    return (
      <div className='flex flex-col gap-[1.2rem]'>
        <Skeleton className='mb-[1.5rem] h-[2.6rem] w-full' />
        <Skeleton className='mb-[1.5rem] h-[2.6rem] w-full' />
        <Skeleton className='mb-[1.5rem] h-[2.6rem] w-full' />
        <Skeleton className='h-[2.6rem] w-full' />
      </div>
    );
  if (isError)
    return <ErrorDisplay message='맛 정보를 불러올 수 없습니다.' isRetry />;

  if (isNoData) {
    return (
      <div className='txt-md-regular flex items-center justify-center p-8 text-gray-500'>
        아직 등록된 맛 정보가 없습니다.
      </div>
    );
  }

  return (
    <div className={cn('w-full space-y-6', className)}>
      {tasteList.map((type) => (
        <div key={type} className='flex items-center gap-4'>
          <div className='bg-secondary w-22 flex-shrink-0 rounded-xl py-1 text-center text-[1.2rem] font-semibold text-gray-800 md:text-[1.4rem] md:font-medium'>
            {type}
          </div>
          <div className='w-28 text-right text-[1.4rem] font-semibold text-gray-800 md:text-[1.6rem] md:font-medium'>
            {tasteLabels[type].left}
          </div>
          <div className='flex-1 px-2'>
            <Slider
              value={[values[type] ?? defaultTasteValues[type]]}
              min={0}
              max={10}
              step={1}
              onValueChange={(val) => handleChange(type, val[0])}
              disabled={readonly}
              className='w-full'
              trackClassName='!h-2.5 bg-secondary rounded-full'
              rangeClassName='bg-transparent'
              thumbClassName='w-5 h-5 bg-primary border-none shadow-none'
            />
            {/* Form 데이터 테스트용 임시 코드 */}
            <input
              type='hidden'
              name={tasteTypeToEnglish[type]}
              value={values[type] ?? defaultTasteValues[type]}
            />
          </div>
          <div className='w-28 text-left text-[1.4rem] font-semibold text-gray-800 md:text-[1.6rem] md:font-medium'>
            {tasteLabels[type].right}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WineTasteSlider;

'use client';

/**
 * @author: Hyun
 * @since: 2025-06-13
 * @description: 와인 타입 필터링 컴포넌트 (Red, White, Sparkling)
 */

import { useState } from 'react';

const WINE_TYPES = ['Red', 'White', 'Sparkling'];
type WineType = (typeof WINE_TYPES)[number];

interface WineTypesProps {
  onChange?: (type: WineType) => void;
  value?: WineType;
  defaultValue?: WineType;
}

const WineTypes = ({
  onChange,
  value,
  defaultValue = 'Red',
}: WineTypesProps) => {
  const [localSelected, setLocalSelected] = useState<WineType>(defaultValue);

  // controlled 인지 확인
  const isControlled = value !== undefined;
  const selected = isControlled ? value : localSelected;

  const handleClick = (type: WineType) => {
    if (!isControlled) {
      setLocalSelected(type);
    }
    if (onChange) onChange(type);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='mb-4 text-[1.6rem] font-semibold lg:text-[2rem] lg:font-bold'>
        WINE TYPES
      </div>
      <div className='flex gap-4'>
        {WINE_TYPES.map((type) => (
          <button
            key={type}
            type='button'
            onClick={() => handleClick(type)}
            className={`rounded-full px-7 py-2 text-[1.6rem] font-medium transition-colors ${selected === type ? 'bg-primary text-white' : 'bg-secondary text-black'}`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export { WineTypes };
export type { WineType };

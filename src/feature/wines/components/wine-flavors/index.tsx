'use client';

/**
 * @author: Hyun
 * @since: 2025-06-13
 * @description: 와인 향 필터링 컴포넌트 (상위 컴포넌트에서 핸들러 정의 하고 onChange 속성으로 전달)
 */

import { useCallback, useEffect, useState } from 'react';

import { FlavorLabel } from '@/feature/wines/types/flavor-label';

// 서버에 바로 전송할 수 있도록 사용자가 체크한 값은 영어로 관리 ("CHERRY", "OAK"...)
const FLAVOR_LABELS = Object.values(FlavorLabel);

// 성능 최적화 (스프레드 연산자 사용 했던 기존 코드에서 수정 (O(n*n) -> O(n)))
const FLAVOR_LABEL_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(FlavorLabel).map(([kr, en]) => [en, kr]),
);

// 와인 향 필터링 컴포넌트 속성 타입
interface WineFlavorProps {
  onChange?: (selected: string[]) => void;
  selectedAromas?: string[]; // 초기 선택된 향들
  defaultSelected?: string[]; // 기본 선택값 (selectedAromas와 동일한 역할)
  key?: string | number; // 리렌더링을 위한 key prop
}

// 와인 향 필터링 컴포넌트
export const WineFlavors = ({
  onChange,
  selectedAromas,
  defaultSelected = [],
}: WineFlavorProps) => {
  // selectedAromas가 제공되면 사용하고, 그렇지 않으면 defaultSelected 또는 빈 배열 사용
  const [selected, setSelected] = useState<string[]>(() => {
    if (selectedAromas !== undefined) {
      return selectedAromas;
    }
    return defaultSelected;
  });

  // selectedAromas prop이 변경될 때만 상태 업데이트
  useEffect(() => {
    if (selectedAromas !== undefined) {
      setSelected(selectedAromas);
    }
  }, [selectedAromas]);

  /*
    와인 향 필터링 컴포넌트 속성 변경 핸들러
    클릭한 향이 이미 선택된 값인 경우 -> 배열에서 제거
    선택되지 않은 향 선택 시 -> 배열에 추가 (따라서 selected에는 현재 선택된 모든 영어 값 저장)
*/
  const handleChange = useCallback(
    (enData: string) => {
      setSelected((prev) => {
        const newSelected = prev.includes(enData)
          ? prev.filter((data) => data !== enData)
          : [...prev, enData];

        // 즉시 onChange 호출
        if (onChange) {
          onChange(newSelected);
        }

        return newSelected;
      });
    },
    [onChange],
  );

  // 영어로 받은 데이터를 한글로 변환 (O(1) 복잡도)
  const getKrData = (enData: string) => FLAVOR_LABEL_MAP[enData] || '';

  return (
    <div className='flex w-full flex-wrap gap-2'>
      {FLAVOR_LABELS.map((enData) => (
        <label
          key={enData}
          className={`cursor-pointer rounded-full px-6 py-2 text-[1.2rem] font-semibold transition-colors md:text-[1.4rem] ${selected.includes(enData) ? 'border-primary bg-primary border-1 text-white' : 'border-secondary border-1 bg-white text-black'}`}
          htmlFor={enData}
          aria-checked={selected.includes(enData)}
        >
          <input
            id={enData}
            type='checkbox'
            className='sr-only'
            checked={selected.includes(enData)}
            onChange={() => handleChange(enData)}
            aria-label={`${getKrData(enData)} 향 선택`}
          />
          {getKrData(enData)}
        </label>
      ))}
    </div>
  );
};

export default WineFlavors;

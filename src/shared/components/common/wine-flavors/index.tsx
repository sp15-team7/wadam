'use client';

/**
 * @author: Hyun
 * @since: 2025-06-13
 * @description: 와인 향 필터링 컴포넌트 (상위 컴포넌트에서 핸들러 정의 하고 onChange 속성으로 전달)
 */

import { useCallback, useEffect, useState } from 'react';
import { FlavorLabel, FlavorLabelType } from '@/shared/types/flavor-label';

// 서버에 바로 전송할 수 있도록 사용자가 체크한 값은 영어로 관리 ("CHERRY", "OAK"...)
const FLAVOR_LABELS = Object.values(FlavorLabel);

// 와인 향 필터링 컴포넌트 속성 타입
interface WineFlavorProps {
  onChange?: (selected: string[]) => void;
}

// 와인 향 필터링 컴포넌트
export const WineFlavors = ({ onChange }: WineFlavorProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  /*
    와인 향 필터링 컴포넌트 속성 변경 핸들러
    클릭한 향이 이미 선택된 값인 경우 -> 배열에서 제거
    선택되지 않은 향 선택 시 -> 배열에 추가 (따라서 selected에는 현재 선택된 모든 영어 값 저장)
*/
  const handleChange = useCallback((enData: string) => {
    setSelected((prev) =>
      prev.includes(enData)
        ? prev.filter((data) => data !== enData)
        : [...prev, enData],
    );
  }, []);

  // selected 배열이 바뀔 때마다 실행
  useEffect(() => {
    if (onChange) onChange(selected);
  }, [selected, onChange]);

  // 영어로 받은 데이터를 한글로 변환
  const getKrData = (enData: string) =>
    Object.keys(FlavorLabel).find(
      (kr) => FlavorLabel[kr as FlavorLabelType] === enData,
    ) || '';

  return (
    <div className='flex flex-wrap gap-2'>
      {FLAVOR_LABELS.map((enData) => (
        <label
          key={enData}
          className={`cursor-pointer rounded-full px-6 py-2 transition-colors ${selected.includes(enData) ? 'bg-primary text-white' : 'bg-secondary text-black'}`}
          role='checkbox'
          aria-checked={selected.includes(enData)}
          tabIndex={0}
        >
          <input
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

'use client';

import { useState } from 'react';

// ✅ 공통 Combobox 컴포넌트 불러오기
import {
  ComboboxOptions,
  ComboboxRoot,
  ComboboxTrigger,
} from '@/shared/components/common/combobox/Combobox';

// ✅ 공통 UserMenu 컴포넌트 불러오기

// ✅ [1] 외부에서 전달할 옵션 데이터 예시 - 원하는 리스트로 변경가능
const wineOptions = [
  { value: 'red', label: 'Red Wine' },
  { value: 'white', label: 'White Wine' },
  { value: 'sparkling', label: 'Sparkling Wine' },
  { value: 'rose', label: 'Rosé Wine' },
  { value: 'test', label: 'Test Wine' },
];

export default function Page() {
  // const router = useRouter();

  // ✅ [2] 외부에서 상태 관리 : 선택된 값을 관리하는 State
  const [selectedWine, setSelectedWine] = useState(wineOptions[0].value);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50 p-8'>
      <div className='w-full max-w-md space-y-8'>
        {/* ✅ [3] Combobox 사용법
            - options: 옵션 리스트 (배열)
            - value: 현재 선택된 값 (State)
            - onChange: 선택이 바뀌었을 때 동작할 함수 (State Setter)
            - placeholder: placeholder 문구
         */}
        <div className='space-y-2'>
          <ComboboxRoot
            options={wineOptions} // 외부에서 원하는 옵션 배열 전달
            value={selectedWine} // 외부에서 관리하는 선택 값
            onChange={setSelectedWine} // 외부에서 관리하는 Setter
            placeholder='와인 종류 선택'
          >
            {/* ✅ Trigger: Combobox 버튼 */}
            <ComboboxTrigger />

            {/* ✅ Options: 옵션 목록 */}
            <ComboboxOptions />
          </ComboboxRoot>
        </div>
        <div className='flex justify-between'></div>
      </div>
    </main>
  );
}

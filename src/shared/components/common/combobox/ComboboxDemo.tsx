// src/shared/components/ui/combobox/ComboboxDemo.tsx
'use client';

import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { cn } from '@/shared/libs/utils/cn';

// 1) 드롭다운에서 선택 가능한 옵션 목록
const options = [
  { value: 'red', label: 'Red' },
  { value: 'white', label: 'White' },
  { value: 'sparkling', label: 'Sparkling' },
];

export function ComboboxDemo() {
  // 2) 팝오버(드롭다운) 열림/닫힘 상태
  const [open, setOpen] = React.useState(false);
  // 3) 현재 선택된 옵션의 value
  const [value, setValue] = React.useState(options[0].value);
  // 4) 검색어 상태
  const [query, setQuery] = React.useState('');

  // 5) 검색어(query)가 포함된 옵션만 필터링
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    // 6) Popover: Trigger와 Content를 묶어주는 컨테이너
    <Popover open={open} onOpenChange={setOpen}>
      {/* 7) 트리거 버튼: 클릭하면 드롭다운이 토글됨 */}
      <PopoverTrigger asChild>
        <Button
          variant='secondary'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'w-[412px]', // 가로 412px 고정
            'flex items-center justify-between', // 텍스트와 아이콘 좌우 분산
            'rounded-full', // 완전 둥글게
            'border border-[var(--color-secondary)]', // 테두리: 연한 회색
            'bg-[var(--color-white)]', // 배경: 아이보리
            'px-6 py-4', // 패딩: 좌우24px, 상하16px
            'text-[var(--color-gray)]', // 텍스트 색: 회색톤
          )}
        >
          {/* 8) 버튼 내부: 선택된 라벨 */}
          <span className='txt-lg-semibold'>
            {options.find((o) => o.value === value)?.label}
          </span>
          {/* 9) 화살표 아이콘 */}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>

      {/* 10) 드롭다운 메뉴 박스: 버튼 중앙 아래 정렬 */}
      <PopoverContent
        align='center' // 버튼 중앙 정렬
        className={cn(
          'mt-2 w-[412px]', // 위쪽 여백 + 너비 412px
          'bg-[var(--color-white)]', // 흰 배경
          'border border-[var(--color-secondary)]', // 테두리
          'rounded-[20px]', // 모서리 둥글게 20px
          'p-0', // 기본 패딩 제거
        )}
      >
        <div className='flex flex-col space-y-2 p-2'>
          {/* 11) 검색 입력창: 트리거 버튼과 동일한 스타일 */}
          {/* <div>
            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search...'
              className={cn(
                'w-full', // 가로 꽉 채움
                'rounded-full', // 완전 둥글게
                'border border-[var(--color-secondary)]', // 테두리: 연한 회색
                'bg-[var(--color-white)]', // 배경: 아이보리
                'px-6 py-4', // 패딩: 좌우24px, 상하16px
                'text-[var(--color-gray)]', // 텍스트 색: 회색 톤
                'placeholder:text-gray-400', // 플레이스홀더 색
                'focus:outline-none', // 포커스 아웃라인 제거
              )}
            />
          </div> */}

          {/* 12) 필터링된 옵션 또는 '검색결과 없음' */}
          <div className='flex flex-col space-y-2 p-2'>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, i) => {
                const isSelected = opt.value === value;
                return (
                  // 13) 옵션 항목 버튼
                  <button
                    key={opt.value}
                    onClick={() => {
                      setValue(opt.value); // 선택값 설정
                      setOpen(false); // 드롭다운 닫기
                      setQuery(''); // 검색어 초기화
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-full px-6 py-4 text-left',
                      'hover:text-[var(--color-primary)]',
                      'hover:bg-[var(--color-secondary)]', // 마우스 오버 시 배경 강조
                      isSelected
                        ? 'rounded-[20px] text-[var(--color-primary)]'
                        : 'text-[var(--color-black)]',
                      i !== 0 && 'mt-1', // 첫 항목 제외하고 위쪽 마진
                    )}
                  >
                    {/* 14) 옵션 라벨 */}
                    <span className='txt-lg-semibold'>{opt.label}</span>
                    {/* 15) 선택된 항목에만 보일 체크 아이콘 */}
                    {/* {isSelected && <Check />} */}
                  </button>
                );
              })
            ) : (
              // 16) 검색어에 해당하는 옵션이 없을 때
              <div className='px-6 py-4 text-gray-500'>No results found.</div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

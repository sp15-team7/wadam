// 이 파일은 Next.js App Router에서 Client Component임을 명시
'use client';

// 📦 외부 아이콘 라이브러리에서 화살표 아이콘 가져옴
import { ChevronsUpDown } from 'lucide-react';
// React 기본 기능 사용 (useState 등)
import * as React from 'react';

// ✅ 프로젝트 공통 Button 컴포넌트 불러오기
import { Button } from '@/shared/components/ui/button';
// ✅ Popover 컴포넌트 불러오기 (Radix 기반)
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
// ✅ className 병합 함수 (tailwind 스타일 관리용)
import { cn } from '@/shared/libs/utils/cn';

// --------------------------------------------
// ✅ 1) 드롭다운에서 선택 가능한 옵션 목록 정의
// --------------------------------------------
const options = [
  { value: 'red', label: 'Red' },
  { value: 'white', label: 'White' },
  { value: 'sparkling', label: 'Sparkling' },
];

// --------------------------------------------
// ✅ 2) ComboboxDemo 컴포넌트 선언부
// --------------------------------------------
export function ComboboxDemo() {
  // 🗝️ Popover 열림/닫힘 상태를 관리하는 useState
  const [open, setOpen] = React.useState(false);

  // 🗝️ 현재 선택된 옵션 value 상태 관리
  const [value, setValue] = React.useState(options[0].value);

  // 🗝️ (옵션 필터링용) 검색어 상태
  const [query, setQuery] = React.useState('');

  // ✅ 5) 현재 검색어(query)가 포함된 옵션만 반환
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase()),
  );

  // --------------------------------------------
  // ✅ 6) Popover 컴포넌트로 전체 콤보박스 구성
  // --------------------------------------------
  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* ✅ 7) PopoverTrigger: 클릭 시 드롭다운 열림/닫힘 */}
      <PopoverTrigger asChild>
        <Button
          variant='secondary'
          role='combobox' // 접근성: 콤보박스로 역할 지정
          aria-expanded={open} // 접근성: 현재 열림 상태 전달
          className={cn(
            'w-[412px]', // 가로 고정
            'flex items-center justify-between', // 내부 텍스트-아이콘 양끝 배치
            'rounded-full', // 완전 원형 버튼
            'border border-[var(--color-secondary)]', // 테두리 색
            'bg-[var(--color-white)]', // 배경 색
            'px-6 py-4', // 내부 여백
            'text-[var(--color-gray)]', // 텍스트 색
          )}
        >
          {/* ✅ 8) 현재 선택된 옵션의 label 표시 */}
          <span className='txt-lg-semibold'>
            {options.find((o) => o.value === value)?.label}
          </span>
          {/* ✅ 9) 오른쪽 화살표 아이콘 */}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>

      {/* ---------------------------------------- */}
      {/* ✅ 10) PopoverContent: 실제 드롭다운 메뉴 박스 */}
      {/* ---------------------------------------- */}
      <PopoverContent
        align='center' // 버튼 중앙 아래 정렬
        className={cn(
          'mt-2 w-[412px]', // 위쪽 간격, 너비 고정
          'bg-[var(--color-white)]',
          'border border-[var(--color-secondary)]',
          'rounded-[20px]',
          'p-0', // 기본 패딩 제거
        )}
      >
        <div className='flex flex-col space-y-2 p-2'>
          {/* ✅ 11) (주석처리됨) 검색 입력창: 현재는 미사용 */}
          {/*
          <div>
            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search...'
              className={cn(
                'w-full',
                'rounded-full',
                'border border-[var(--color-secondary)]',
                'bg-[var(--color-white)]',
                'px-6 py-4',
                'text-[var(--color-gray)]',
                'placeholder:text-gray-400',
                'focus:outline-none',
              )}
            />
          </div>
          */}

          {/* ✅ 12) 옵션 리스트 영역 */}
          <div className='flex flex-col space-y-2 p-2'>
            {/* ✅ 12-1) 필터링된 옵션이 있을 경우 */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, i) => {
                // ✅ 현재 옵션이 선택된 상태인지 여부
                const isSelected = opt.value === value;
                return (
                  // ✅ 13) 각 옵션 버튼
                  <button
                    key={opt.value}
                    onClick={() => {
                      setValue(opt.value); // 선택 변경
                      setOpen(false); // 드롭다운 닫기
                      setQuery(''); // 검색어 초기화
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-full px-6 py-4 text-left',
                      'hover:text-[var(--color-primary)]',
                      'hover:bg-[var(--color-secondary)]',
                      isSelected
                        ? 'rounded-[20px] text-[var(--color-primary)]'
                        : 'text-[var(--color-black)]',
                      i !== 0 && 'mt-1', // 첫 항목 제외 위 마진
                    )}
                  >
                    {/* ✅ 14) 옵션 텍스트 */}
                    <span className='txt-lg-semibold'>{opt.label}</span>
                    {/* ✅ 15) 선택된 옵션일 때만 체크 표시 (주석처리됨) */}
                    {/* {isSelected && <Check />} */}
                  </button>
                );
              })
            ) : (
              // ✅ 16) 필터링 결과가 없으면 'No results found'
              <div className='px-6 py-4 text-gray-500'>No results found.</div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

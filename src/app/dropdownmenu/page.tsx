'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  ComboboxOptions,
  ComboboxRoot,
  ComboboxTrigger,
} from '@/shared/components/common/combobox/Combobox';
import { UserMenu } from '@/shared/components/common/combobox/UserMenu';

// 와인 옵션 데이터
const wineOptions = [
  { value: 'red', label: 'Red Wine' },
  { value: 'white', label: 'White Wine' },
  { value: 'sparkling', label: 'Sparkling Wine' },
  { value: 'rose', label: 'Rosé Wine' },
  { value: 'test', label: 'test Wine' },
];

export default function Page() {
  // Combobox 상태 관리
  const [selectedWine, setSelectedWine] = useState(wineOptions[0].value);
  const router = useRouter();

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50 p-8'>
      <div className='w-full max-w-md space-y-8'>
        <div className='space-y-2'>
          {/* <h2 className='text-2xl font-bold text-gray-900'>Combobox 데모</h2>
          <p className='text-sm text-gray-500'>와인 종류를 선택해보세요</p> */}
          <ComboboxRoot
            options={wineOptions}
            value={selectedWine}
            onChange={setSelectedWine}
            placeholder='와인 종류 선택'
          >
            <ComboboxTrigger />
            <ComboboxOptions />
          </ComboboxRoot>
        </div>

        <div className='space-y-2'>
          {/* <h2 className='text-2xl font-bold text-gray-900'>UserMenu 데모</h2>
          <p className='text-sm text-gray-500'>사용자 메뉴를 클릭해보세요</p> */}
          <div className='flex flex-row justify-center gap-8'>
            {/* 기본 UserMenu */}
            <UserMenu
              items={[
                { label: '마이페이지', onClick: () => router.push('/mypage') },
                { label: '로그아웃', onClick: () => alert('로그아웃!') },
                { label: 'test', onClick: () => alert('test') },
              ]}
            />
            <div className='mr-[100rem]'></div>
            {/* 커스텀 아바타, 스타일 UserMenu */}
            <UserMenu
              avatarSrc='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&h=256&facepad=2'
              avatarClassName='w-[64px] h-[64px] border-4 border-white shadow-lg'
              popoverClassName='bg-white border border-gray-200'
              items={[
                {
                  label: '마이페이지',
                  onClick: () => router.push('/mypage'),
                  className: 'text-red-600',
                },
                { label: '로그아웃', onClick: () => alert('로그아웃!') },
              ]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

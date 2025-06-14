'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import UserAvatar from '@/shared/components/common/user-avatar';
import { cn } from '@/shared/libs/utils/cn';

/**
 * ✅ UserMenu 컴포넌트
 * - UserAvatar 클릭 시 메뉴 열림/닫힘
 * - 메뉴는 아바타 바로 아래에 살짝 오른쪽으로 내려옴
 * - 메뉴 항목 클릭 시 이동 또는 로그아웃 처리
 * - 메뉴가 열려 있을 때 다른 곳 클릭 시 자동으로 닫힘
 */
export function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // ✅ 메뉴 바깥 클릭 감지
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const items = ['마이페이지', '로그아웃'];

  return (
    <div ref={menuRef} className='relative inline-block'>
      {/* ✅ 아바타 클릭 */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className='cursor-pointer'
      >
        <UserAvatar />
      </div>

      {open && (
        <div
          className={cn(
            'absolute top-full right-[2rem] z-10 mt-2 w-[126px] rounded-2xl border border-[var(--color-secondary)] bg-[var(--color-white)] p-2 text-center shadow',
            'txt-lg-semibold flex flex-col items-center',
          )}
        >
          {items.map((item) => (
            <button
              key={item}
              onClick={() => {
                setOpen(false);
                if (item === '마이페이지') {
                  router.push('/');
                } else if (item === '로그아웃') {
                  console.log('로그아웃!');
                }
              }}
              className={cn(
                'w-full rounded-full px-4 py-2 text-center text-[var(--color-black)]',
                'hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)]',
              )}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

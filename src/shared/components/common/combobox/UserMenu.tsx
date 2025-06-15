'use client';

import UserAvatar from '@/shared/components/common/user-avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';

/**
 * ✅ UserMenu 컴포넌트
 * - UserAvatar 클릭 시 메뉴 열림/닫힘
 * - 메뉴는 아바타 바로 아래에 살짝 오른쪽으로 내려옴
 * - 메뉴 항목 클릭 시 이동 또는 로그아웃 처리
 * - 메뉴가 열려 있을 때 다른 곳 클릭 시 자동으로 닫힘
 */

type UserMenuItem = {
  label: string;
  onClick?: () => void;
  className?: string;
};

interface UserMenuProps {
  items: UserMenuItem[];
  avatarSrc?: string;
  avatarClassName?: string;
  popoverClassName?: string;
  align?: 'center' | 'start' | 'end';
}

export function UserMenu({
  items,
  avatarSrc,
  avatarClassName = 'w-[56px] h-[56px]',
  popoverClassName = '',
  align = 'center',
}: UserMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span style={{ cursor: 'pointer' }}>
          <UserAvatar src={avatarSrc} className={avatarClassName} />
        </span>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className={`txt-lg-semibold absolute top-full z-10 mt-2 flex w-[126px] translate-x-[-180%] flex-col items-center rounded-2xl border border-[var(--color-secondary)] bg-[var(--color-white)] p-2 text-center shadow ${popoverClassName}`}
      >
        {items.map((item, idx) => (
          <button
            key={item.label + idx}
            onClick={item.onClick}
            className={`txt-lg-semibold w-full rounded-xl py-2 text-lg font-bold text-gray-900 hover:bg-gray-100 hover:text-[var(--color-primary)] ${item.className ?? ''}`}
            style={{ border: 'none', outline: 'none' }}
          >
            {item.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import type { ComponentProps } from 'react';

import { useAuthSession } from '@/feature/auth';
import UserAvatar from '@/shared/components/common/user-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

const menuItemClassName =
  'data-[highlighted]:bg-secondary flex h-full w-full cursor-pointer items-center justify-center rounded-3xl text-[1.2rem] font-semibold md:text-[1.4rem] lg:text-[1.5rem] data-[highlighted]:text-[#ac271e]';

type AuthMenuItemProps = {
  children: React.ReactNode;
} & ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

const AuthMenuItem = ({ href, onClick, children }: AuthMenuItemProps) => {
  if (href) {
    return (
      <DropdownMenuItem asChild className={menuItemClassName}>
        <Link href={href}>{children}</Link>
      </DropdownMenuItem>
    );
  }
  return (
    <DropdownMenuItem onClick={onClick} className={menuItemClassName}>
      {children}
    </DropdownMenuItem>
  );
};

const AuthButton = () => {
  const session = useAuthSession();
  const profileImage = session?.user?.image || undefined;

  const menuItems: ComponentProps<typeof AuthMenuItem>[] = [
    { href: '/myprofile', children: '마이페이지' },
    { onClick: () => signOut(), children: '로그아웃' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer'>
        <UserAvatar src={profileImage} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-10 flex h-[8rem] w-[10rem] flex-col items-center justify-center rounded-3xl lg:h-[10rem] lg:w-[12rem] xl:mr-0'>
        {menuItems.map((item) => (
          <AuthMenuItem key={item.children as string} {...item} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AuthButton;

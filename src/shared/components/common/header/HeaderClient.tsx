'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { UserMenu } from '@/shared/components/common/combobox/UserMenu';

import LoginButton from './LoginButton';

interface HeaderClientProps {
  isAuthenticated: boolean;
  userImage?: string | null;
}

const HeaderClient = ({ isAuthenticated, userImage }: HeaderClientProps) => {
  const router = useRouter();

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return (
    <UserMenu
      items={[
        { label: '마이페이지', onClick: () => router.push('/mypage') },
        { label: '로그아웃', onClick: () => signOut() },
      ]}
      avatarSrc={userImage || undefined}
      avatarClassName='h-14 w-14 md:h-16 md:w-16'
    />
  );
};

export default HeaderClient;

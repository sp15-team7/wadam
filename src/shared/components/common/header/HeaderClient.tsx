'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { UserMenu } from '@/shared/components/common/combobox/UserMenu';
import { useUserStore } from '@/shared/stores/userStore';

import LoginButton from './LoginButton';

interface HeaderClientProps {
  isAuthenticated: boolean;
}

const HeaderClient = ({ isAuthenticated }: HeaderClientProps) => {
  const router = useRouter();

  const { profileImg } = useUserStore();

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return (
    <UserMenu
      items={[
        { label: '마이페이지', onClick: () => router.push('/myprofile') },
        { label: '로그아웃', onClick: () => signOut() },
      ]}
      avatarSrc={profileImg || undefined}
      avatarClassName='h-14 w-14 md:h-16 md:w-16'
    />
  );
};

export default HeaderClient;

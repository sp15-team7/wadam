'use client';

import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/feature/auth/libs/auth';

const Header = async () => {
  const session = await auth();

  return (
    <header className='relative mx-auto flex h-20 w-full max-w-[343px] items-center px-4 py-4 md:h-24 md:max-w-2xl lg:h-28 lg:max-w-6xl'>
      {/* 왼쪽 공간 (플렉스 여백) */}
      <div className='flex flex-1' />

      {/* 로고 (가운데 정중앙) */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Link href='/wines'>
          <Image
            src='/logos/logo-red-sm.png'
            alt='logo'
            width={120}
            height={24}
            priority
            className='w-auto md:w-[140px] lg:w-[150px]'
          />
        </Link>
      </div>

      {/* 로그인 또는 유저 아이콘 */}
      <div className='flex flex-1 justify-end'>
        {session?.user ? (
          <Link href='/myprofile'>
            <Image
              src='/icons/icon-default-user.svg'
              alt='user icon'
              width={32}
              height={32}
              className='md:h-9 md:w-9 lg:h-10 lg:w-10'
            />
          </Link>
        ) : (
          <Link
            href='/signin'
            className='transition-transform duration-300 hover:rotate-90'
          >
            <Image
              src='/icons/icon-burst.svg'
              alt='burst icon'
              width={32}
              height={32}
              className='md:h-9 md:w-9 lg:h-10 lg:w-10'
            />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

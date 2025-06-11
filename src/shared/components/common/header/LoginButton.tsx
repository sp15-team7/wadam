'use client';

import Image from 'next/image';
import Link from 'next/link';

const LoginButton = () => {
  return (
    <Link href='/signin' className='group whitespace-nowrap hover:opacity-70'>
      {/* 모바일에서만 보이는 아이콘 */}
      <Image
        src='/icons/ui/icon-burst.svg'
        alt='login'
        width={28}
        height={28}
        className='inline-block transition-transform duration-300 group-hover:rotate-90 active:rotate-90 active:opacity-50 md:hidden'
      />
      {/* 데스크탑에서만 보이는 텍스트 */}
      <span className='text-primary hidden items-center text-5xl font-semibold md:flex'>
        L
        <Image
          src='/icons/ui/icon-burst.svg'
          alt='login'
          width={24}
          height={24}
          className='inline-block transition-transform duration-300 group-hover:rotate-90'
        />
        GIN
      </span>
    </Link>
  );
};

export default LoginButton;

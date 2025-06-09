import Image from 'next/image';
import Link from 'next/link';

import { auth } from '@/feature/auth/libs/auth';

import HeaderLogo from './HeaderLogo';

const Header = async () => {
  const session = await auth();

  return (
    <header className='relative mx-auto flex h-[5rem] min-w-[34.3rem] items-center px-4 py-14 md:w-[70rem] lg:h-[7rem] lg:w-[114rem] lg:py-24'>
      {/* 왼쪽: 빈 공간 (공간 확보용) */}
      <div className='flex flex-1' />

      {/* 가운데: 로고 (absolute + transform으로 정중앙) */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <HeaderLogo />
      </div>

      {/* 오른쪽: 로그인 버튼 */}
      {/* TODO: UserAvatar 컴포넌트로 대체할 것 */}
      {session?.user ? (
        <div className='flex flex-1 justify-end'>
          <Link href='/myprofile'>
            <Image
              src='/icons/ui/icon-default-user.svg'
              alt='user icon'
              width={36}
              height={36}
            />
          </Link>
        </div>
      ) : (
        <div className='flex flex-1 justify-end'>
          <Link
            href='/signin'
            className='transition-transform duration-300 hover:rotate-90'
          >
            <Image
              src='/icons/ui/icon-burst.svg'
              alt='burst icon'
              width={36}
              height={36}
            />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

import { auth } from '@/feature/auth';
import Logo from '@/shared/components/common/logo';

import HeaderClient from './HeaderClient';

const Header = async () => {
  // 서버 컴포넌트에서 세션 정보 가져오기 (SSR 호환)
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <header className='relative z-[10] w-dvw'>
      <div className='mx-auto flex max-w-[114rem] items-center justify-evenly p-14'>
        <div className='flex-1' />

        {/* 중앙 로고 - 최소 크기 보장 */}
        <div className='flex-center min-w-fit flex-shrink-0'>
          <Logo />
        </div>

        {/* 우측 액션 버튼 영역 - 최소 크기 보장 */}
        <div className='flex min-w-fit flex-1 items-center justify-end'>
          <HeaderClient
            isAuthenticated={isAuthenticated}
            userImage={session?.user?.image}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

import Link from 'next/link';

import { auth } from '@/feature/auth';
import Logo from '@/shared/components/common/logo';
import UserAvatar from '@/shared/components/common/user-avatar';
import { cn } from '@/shared/libs/utils/cn';

const Header = async () => {
  // 서버 컴포넌트에서 세션 정보 가져오기 (SSR 호환)
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <header className='w-dvw'>
      <div className='container mx-auto grid h-16 max-w-7xl grid-cols-3 items-center p-4 md:h-20 md:px-6 lg:px-8'>
        {/* 왼쪽 영역 (빈 공간) */}
        <div></div>

        {/* 중앙 로고 */}
        <div className='flex-center'>
          <Logo />
        </div>

        {/* 우측 액션 버튼 영역 */}
        <div className='flex items-center justify-end'>
          {isAuthenticated ? (
            // 로그인된 상태: UserAvatar 표시
            <UserAvatar
              src={session.user.image || undefined}
              className='mr-8 h-12 w-12 md:h-16 md:w-16'
            />
          ) : (
            // 로그인되지 않은 상태: LOGIN 버튼 표시
            <Link
              href='/signin'
              className={cn(
                'text-primary hover:text-primary/60 focus-visible:ring-ring txt-3xl-bold inline-flex h-9 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:h-10 md:px-8',
              )}
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

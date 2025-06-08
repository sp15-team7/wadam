import Link from 'next/link';

import { auth, signOut } from '@/feature/auth/libs/auth';
import { Button } from '@/shared/components/ui/button';

/**
 * 전역 헤더 컴포넌트 (서버 컴포넌트)
 */
export async function Header() {
  const session = await auth();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center justify-between'>
        <Link href='/' className='font-bold'>
          WINE REVIEW
        </Link>
        <nav className='flex items-center gap-4'>
          {session?.user ? (
            <>
              <span className='text-sm font-medium'>
                {session.user.nickname}님
              </span>
              <Link href='/myprofile'>
                <Button variant='primary'>마이페이지</Button>
              </Link>
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <Button type='submit' variant='primary'>
                  로그아웃
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href='/signin'>
                <Button variant='primary'>로그인</Button>
              </Link>
              <Link href='/signup'>
                <Button>회원가입</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

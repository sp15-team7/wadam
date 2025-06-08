import NextAuth from 'next-auth';
import { authConfig } from '@/feature/auth/libs/auth.config';

// 1. authConfig 객체에서 auth 함수를 추출합니다.
//    미들웨어는 Edge 런타임에서 동작하므로, 별도로 auth 함수를 가져옵니다.
const { auth } = NextAuth(authConfig);

/**
 * Next.js 미들웨어 설정
 *
 * 이 미들웨어는 matcher에 명시된 경로에 대한 요청을 가로채서
 * 사용자의 인증 상태에 따라 적절한 페이지로 리다이렉트하는 역할을 합니다.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
export default auth((req) => {
  // 2. `req.auth`를 통해 현재 세션 정보를 가져옵니다.
  //    이 `auth` 콜백은 미들웨어 환경에 최적화되어 있습니다.
  const session = req.auth;
  const isLoggedIn = !!session?.user;

  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // 3. 경로별 접근 제어 로직
  // Case 1: 로그인한 사용자가 로그인/회원가입 페이지에 접근하려는 경우
  // -> 기본 경로('/')로 리다이렉트시킵니다.
  if (
    isLoggedIn &&
    (pathname.startsWith('/signin') || pathname.startsWith('/signup'))
  ) {
    return Response.redirect(new URL('/', nextUrl));
  }

  // Case 2: 로그인하지 않은 사용자가 보호된 경로에 접근하려는 경우
  // -> 로그인 페이지('/signin')로 리다이렉트시킵니다.
  if (
    !isLoggedIn &&
    (pathname.startsWith('/myprofile') || pathname.startsWith('/wines'))
  ) {
    // 여기에 더 많은 보호된 경로를 추가할 수 있습니다. 예: pathname.startsWith('/dashboard')
    return Response.redirect(new URL('/signin', nextUrl));
  }

  // Case 3: 그 외의 모든 경우는 요청을 그대로 통과시킵니다.
  return;
});

// 4. 미들웨어가 적용될 경로를 설정합니다.
// 이 matcher를 사용하면, 명시된 경로 외의 API 라우트나 정적 파일(_next/*) 등에는
// 미들웨어가 실행되지 않아 불필요한 부하를 줄일 수 있습니다.
export const config = {
  matcher: [
    /*
     * 아래와 같은 경로를 제외한 모든 요청 경로와 일치합니다:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

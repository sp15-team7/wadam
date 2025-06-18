import NextAuth from 'next-auth';

import { authConfig } from '@/feature/auth/libs/auth.config';

/**
 * Next.js 미들웨어를 NextAuth로 설정합니다.
 *
 * `auth` 헬퍼가 모든 요청을 가로채서 `auth.config.ts`에 정의된
 * `authorized` 콜백 로직에 따라 인증 및 리다이렉션을 자동으로 처리합니다.
 */
export default NextAuth(authConfig).auth;

/**
 * 미들웨어가 적용될 경로를 설정합니다.
 * 이 matcher를 사용하면, 명시된 경로 외의 API 라우트나 정적 파일(_next/*) 등에는
 * 미들웨어가 실행되지 않아 불필요한 부하를 줄일 수 있습니다.
 */
export const config = {
  matcher: [
    /**
     * 아래와 같은 경로를 제외한 모든 요청 경로와 일치합니다:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

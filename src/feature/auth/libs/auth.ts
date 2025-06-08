import NextAuth from 'next-auth';
import { authConfig } from '@/feature/auth/libs/auth.config';

/**
 * NextAuth를 설정에 따라 초기화하고,
 * API 핸들러, 서버 액션, 서버 컴포넌트용 유틸리티를 export 합니다.
 *
 * - handlers: API 라우트(/api/auth/[...nextauth]/route.ts)에서 사용될 GET, POST 핸들러
 * - signIn: 로그인 처리를 위한 서버 액션
 * - signOut: 로그아웃 처리를 위한 서버 액션
 * - auth: 서버 컴포넌트나 서버 액션 내에서 현재 세션 정보를 가져오는 함수
 */

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

import type { NextAuthConfig } from 'next-auth';

import {
  jwtCallback,
  sessionCallback,
} from '@/feature/auth/utils/callbacks.utils';
import { authProviders } from '@/feature/auth/utils/providers.utils';

/**
 * NextAuth.js의 핵심 설정 객체입니다.
 *
 * 이 객체는 인증 프로바이더, 콜백, 세션 관리 전략, 페이지 경로 등
 * Auth.js의 모든 동작을 제어합니다.
 *
 * @see https://authjs.dev/reference/nextjs
 */
export const authConfig: NextAuthConfig = {
  /**
   * 애플리케이션에서 사용할 인증 방법을 정의합니다.
   * 현재는 Credentials 방식을 사용하며, 향후 OAuth 제공자를 쉽게 추가할 수 있습니다.
   */
  providers: authProviders,

  /**
   * 인증 과정의 특정 이벤트 발생 시 실행될 콜백 함수들을 정의합니다.
   * JWT 생성/관리, 세션 객체 커스터마이징 등 핵심 로직이 포함됩니다.
   */
  callbacks: {
    /**
     * 미들웨어나 API 라우트에서 요청이 승인되었는지 여부를 결정합니다.
     * 이 콜백은 `auth()`가 호출될 때마다 실행되며, 리다이렉션 로직을 중앙에서 관리합니다.
     * @returns {boolean | Response} `true`를 반환하면 요청이 계속 진행되고,
     * `false`나 `Response` 객체를 반환하면 리다이렉트됩니다.
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Case 1: 로그인한 사용자가 로그인/회원가입 페이지 접근 시 /wines로 리다이렉트
      if (
        isLoggedIn &&
        (pathname.startsWith('/signin') || pathname.startsWith('/signup'))
      ) {
        return Response.redirect(new URL('/wines', nextUrl));
      }

      // Case 2: 로그인하지 않은 사용자가 보호된 경로 접근 시 /signin으로 리다이렉트
      if (
        !isLoggedIn &&
        (pathname.startsWith('/myprofile') || pathname.startsWith('/wines/'))
      ) {
        return Response.redirect(new URL('/signin', nextUrl));
      }

      // 그 외의 모든 경우는 요청을 허용
      return true;
    },
    /**
     * JWT 토큰이 생성되거나 업데이트될 때마다 호출됩니다.
     * 로그인 성공 시, 세션 확인 시, 토큰 갱신 시 실행됩니다.
     */
    jwt: jwtCallback,

    /**
     * 세션 객체가 클라이언트에 전달되기 전에 호출됩니다.
     * JWT 토큰의 데이터를 세션 객체로 변환하고 필터링합니다.
     */
    session: sessionCallback,
  },

  /**
   * 세션 관리 전략을 설정합니다.
   * 'jwt'는 데이터베이스 없이 세션을 관리하는 방식이며, 모든 세션 정보가
   * 암호화되어 쿠키(JWE)에 저장됩니다.
   */
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일 (초 단위)
  },

  /**
   * 인증 관련 페이지들의 경로를 설정합니다.
   */
  pages: {
    signIn: '/signin', // 로그인 페이지 경로
    error: '/signin', // 인증 관련 에러 발생 시 리다이렉트 될 페이지
  },

  /**
   * 보안 관련 설정
   */
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  /**
   * 개발 환경에서의 디버그 설정
   */
  debug: process.env.NODE_ENV === 'development',
};

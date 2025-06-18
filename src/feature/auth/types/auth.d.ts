import 'next-auth';

import { User as CustomUser } from '@/feature/auth/types/auth.types';

declare module 'next-auth' {
  /**
   * `useSession`과 `auth()` 함수에서 반환되는 세션 객체 타입입니다.
   * 백엔드의 `accessToken`과 커스텀 사용자 정보를 포함하도록 확장합니다.
   */
  interface Session {
    user: CustomUser;
    accessToken: string;
    error?: 'RefreshAccessTokenError';
  }

  /**
   * 백엔드로부터 받은 사용자 정보를 포함하도록 User 타입을 확장합니다.
   * `auth.config.ts`의 `authorize` 콜백에서 이 구조를 반환해야 합니다.
   */
  interface User extends CustomUser {
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  /**
   * JWT 콜백에서 처리되는 토큰 객체의 타입입니다.
   * 백엔드의 토큰과 만료 시간, 사용자 정보를 저장합니다.
   */
  interface JWT {
    user: CustomUser;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: 'RefreshAccessTokenError';
    refreshAttempts?: number;
  }
}

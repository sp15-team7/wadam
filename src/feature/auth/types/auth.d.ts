// src/shared/types/auth.d.ts
import '@auth/core/jwt';
import '@auth/core/types';

// 백엔드 API가 응답하는 User 객체 타입
interface SignInResponse {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  teamId: string;
}

// Auth.js의 핵심 타입을 확장합니다.
declare module '@auth/core/types' {
  interface User {
    // authorize 콜백에서 반환하는 객체 전체를 포함하도록 확장
    user: SignInResponse;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    // 클라이언트에서 최종적으로 받게 될 세션 정보
    user: SignInResponse;
    accessToken: string;
    refreshToken: string;
  }
}

declare module '@auth/core/jwt' {
  // JWT 콜백의 `token` 파라미터 타입을 확장
  interface JWT {
    user: SignInResponse;
    accessToken: string;
    refreshToken: string;
  }
}

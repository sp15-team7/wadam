import { DefaultSession } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

/**
 * 인증 관련 타입 정의
 * @description 백엔드 API와 Auth.js 통합을 위한 타입들
 */

/**
 * 사용자 정보 타입
 */
export interface User {
  id: number;
  nickname: string;
  teamId: string;
  email: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * 인증 응답 타입
 */
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

/**
 * 토큰 갱신 응답 타입
 */
export interface RefreshTokenResponse {
  accessToken: string;
}

/**
 * 로그인 요청 타입
 */
export interface SignInRequest {
  email: string;
  password: string;
}

/**
 * 회원가입 요청 타입
 */
export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

/**
 * 토큰 갱신 요청 타입
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Auth.js 세션 확장 타입
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      nickname: string;
      image: string | null;
      teamId: string;
    } & DefaultSession["user"];
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    id: number;
    email: string;
    nickname: string;
    image: string | null;
    teamId: string;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: number;
    email: string;
    nickname: string;
    image: string | null;
    teamId: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}

/**
 * API 에러 타입
 */
export interface ApiError {
  message: string;
  status: number;
  details?: any;
}

// TODO: 카카오 OAuth 사용자 정보 타입 추가
// export interface KakaoProfile {
//   id: number;
//   connected_at: string;
//   properties: {
//     nickname: string;
//     profile_image?: string;
//     thumbnail_image?: string;
//   };
//   kakao_account: {
//     profile_nickname_needs_agreement: boolean;
//     profile_image_needs_agreement: boolean;
//     profile: {
//       nickname: string;
//       thumbnail_image_url?: string;
//       profile_image_url?: string;
//       is_default_image: boolean;
//     };
//     has_email: boolean;
//     email_needs_agreement: boolean;
//     is_email_valid: boolean;
//     is_email_verified: boolean;
//     email?: string;
//   };
// }

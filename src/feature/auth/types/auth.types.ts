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
 * 토큰 갱신 응답 타입
 */
export interface RefreshTokenResponse {
  accessToken: string;
}

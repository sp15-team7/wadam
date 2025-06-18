import { jwtDecode } from 'jwt-decode';

import { User } from '@/feature/auth/types/auth.types';

/**
 * JWT 토큰을 디코딩하여 만료 시간을 반환합니다.
 *
 * @param token - 디코딩할 JWT 토큰
 * @returns Unix 타임스탬프 (밀리초)
 */
export const getTokenExpiration = (token: string): number => {
  try {
    console.log('🔐 토큰 디코딩 시도:', {
      tokenExists: !!token,
      tokenLength: token?.length,
      tokenPrefix: token?.substring(0, 50) + '...',
    });

    if (!token) {
      console.error('❌ 토큰이 null/undefined입니다');
      return Date.now() - 1;
    }

    const decoded = jwtDecode(token);
    console.log('✅ 토큰 디코딩 성공:', {
      exp: decoded.exp,
      expirationTime: new Date((decoded.exp as number) * 1000).toLocaleString(),
    });

    return (decoded.exp as number) * 1000;
  } catch (error) {
    // 토큰이 유효하지 않은 경우 현재 시간보다 이전으로 설정하여 만료 처리
    console.error('❌ 토큰 디코딩 실패:', {
      errorMessage: error instanceof Error ? error.message : String(error),
      tokenExists: !!token,
      tokenLength: token?.length,
      tokenSample: token?.substring(0, 100),
    });
    return Date.now() - 1;
  }
};

/**
 * 토큰이 만료되었는지 확인합니다.
 *
 * @param expirationTime - 토큰 만료 시간 (밀리초)
 * @returns 만료 여부
 */
export const isTokenExpired = (expirationTime: number): boolean => {
  return Date.now() >= expirationTime;
};

/**
 * 사용자 ID를 안전하게 파싱합니다.
 *
 * @param userId - 문자열 또는 undefined일 수 있는 사용자 ID
 * @returns 파싱된 숫자 ID
 * @throws 유효하지 않은 ID인 경우 에러
 */
export const parseUserId = (userId: string | undefined): number => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const parsedId = parseInt(userId, 10);
  if (isNaN(parsedId)) {
    throw new Error('Invalid user ID format');
  }

  return parsedId;
};

/**
 * 사용자 객체를 NextAuth 형식으로 변환합니다.
 *
 * @param user - 백엔드에서 받은 사용자 정보
 * @param accessToken - 액세스 토큰
 * @param refreshToken - 리프레시 토큰
 * @returns NextAuth 호환 사용자 객체
 */
export const transformUserForNextAuth = (
  user: User,
  accessToken: string,
  refreshToken: string,
) => ({
  ...user,
  id: user.id.toString(),
  accessToken,
  refreshToken,
});

/**
 * NextAuth User 객체를 내부 User 타입으로 변환합니다.
 *
 * @param user - NextAuth User 객체
 * @returns 내부 User 타입 객체
 */
export const transformUserFromNextAuth = (
  user: Record<string, unknown>,
): User => ({
  id: parseUserId(user.id as string | undefined),
  email: user.email as string,
  nickname: user.nickname as string,
  image: user.image as string | null,
  createdAt: user.createdAt as string,
  updatedAt: user.updatedAt as string,
  teamId: user.teamId as string,
});

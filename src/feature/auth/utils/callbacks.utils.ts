import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

import { refreshToken } from '@/feature/auth/services/auth.service';
import { User as CustomUser } from '@/feature/auth/types/auth.types';
import {
  getTokenExpiration,
  isTokenExpired,
  transformUserFromNextAuth,
} from '@/feature/auth/utils/jwt.utils';

/**
 * JWT 토큰 초기화 처리
 * 최초 로그인 시 실행되는 로직
 */
const initializeJwtToken = (token: JWT, user: User): JWT => {
  try {
    // 토큰 정보 설정
    token.accessToken = user.accessToken;
    token.refreshToken = user.refreshToken;
    token.accessTokenExpires = getTokenExpiration(user.accessToken);

    // 사용자 정보 변환 및 저장
    token.user = transformUserFromNextAuth(
      user as unknown as Record<string, unknown>,
    );

    // 에러 상태 초기화
    delete token.error;

    return token;
  } catch (error) {
    console.error('JWT 토큰 초기화 오류:', error);
    token.error = 'RefreshAccessTokenError';
    return token;
  }
};

/**
 * 액세스 토큰 갱신 처리
 */
const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    console.log('액세스 토큰이 만료되었습니다. 갱신을 시도합니다.');

    const refreshed = await refreshToken({
      refreshToken: token.refreshToken as string,
    });

    // 새로운 토큰 정보 업데이트
    token.accessToken = refreshed.accessToken;
    token.accessTokenExpires = getTokenExpiration(refreshed.accessToken);

    // 에러 상태 제거
    delete token.error;

    console.log('액세스 토큰이 성공적으로 갱신되었습니다.');
    return token;
  } catch (error) {
    console.error('액세스 토큰 갱신 중 오류가 발생했습니다:', error);
    token.error = 'RefreshAccessTokenError';
    return token;
  }
};

/**
 * JWT 콜백 함수
 * JWT 토큰 생성/업데이트 시 호출됩니다.
 */
export const jwtCallback = async ({
  token,
  user,
}: {
  token: JWT;
  user?: User;
}): Promise<JWT> => {
  // Phase 1: 최초 로그인 (user 객체가 존재할 때)
  if (user) {
    return initializeJwtToken(token, user);
  }

  // Phase 2: 후속 세션 확인
  const expirationTime = token.accessTokenExpires as number;

  // Case 1: 토큰이 아직 만료되지 않은 경우
  if (!isTokenExpired(expirationTime)) {
    return token;
  }

  // Case 2: 토큰이 만료된 경우 - 갱신 시도
  return refreshAccessToken(token);
};

/**
 * Session 콜백 함수
 * 세션 객체가 클라이언트에 전달되기 전에 호출됩니다.
 */
export const sessionCallback = async ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Promise<Session> => {
  // JWT에서 세션으로 데이터 복사
  session.user = token.user as CustomUser;
  session.accessToken = token.accessToken as string;
  session.error = token.error;

  return session;
};

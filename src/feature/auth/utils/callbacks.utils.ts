import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

import { refreshToken } from '@/feature/auth/services/auth.service';
import { User as CustomUser } from '@/feature/auth/types/auth.types';
import {
  getTokenExpiration,
  isTokenExpired,
} from '@/feature/auth/utils/jwt.utils';

/**
 * useSession()의 update() 함수로 전달되는 데이터 타입
 */
interface SessionUpdateData {
  name?: string;
  image?: string;
}

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

    // 사용자 정보 저장 (이미 변환된 형태이므로 추가 변환 불필요)
    token.user = {
      id: parseInt(user.id as string),
      email: user.email as string,
      nickname: user.nickname as string,
      image: user.image as string | null,
      createdAt: user.createdAt as string,
      updatedAt: user.updatedAt as string,
      teamId: user.teamId as string,
    };

    // 에러 상태 초기화
    delete token.error;

    return token;
  } catch (error) {
    console.error('❌ JWT 토큰 초기화 오류:', {
      errorMessage: error instanceof Error ? error.message : String(error),
      userData: {
        hasAccessToken: !!user.accessToken,
        hasRefreshToken: !!user.refreshToken,
      },
    });
    token.error = 'RefreshAccessTokenError';
    return token;
  }
};

/**
 * 액세스 토큰 갱신 처리
 */
const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    if (!token.refreshToken) {
      console.error('🚨 RefreshToken이 없어 토큰 갱신을 중단합니다.');
      throw new Error('NoRefreshToken');
    }

    console.log(
      '⏰ 액세스 토큰이 만료되어 갱신을 시작합니다. RefreshToken:',
      `${(token.refreshToken as string).substring(0, 20)}...`,
    );

    const refreshed = await refreshToken({
      refreshToken: token.refreshToken as string,
    });

    console.log('✅ 액세스 토큰이 성공적으로 갱신되었습니다.');

    // 새로운 토큰 정보 업데이트
    return {
      ...token,
      accessToken: refreshed.accessToken,
      accessTokenExpires: getTokenExpiration(refreshed.accessToken),
      error: undefined, // 에러 상태 초기화
    };
  } catch (error) {
    console.error('❌ 액세스 토큰 갱신 중 심각한 오류가 발생했습니다:', {
      errorName: error instanceof Error ? error.name : 'Unknown',
      errorMessage: error instanceof Error ? error.message : String(error),
    });

    // 갱신 실패 시, 에러를 기록하고 사용자가 다시 로그인하도록 유도
    return {
      ...token,
      error: 'RefreshAccessTokenError', // 세션에 에러 상태 전파
    };
  }
};

/**
 * JWT 콜백 함수
 * JWT 토큰 생성/업데이트 시 호출됩니다.
 */
export const jwtCallback = async ({
  token,
  user,
  trigger,
  session,
}: {
  token: JWT;
  user?: User;
  trigger?: 'signIn' | 'signUp' | 'update';
  session?: SessionUpdateData;
}): Promise<JWT> => {
  // 세션 업데이트 트리거 처리
  if (trigger === 'update' && session) {
    if (session.name) {
      (token.user as CustomUser).nickname = session.name;
    }
    if (session.image) {
      (token.user as CustomUser).image = session.image;
    }
    return token;
  }

  // 1. 최초 로그인 시, 사용자 정보로 토큰을 초기화합니다.
  if (user) {
    return initializeJwtToken(token, user);
  }

  // 2. 토큰이 아직 유효한 경우, 그대로 반환합니다.
  if (!isTokenExpired(token.accessTokenExpires as number)) {
    return token;
  }

  // 3. 토큰이 만료되었고, 이전에 이미 갱신에 실패한 경우, 더 이상 진행하지 않습니다.
  if (token.error === 'RefreshAccessTokenError') {
    return token;
  }

  // 4. 토큰이 만료되었고, 아직 갱신 시도를 하지 않았다면 갱신을 시도합니다.
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

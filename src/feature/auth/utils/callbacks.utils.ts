import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

import { refreshToken } from '@/feature/auth/services/auth.service';
import { User as CustomUser } from '@/feature/auth/types/auth.types';
import {
  getTokenExpiration,
  isTokenExpired,
} from '@/feature/auth/utils/jwt.utils';

/**
 * JWT 토큰 초기화 처리
 * 최초 로그인 시 실행되는 로직
 */
const initializeJwtToken = (token: JWT, user: User): JWT => {
  try {
    console.log('🔑 JWT 토큰 초기화 시작:', {
      hasAccessToken: !!user.accessToken,
      hasRefreshToken: !!user.refreshToken,
      accessTokenLength: user.accessToken?.length,
      refreshTokenLength: user.refreshToken?.length,
      accessTokenPrefix: user.accessToken?.substring(0, 50) + '...',
      refreshTokenPrefix: user.refreshToken?.substring(0, 50) + '...',
    });

    // 토큰 정보 설정
    token.accessToken = user.accessToken;
    token.refreshToken = user.refreshToken;
    token.accessTokenExpires = getTokenExpiration(user.accessToken);

    console.log('📅 토큰 만료 시간 설정:', {
      accessTokenExpires: token.accessTokenExpires,
      expirationTime: new Date(token.accessTokenExpires).toLocaleString(),
      timeUntilExpiry:
        Math.round((token.accessTokenExpires - Date.now()) / 1000) + '초',
    });

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
    delete token.refreshAttempts;

    console.log('✅ JWT 토큰 초기화 완료');
    return token;
  } catch (error) {
    console.error('❌ JWT 토큰 초기화 오류:', {
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
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
    const currentAttempts = (token.refreshAttempts as number) || 0;
    console.log(
      `액세스 토큰이 만료되었습니다. 갱신을 시도합니다. (시도 횟수: ${currentAttempts + 1}/3)`,
    );
    console.log(
      '🔑 사용할 refreshToken:',
      token.refreshToken
        ? `${(token.refreshToken as string).substring(0, 20)}...`
        : 'NULL',
    );

    if (!token.refreshToken) {
      throw new Error('RefreshToken이 없습니다. 다시 로그인이 필요합니다.');
    }

    const refreshed = await refreshToken({
      refreshToken: token.refreshToken as string,
    });

    console.log('🌐 백엔드 응답 수신:', {
      hasAccessToken: !!refreshed.accessToken,
      accessTokenLength: refreshed.accessToken?.length,
    });

    // 새로운 토큰 정보 업데이트
    token.accessToken = refreshed.accessToken;
    token.accessTokenExpires = getTokenExpiration(refreshed.accessToken);

    // 에러 상태 및 재시도 횟수 초기화
    delete token.error;
    delete token.refreshAttempts;

    console.log('✅ 액세스 토큰이 성공적으로 갱신되었습니다.');
    return token;
  } catch (error) {
    console.error('❌ 액세스 토큰 갱신 중 오류가 발생했습니다:', {
      errorName: error instanceof Error ? error.name : 'Unknown',
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
    });

    // 구체적인 에러 분류
    if (error instanceof Error) {
      if (error.message.includes('유효하지 않은 토큰')) {
        console.error(
          '🚨 갱신 실패 원인: RefreshToken이 만료되었거나 유효하지 않음',
        );
      } else if (error.message.includes('Unauthorized')) {
        console.error('🚨 갱신 실패 원인: 인증 권한 없음 (401)');
      } else if (
        error.message.includes('Failed to fetch') ||
        error.message.includes('Network')
      ) {
        console.error('🚨 갱신 실패 원인: 네트워크 오류');
      } else if (
        error.message.includes('500') ||
        error.message.includes('Internal Server Error')
      ) {
        console.error('🚨 갱신 실패 원인: 서버 내부 오류');
      } else {
        console.error('🚨 갱신 실패 원인: 알 수 없는 오류 -', error.message);
      }
    }

    // 재시도 횟수 추적
    const currentAttempts = (token.refreshAttempts as number) || 0;
    token.refreshAttempts = currentAttempts + 1;

    // 3회 이상 실패하면 더 이상 재시도하지 않음
    if (token.refreshAttempts >= 3) {
      console.error(
        '🚨 토큰 갱신 최대 재시도 횟수 초과. 로그아웃이 필요합니다.',
      );
      token.error = 'RefreshAccessTokenError';
      // 토큰 만료 시간을 과거로 설정하여 더 이상 갱신 시도하지 않도록 함
      token.accessTokenExpires = Date.now() - 1000;
    } else {
      console.warn(
        `⚠️ 토큰 갱신 실패. ${60}초 후 재시도합니다. (${token.refreshAttempts}/3)`,
      );
      // 재시도를 위해 토큰 만료 시간을 현재 시간보다 약간 미래로 설정
      token.accessTokenExpires = Date.now() + 60 * 1000; // 1분 후 재시도
    }

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
    console.log('🔑 최초 로그인 - JWT 토큰 초기화');
    return initializeJwtToken(token, user);
  }

  // Phase 2: 후속 세션 확인
  const expirationTime = token.accessTokenExpires as number;
  const timeUntilExpiry = expirationTime - Date.now();

  console.log(
    `🔍 토큰 상태 체크 - 만료까지 ${Math.round(timeUntilExpiry / 1000)}초 남음`,
  );

  // Case 1: 이미 갱신 실패한 토큰이면 더 이상 시도하지 않음
  if (token.error === 'RefreshAccessTokenError') {
    console.log('❌ 이미 갱신 실패한 토큰입니다. 로그아웃이 필요합니다.');
    console.log('🔍 실패한 토큰 정보:', {
      hasRefreshToken: !!token.refreshToken,
      refreshAttempts: token.refreshAttempts,
      accessTokenExpires: new Date(
        token.accessTokenExpires as number,
      ).toLocaleString(),
    });
    return token;
  }

  // Case 2: 토큰이 아직 만료되지 않은 경우
  if (!isTokenExpired(expirationTime)) {
    console.log('✅ 토큰이 유효합니다.');
    return token;
  }

  // Case 3: 토큰이 만료된 경우 - 갱신 시도
  console.log('⏰ 토큰이 만료되었습니다. 갱신 프로세스를 시작합니다.');
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

import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { ERROR_MESSAGES } from '@/feature/auth/constants/auth.message';

/**
 * 인증 세션을 관리하는 커스텀 훅
 *
 * 기능:
 * - 세션 정보 제공
 * - 토큰 만료 시 자동 로그아웃 처리
 * - 에러 상태 모니터링
 */
export const useAuthSession = () => {
  const { data: session, status, update } = useSession();

  // 토큰 갱신 에러 감지 시 자동 로그아웃
  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      console.warn('토큰 갱신 오류 감지. 로그아웃을 진행합니다.');
      signOut({
        callbackUrl: '/signin',
        redirect: true,
      });
    }
  }, [session?.error]);

  /**
   * 세션 강제 갱신
   */
  const refreshSession = async () => {
    try {
      await update();
    } catch (error) {
      console.error('세션 갱신 실패:', error);
    }
  };

  /**
   * 인증된 사용자인지 확인
   */
  const isAuthenticated = status === 'authenticated' && !session?.error;

  /**
   * 로딩 상태인지 확인
   */
  const isLoading = status === 'loading';

  /**
   * 에러 메시지 반환
   */
  const getErrorMessage = () => {
    if (session?.error === 'RefreshAccessTokenError') {
      return ERROR_MESSAGES.TOKEN_REFRESH_FAILED;
    }
    return null;
  };

  return {
    session,
    status,
    isAuthenticated,
    isLoading,
    refreshSession,
    errorMessage: getErrorMessage(),
    user: session?.user || null,
    accessToken: session?.accessToken || null,
  };
};

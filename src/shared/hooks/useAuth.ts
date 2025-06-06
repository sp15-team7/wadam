/**
 * @author: Hyun
 * @since: 2025-06-06
 * @description: 인증 상태 관리 훅 (로그인 / 로그아웃) 우선 api 미연동, mockData 사용
 */

import { useAuthStore } from '../stores/auth.store';

export const useAuth = () => {
  const { isAuthenticated, user, accessToken, login, logout } = useAuthStore();

  const handleLogin = () => {
    // api 연동 전까지 mockData 사용
    const mockUser = {
      email: 'test@test.com',
      nickname: 'test',
    };

    const mockToken = 'mock-token';

    login(mockUser, mockToken);
  };

  const handleLogout = () => {
    logout();
  };

  return {
    isAuthenticated,
    user,
    accessToken,

    login: handleLogin,
    logout: handleLogout,
  };
};

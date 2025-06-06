/**
 * @author: Hyun
 * @since: 2025-06-05
 * @description: 인증 상태 관리 스토어 (로그인 여부 / 사용자 정보 / 인증 토큰)
 */

import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../schemas/userAuth.schema';

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;

  login: (user: User, token: string) => void;
  logout: () => void;
}

// 스토어 생성 함수
const createAuthStore: StateCreator<AuthStore> = (set) => ({
  // 초기 상태
  isAuthenticated: false,
  user: null,
  accessToken: null,

  // 로그인 액션
  login: (user, token) => {
    set({
      isAuthenticated: true,
      user,
      accessToken: token,
    });
  },

  // 로그아웃 액션
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      accessToken: null,
    });
  },
});

/**
 * 인증 상태 관리하는 스토어 생성
 * persist 미들웨어를 사용하여 새로고침 후에도 상태 유지 (localStorage에 저장)
 */
export const useAuthStore = create<AuthStore>()(
  persist<AuthStore>(createAuthStore, {
    name: 'auth-storage', // localStorage에 저장될 키 이름
  }),
);

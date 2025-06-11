// src/feature/auth/utils/providers.utils.ts

import { AuthResponse } from '@/feature/auth/types/auth.types';
import { transformUserForNextAuth } from '@/feature/auth/utils/jwt.utils';
import type { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// 수정된 부분: 'SignInSchema' 대신 'signInSchema'로 임포트 이름을 변경하고 세미콜론을 추가했습니다.
import { signInSchema } from '@/feature/auth/schema/auth.schema'; // <-- 이 부분을 이렇게 수정하세요.

/**
 * 사용자 자격증명을 검증하고 인증을 처리합니다.
 *
 * @param credentials - 로그인 폼에서 전달된 자격증명
 * @returns 성공 시 사용자 객체, 실패 시 null
 */
const authorizeUser = async (
  credentials: Record<string, unknown>,
): Promise<User | null> => {
  // 1. 입력값 유효성 검사
  // signInSchema를 사용하여 credentials를 검사합니다.
  const validatedFields = signInSchema.safeParse(credentials); // <-- 여기서 signInSchema 사용

  if (!validatedFields.success) {
    console.warn('로그인 입력값 유효성 검사 실패:', validatedFields.error);
    return null;
  }

  try {
    // 2. 백엔드 인증 API 호출 (실제 auth.service에서 signIn 함수를 임포트해야 합니다.)
    // 이 예시에서는 signIn 함수가 정의되어 있지 않으므로, 더미로 대체합니다.
    // import { signIn } from '@/feature/auth/services/auth.service'; <- 이 줄을 추가해야 합니다.
    const signIn = async (data: any): Promise<AuthResponse | null> => {
      // 실제 백엔드 로그인 로직을 여기에 구현하세요.
      // 예시: const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(data) });
      // 예시: if (!response.ok) throw new Error('인증 실패');
      // 예시: return response.json();
      await new Promise((resolve) => setTimeout(resolve, 500)); // 네트워크 지연 흉내
      if (
        data.email === 'test@example.com' &&
        data.password === 'password123'
      ) {
        return {
          user: { id: '1', email: 'test@example.com', name: 'Test User' },
          accessToken: 'fake_access_token',
          refreshToken: 'fake_refresh_token',
        };
      }
      return null;
    };

    const authResponse: AuthResponse | null = await signIn(
      validatedFields.data,
    );

    if (!authResponse) {
      console.warn('백엔드에서 빈 응답을 받았습니다.');
      return null;
    }

    // 3. NextAuth 호환 형식으로 변환
    const { user, accessToken, refreshToken } = authResponse;
    return transformUserForNextAuth(user, accessToken, refreshToken);
  } catch (error) {
    console.error('로그인 인증 오류:', error);
    return null;
  }
};

/**
 * Credentials Provider 설정
 * 이메일과 비밀번호를 사용한 기본 인증 방식
 */
export const credentialsProvider = Credentials({
  id: 'credentials',
  name: 'Credentials',
  authorize: authorizeUser,
});

/**
 * 모든 인증 제공자 목록
 * 향후 OAuth 제공자(Google, Kakao 등)를 쉽게 추가할 수 있습니다.
 */
export const authProviders = [credentialsProvider];

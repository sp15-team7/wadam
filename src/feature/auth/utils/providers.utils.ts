import type { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { signInSchema } from '@/feature/auth/schema/auth.schema';
import { signIn } from '@/feature/auth/services/auth.service';
import { AuthResponse } from '@/feature/auth/types/auth.types';
import { transformUserForNextAuth } from '@/feature/auth/utils/jwt.utils';

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
  const validatedFields = signInSchema.safeParse(credentials);

  if (!validatedFields.success) {
    console.warn('로그인 입력값 유효성 검사 실패:', validatedFields.error);
    return null;
  }

  try {
    // 2. 백엔드 인증 API 호출
    const authResponse: AuthResponse = await signIn(validatedFields.data);

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

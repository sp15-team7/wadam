// src/feature/auth/utils/providers.utils.ts

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
  console.log('🔍 authorizeUser 호출됨:', credentials);

  // 1. 입력값 유효성 검사
  const validatedFields = signInSchema.safeParse(credentials);

  if (!validatedFields.success) {
    console.warn('❌ 로그인 입력값 유효성 검사 실패:', validatedFields.error);
    return null;
  }

  console.log('✅ 유효성 검사 통과:', validatedFields.data);

  try {
    // 2. 백엔드 인증 API 호출
    console.log('🌐 백엔드 API 호출 시작...');
    const authResponse: AuthResponse = await signIn(validatedFields.data);
    console.log('✅ 백엔드 API 응답 받음:', {
      userId: authResponse.user.id,
      email: authResponse.user.email,
    });

    // 3. NextAuth 호환 형식으로 변환
    const { user, accessToken, refreshToken } = authResponse;
    const transformedUser = transformUserForNextAuth(
      user,
      accessToken,
      refreshToken,
    );
    console.log('✅ NextAuth 형식으로 변환 완료:', {
      id: transformedUser.id,
      email: transformedUser.email,
    });

    return transformedUser;
  } catch (error) {
    console.error('❌ 로그인 인증 오류:', error);
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
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  authorize: authorizeUser,
});

/**
 * 모든 인증 제공자 목록
 * 향후 OAuth 제공자(Google, Kakao 등)를 쉽게 추가할 수 있습니다.
 */
export const authProviders = [credentialsProvider];

'use server';

import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

import { signIn } from '@/feature/auth/libs/auth';
import { SignupSchema } from '@/feature/auth/schema/auth.schema';
import {
  getAuthErrorMessage,
  signUp,
} from '@/feature/auth/services/auth.service';

/**
 * Server Action에서 클라이언트에 전달할 상태 형태 정의
 * - `message`는 사용자에게 전달할 피드백 메시지
 * - `null`이면 에러 없음
 */
type ActionState = { message?: string } | null;

/**
 * 회원가입 처리 Server Action
 *
 * @description
 * - 사용자가 제출한 회원가입 폼 데이터를 검증하고, 유효할 경우 회원가입 후 자동 로그인까지 수행
 * - 인증 완료 후 홈(`/wines`)으로 리다이렉트 처리
 *
 * @param prevState - 이전 상태. (useFormState에서 사용됨)
 * @param formData - 클라이언트에서 전달된 FormData 객체
 * @returns ActionState - 에러 메시지가 포함된 상태 or null
 */
export async function signUpAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // 1. FormData → JS 객체로 변환 후 유효성 검사
  const validatedFields = SignupSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  // 2. 유효하지 않으면 즉시 에러 메시지 반환
  if (!validatedFields.success) {
    return { message: '입력 값이 유효하지 않습니다. 다시 확인해주세요.' };
  }

  try {
    // 3. 회원가입 → 자동 로그인 시도
    const { email, password } = validatedFields.data;

    // 백엔드 회원가입 API 호출 (회원 생성)
    await signUp(validatedFields.data);

    // 회원가입 성공 시 바로 로그인 처리 (토큰은 쿠키로 세팅됨)
    await signIn('credentials', {
      email,
      password,
      redirect: false, // 수동으로 redirect 제어하기 위해 false
    });
  } catch (error) {
    // 4. 서버 에러 처리 - 구체적인 에러 메시지 반환
    console.error('회원가입 오류:', error);
    return { message: getAuthErrorMessage(error) };
  }

  // 5. 홈으로 리다이렉트 (인증 성공 후)
  redirect('/wines');
}

/**
 * 로그인 처리 Server Action
 *
 * @description
 * - 사용자 로그인 요청 처리
 * - 인증 실패 시, 사용자 친화적인 에러 메시지를 반환
 * - 성공 시 아무 에러 없이 상태만 반환
 *
 * @param prevState - 이전 상태 (useFormState와 호환)
 * @param formData - FormData 객체 (email/password 포함)
 * @returns ActionState - 실패 시 에러 메시지 포함
 */
export async function signInAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    // Auth.js Credentials Provider로 로그인 시도
    await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false, // 수동으로 redirect 제어하기 위해 false
    });
  } catch (error) {
    console.error('로그인 오류:', error);

    // 인증 실패 시 에러 종류에 따라 사용자 메시지 반환
    if (error instanceof AuthError) {
      // NextAuth 에러의 경우 더 구체적인 메시지 제공
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: '이메일 또는 비밀번호를 확인해주세요.' };
        case 'CallbackRouteError':
          return {
            message: '로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.',
          };
        case 'AccessDenied':
          return { message: '접근이 거부되었습니다.' };
        default:
          return { message: '로그인에 실패했습니다. 다시 시도해주세요.' };
      }
    }

    // 기타 에러 처리
    const errorMessage = getAuthErrorMessage(error);
    return { message: errorMessage };
  }

  // 로그인 성공 시 홈으로 리다이렉트
  redirect('/wines');
}

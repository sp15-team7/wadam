'use server';

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

import { signIn } from '@/feature/auth/libs/auth';
import { signUpSchema } from '@/feature/auth/schema/auth.schema';
import { signUp } from '@/feature/auth/services/auth.service';

type ActionState = { message?: string } | null;

export async function signUpAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const validatedFields = signUpSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return { message: '입력 값이 유효하지 않습니다. 다시 확인해주세요.' };
  }

  try {
    const { email, password } = validatedFields.data;
    await signUp(validatedFields.data);
    await signIn('credentials', { email, password, redirect: false });
  } catch (error) {
    return { message: '회원가입에 실패했습니다. (닉네임 중복 등)' };
  }

  redirect('/');
}

export async function signInAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: '이메일 또는 비밀번호가 올바르지 않습니다.' };
    }
    throw error;
  }
  return {};
}

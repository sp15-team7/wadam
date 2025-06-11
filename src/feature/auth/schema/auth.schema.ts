// src/feature/auth/schema/auth.schema.ts

import { z } from 'zod';

/**
 * 이메일 유효성 검사 스키마
 */
export const emailSchema = z
  .string()
  .min(1, '이메일은 필수 입력입니다.')
  .email('이메일 형식으로 작성해주세요.');

/**
 * 비밀번호 유효성 검사 스키마
 *
 * ⚠️ 허용 문자: 알파벳 대소문자, 숫자, !@#$%^&*
 */
export const passwordSchema = z
  .string()
  .min(1, '비밀번호는 필수 입력입니다.')
  .min(8, '비밀번호는 최소 8자 이상입니다.')
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.',
  );

/**
 * 비밀번호 확인 입력 스키마
 */
export const passwordConfirmationSchema = z
  .string()
  .min(1, '비밀번호 확인을 입력해주세요.');

/**
 * 닉네임 유효성 검사 스키마
 */
export const nicknameSchema = z
  .string()
  .min(1, '닉네임은 필수 입력입니다.')
  .max(20, '닉네임은 최대 20자까지 가능합니다.');

/**
 * 로그인 폼 유효성 스키마
 */
export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

/**
 * 회원가입 폼 유효성 스키마
 */
export const SignupSchema = z
  .object({
    email: emailSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    passwordConfirmation: passwordConfirmationSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

/**
 * 로그인 폼 데이터 타입
 */
export type SignInFormData = z.infer<typeof signInSchema>;

/**
 * 회원가입 폼 데이터 타입
 */
export type SignUpFormData = z.infer<typeof SignupSchema>;

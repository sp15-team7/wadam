/**
 * @author: Hyun
 * @since: 2025-06-05
 * @description: 사용자 인증 관련 스키마 (로그인 / 회원가입)
 */

import { z } from 'zod';

// 로그인 스키마
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일은 필수 입력입니다.')
    .email('이메일 형식으로 작성해 주세요.'),
  password: z.string().min(1, '비밀번호는 필수 입력입니다.'),
});

// 회원가입 스키마
export const SignUpSchema = z
  .object({
    email: z.string().email('이메일 형식으로 작성해 주세요.'),
    nickname: z
      .string()
      .min(2, '닉네임은 최소 2자 이상입니다.')
      .max(20, '닉네임은 최대 20자까지 가능합니다.'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상입니다.')
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        '비밀번호는 숫자, 영문, 특수문자를 포함해야 합니다',
      ),
    passwordCheck: z.string(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  });

// 로그인된 사용자 정보 스키마 (로그인 후 비밀번호는 불필요하기 때문에 제외)
export const UserSchema = z.object({
  email: z.string().email(),
  nickname: z.string(),
});

// 타입 추론
export type LoginData = z.infer<typeof LoginSchema>;
export type SignUpData = z.infer<typeof SignUpSchema>;
export type User = z.infer<typeof UserSchema>;

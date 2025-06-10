import { z } from 'zod';

import type {
  AuthResponse,
  AuthUser,
  SignInRequestBody,
  SignUpRequestBody,
} from '../types/api';
import { dateStringSchema } from './commonSchema';

// --- 재사용 가능한 기본 스키마 (클라이언트 및 서버 유효성 검사에 공통 사용) ---
export const emailSchema = z.string().email('이메일 형식으로 작성해주세요.');

// 비밀번호 복잡성: 영문, 숫자, 특수문자 포함 8자 이상
export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
  .regex(
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\da-zA-Z!@#$%^&*]{8,}$/,
    '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.',
  );

export const nicknameSchema = z
  .string()
  .min(1, '닉네임은 필수입니다.')
  .max(20, '닉네임은 최대 20자까지 가능합니다.');

// --- API 요청 Body 스키마 ---
export const signInRequestBodySchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호를 입력해 주세요.'), // 로그인 시에는 최소 길이만
});

export const signUpRequestBodySchema = z
  .object({
    email: emailSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    passwordConfirmation: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

// --- API 응답 데이터 스키마 ---
export const authUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  teamId: z.string(),
  updatedAt: dateStringSchema,
  createdAt: dateStringSchema,
  image: z.string().url().nullable(),
});

export const authResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: authUserSchema,
});

// --- 타입 추론 및 일치 확인 (Optional: 개발 시점에 타입 불일치 확인용) ---
export type SignInRequestBodyType = z.infer<typeof signInRequestBodySchema>;
const _typeCheckSignIn: SignInRequestBody = {} as SignInRequestBodyType;
void _typeCheckSignIn;

export type SignUpRequestBodyType = z.infer<typeof signUpRequestBodySchema>;
const _typeCheckSignUp: SignUpRequestBody = {} as SignUpRequestBodyType;
void _typeCheckSignUp;

export type AuthUserType = z.infer<typeof authUserSchema>;
const _typeCheckAuthUser: AuthUser = {} as AuthUserType;
void _typeCheckAuthUser;

export type AuthResponseType = z.infer<typeof authResponseSchema>;
const _typeCheckAuthResponse: AuthResponse = {} as AuthResponseType;
void _typeCheckAuthResponse;

import { z } from 'zod';

import type {
  AuthResponse,
  SignInRequest,
  SignUpRequest,
  User,
} from '@/feature/auth/types/auth.types';

// --- 재사용 가능한스키마 (클라이언트 및 서버 유효성 검사에 공통 사용) ---
// auth 스키마 내에 이메일, 닉네임, 비밀번호 관련 기본 스키마를 정의.

export const emailSchema = z.string().email('이메일 형식으로 작성해주세요.');

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

// --- 폼 유효성 검사 스키마 (클라이언트 전용) ---

/**
 * 로그인 폼 유효성 스키마
 *
 * - email: 이메일 형식 검증
 * - password: 최소 1자 입력만 요구 (로그인 시 복잡도는 서버에서 확인)
 */
export const signInFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호는 필수 입력입니다.'),
});

/**
 * 회원가입 폼 유효성 스키마
 *
 * - email: 이메일 형식 검증
 * - nickname: 닉네임 필수 + 길이 제한
 * - password: 복잡도 및 정규식 검증 포함
 * - passwordConfirmation: 확인용 입력값, 최소 1자 필요 및 password 일치 여부 검증
 */
export const signUpFormSchema = z
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

// 폼 데이터 타입 추론
export type SignInFormData = z.infer<typeof signInFormSchema>;
export type SignUpFormData = z.infer<typeof signUpFormSchema>;

// --- API 요청 Body 스키마 ---

export const signInRequestBodySchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
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

export const userSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  nickname: z.string(),
  teamId: z.string(),
  updatedAt: z
    .string()
    .datetime({ message: '유효한 날짜 및 시간 형식이어야 합니다.' }),
  createdAt: z
    .string()
    .datetime({ message: '유효한 날짜 및 시간 형식이어야 합니다.' }),
  image: z.string().url().nullable(),
});

export const authResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: userSchema,
});

// --- 타입 추론 및 일치 확인 (Optional: 개발 시점에 타입 불일치 확인용) ---
export type SignInRequestType = z.infer<typeof signInRequestBodySchema>;
const _typeCheckSignIn: SignInRequest = {} as SignInRequestType;
void _typeCheckSignIn;

export type SignUpRequestBodyType = z.infer<typeof signUpRequestBodySchema>;
const _typeCheckSignUp: SignUpRequest = {} as SignUpRequestBodyType;
void _typeCheckSignUp;

export type AuthUserType = z.infer<typeof userSchema>;
const _typeCheckAuthUser: User = {} as AuthUserType;
void _typeCheckAuthUser;

export type AuthResponseType = z.infer<typeof authResponseSchema>;
const _typeCheckAuthResponse: AuthResponse = {} as AuthResponseType;
void _typeCheckAuthResponse;

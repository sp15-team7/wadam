import { z } from 'zod';

import type {
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignInRequest,
  SignUpRequest,
  User,
} from '@/feature/auth/types/auth.types';

// --- 재사용 가능한 기본 스키마 (클라이언트 및 서버 유효성 검사에 공통 사용) ---

/**
 * 이메일 유효성 검사 스키마
 */

export const emailSchema = z.string().email('이메일 형식으로 작성해주세요.');

/**
 * 비밀번호 유효성 검사 스키마
 */

export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
  .regex(
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\da-zA-Z!@#$%^&*]{8,}$/,
    '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.',
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

// --- 폼 유효성 검사 스키마 (클라이언트 전용) ---

/**
 * 로그인 폼 유효성 스키마
 *
 * - email: 이메일 형식 검증
 * - password: 최소 1자 입력만 요구 (로그인 시 복잡도는 서버에서 확인)
 */
export const signInSchema = z.object({
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

// 폼 데이터 타입 추론
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof SignupSchema>;

// --- API 요청 Body 스키마 ---

export const signInRequestSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
});

export const signUpRequestSchema = z
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

/**
 * 사용자 정보 타입에 대한 Zod 스키마
 */

export const userSchema = z.object({
  id: z.number().int().positive(),
  nickname: z
    .string()
    .min(1, '닉네임은 1자 이상이어야 합니다.')
    .max(20, '닉네임은 20자 이하여야 합니다.'),
  teamId: z.string(),
  email: z.string().email(),
  image: z.string().url('유효한 이미지 URL이어야 합니다.').nullable(),
  updatedAt: z
    .string()
    .datetime({ message: '유효한 날짜 및 시간 형식이어야 합니다.' }),
  createdAt: z
    .string()
    .datetime({ message: '유효한 날짜 및 시간 형식이어야 합니다.' }),
});

//** API 응답 타입에 대한 Zod 스키마 */

export const authResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: userSchema,
});

// --- 리프레시 토큰 스키마---

export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(1, '리프레시 토큰이 필요합니다.'),
});

// --- 액세스 토큰 스키마 ---

export const refreshTokenResponseSchema = z.object({
  accessToken: z.string().min(1, '새로운 액세스 토큰이 필요합니다.'),
});

// --- 타입 추론 및 일치 확인 ---
export type SignInRequestBodyType = z.infer<typeof signInRequestSchema>;
const _typeCheckSignInRequest: SignInRequest = {} as SignInRequestBodyType;
void _typeCheckSignInRequest;

export type SignUpRequestBodyType = z.infer<typeof signUpRequestSchema>;
const _typeCheckSignUpRequest: SignUpRequest = {} as SignUpRequestBodyType;
void _typeCheckSignUpRequest;

export type UserType = z.infer<typeof userSchema>;
const _typeCheckUser: User = {} as UserType;
void _typeCheckUser;

export type AuthResponseType = z.infer<typeof authResponseSchema>;
const _typeCheckAuthResponse: AuthResponse = {} as AuthResponseType;
void _typeCheckAuthResponse;

export type RefreshTokenRequestType = z.infer<typeof refreshTokenRequestSchema>;
const _typeCheckRefreshTokenRequest: RefreshTokenRequest =
  {} as RefreshTokenRequestType;
void _typeCheckRefreshTokenRequest;

export type RefreshTokenResponseType = z.infer<
  typeof refreshTokenResponseSchema
>;
const _typeCheckRefreshTokenResponse: RefreshTokenResponse =
  {} as RefreshTokenResponseType;
void _typeCheckRefreshTokenResponse;

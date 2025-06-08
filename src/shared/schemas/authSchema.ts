import { z } from 'zod';
import { userSchema, dateStringSchema } from './commonSchema';
import type {
  SignUpRequestBody,
  SignInRequestBody,
  AuthUser,
  AuthResponse,
} from '../types/api';

// 회원가입 요청 Body 스키마
export const signUpRequestBodySchema = z
  .object({
    email: z.string().email('이메일 형식으로 작성해 주세요.'),
    nickname: z
      .string()
      .min(1, '닉네임은 필수입니다.')
      .max(20, '닉네임은 최대 20자까지 가능합니다.'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상입니다.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\da-zA-Z!@#$%^&*]{8,}$/,
        '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.',
      ),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'], // 에러 메시지가 표시될 필드
  });

// 타입 추론 및 일치 확인
export type SignUpRequestBodySchema = z.infer<typeof signUpRequestBodySchema>;
const _typeCheckSignUp: SignUpRequestBody = {} as SignUpRequestBodySchema;
void _typeCheckSignUp; // 읽히지 않음 오류를 해결하기 위한 코드

// 로그인 요청 Body 스키마
export const signInRequestBodySchema = z.object({
  email: z.string().email('이메일 형식으로 작성해 주세요.'),
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
});

// 타입 추론 및 일치 확인
export type SignInRequestBodySchema = z.infer<typeof signInRequestBodySchema>;
const _typeCheckSignIn: SignInRequestBody = {} as SignInRequestBodySchema;
void _typeCheckSignIn; // 읽히지 않음 오류를 해결하기 위한 코드

// 인증된 사용자 정보 스키마
export const authUserSchema = userSchema.extend({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  teamId: z.string(),
  updatedAt: dateStringSchema,
  createdAt: dateStringSchema,
  image: z.string().url().nullable(),
});

// 타입 추론 및 일치 확인
export type AuthUserSchema = z.infer<typeof authUserSchema>;
const _typeCheckAuthUser: AuthUser = {} as AuthUserSchema;
void _typeCheckAuthUser; // 읽히지 않음 오류를 해결하기 위한 코드

// 인증 응답 스키마 (회원가입, 로그인)
export const authResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: authUserSchema,
});

// 타입 추론 및 일치 확인
export type AuthResponseSchema = z.infer<typeof authResponseSchema>;
const _typeCheckAuthResponse: AuthResponse = {} as AuthResponseSchema;
void _typeCheckAuthResponse; // 읽히지 않음 오류를 해결하기 위한 코드

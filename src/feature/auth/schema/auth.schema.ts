import { z } from 'zod';

// shared에서 기본 스키마들을 가져와 재사용
import {
  emailSchema,
  nicknameSchema,
  passwordSchema,
} from '@/shared/schemas/authSchema';

/**
 * 로그인 폼 유효성 스키마
 *
 * - email: 이메일 형식 검증(shared의 emailSchema 재사용)
 * - password: 최소 1자 입력만 요구 (로그인 시 복잡도는 서버에서 확인)
 */
export const signInFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호는 필수 입력입니다.'),
});

/**
 * 회원가입 폼 유효성 스키마
 *
 * - email: 이메일 형식 검증 (shared의 emailSchema 재사용)
 * - nickname: 닉네임 필수 + 길이 제한 (shared의 nicknameSchema 재사용)
 * - password: 복잡도 및 정규식 검증 포함 (shared의 passwordSchema 재사용)
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

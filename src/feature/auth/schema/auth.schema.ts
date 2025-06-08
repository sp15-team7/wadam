import { z } from 'zod';

export const emailSchema = z.string().email('이메일 형식으로 작성해주세요.');

export const passwordSchema = z
  .string()
  .min(1, '비밀번호는 필수 입력입니다.')
  .min(8, '비밀번호는 최소 8자 이상힙니다.')
  .regex(
    /^[a-zA-Z0-9!@#$%^&*]+$/,
    '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.',
  );

export const nicknameSchema = z
  .string()
  .min(1, '닉네임은 필수 입력입니다.')
  .max(20, '닉네임은 최대 20자까지 가능합니다.');

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호는 필수 입력입니다.'),
});

export const signUpSchema = z
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

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;

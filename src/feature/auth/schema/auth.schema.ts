import { z } from 'zod';

/**
 * 이메일 유효성 검사 스키마
 *
 * - 문자열이어야 하며 (`z.string()`)
 * - 이메일 형식에 맞는지 검증합니다. (`.email()`)
 * - 형식이 맞지 않을 경우, 지정된 오류 메시지를 반환합니다.
 *
 * 예시: "user@example.com" → ✅, "abc" → ❌ "이메일 형식으로 작성해주세요."
 */
export const emailSchema = z
  .string()
  .min(1, '이메일은 필수 입력입니다.')
  .email('이메일 형식으로 작성해주세요.');

/**
 * 비밀번호 유효성 검사 스키마
 *
 * - 문자열이어야 하며 (`z.string()`)
 * - 최소 1자 이상이어야 함 (`.min(1)`) → 필수 입력
 * - 최소 8자 이상이어야 함 (`.min(8)`)
 * - 숫자, 영문, 특수문자만 허용하는 정규식 검증 포함
 *
 * ⚠️ 허용 문자: 알파벳 대소문자, 숫자, !@#$%^&*
 * 예외 처리 시 상세 메시지 제공
 */
export const passwordSchema = z
  .string()
  .min(1, '비밀번호는 필수 입력입니다.') // 공백 입력 방지
  .min(8, '비밀번호는 최소 8자 이상힙니다.') // 보안 강화
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.', // 허용된 문자 외 입력 방지
  );

export const passwordConfirmationSchema = z
  .string()
  .min(1, '비밀번호 확인을 입력해주세요.');

/**
 * 닉네임 유효성 검사 스키마
 *
 * - 문자열이어야 하며
 * - 필수 입력 (`.min(1)`)
 * - 최대 20자 제한 (`.max(20)`) → UI 공간 제약 등 고려
 */
export const nicknameSchema = z
  .string()
  .min(1, '닉네임은 필수 입력입니다.')
  .max(20, '닉네임은 최대 20자까지 가능합니다.');

/**
 * 로그인 폼 유효성 스키마
 *
 * - email: 이메일 형식 검증(emailSchema 재사용)
 * - password: 최소 1자 입력만 요구 (비밀번호 복잡도는 로그인 시엔 생략 가능)
 *
 * ⚠️ 서버에서 일치 여부는 따로 확인하며, 이 스키마는 단순 클라이언트 측 유효성 검사용입니다.
 */
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호는 필수 입력입니다.'), // 단순 입력 확인
});

/**
 * 회원가입 폼 유효성 스키마
 *
 * - email: 이메일 형식 검증 (emailSchema 재사용)
 * - nickname: 닉네임 필수 + 길이 제한 (nicknameSchema 재사용)
 * - password: 복잡도 및 정규식 검증 포함 (passwordSchema 재사용)
 * - passwordConfirmation: 확인용 입력값, 최소 1자 필요
 * - .refine(): password와 passwordConfirmation 일치 여부 검증
 *
 * ⚠️ refine은 객체 수준에서 커스텀 검증할 때 사용 (단일 필드 이상 연관 검증에 유리)
 */
export const SignupSchema = z
  .object({
    email: emailSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    passwordConfirmation: passwordConfirmationSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.', // 불일치 시 사용자 피드백
    path: ['passwordConfirmation'], // 오류가 passwordConfirmation 필드에 표시되도록 지정
  });

/**
 * 로그인 폼 데이터 타입

 * - 타입은 signInSchema를 기반으로 추론됨
 *
 * 예:
 * {
 *   email: string;
 *   password: string;
 * }
 */
export type SignInFormData = z.infer<typeof signInSchema>;

/**
 * 회원가입 폼 데이터 타입

 * - 타입은 signUpSchema를 기반으로 추론됨
 *
 * 예:
 * {
 *   email: string;
 *   nickname: string;
 *   password: string;
 *   passwordConfirmation: string;
 * }
 */
export type SignUpFormData = z.infer<typeof SignupSchema>;

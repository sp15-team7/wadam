# 🔐 Auth 인증 시스템

Next.js 15와 NextAuth.js 5(Auth.js)를 기반으로 구현된 JWT 인증 시스템입니다. 이메일/비밀번호 기반의 자격증명 인증을 지원하며, Server Actions와 React Server Components를 활용한 현대적인 인증 아키텍처를 제공합니다.

## 🏗️ 전체 구조

```
src/feature/auth/
├── index.ts                 # 통합 export (바렐 패턴)
├── libs/                    # 핵심 인증 로직
│   ├── auth.ts             # NextAuth 초기화 및 exports
│   └── auth.config.ts      # NextAuth 설정 객체
├── types/                   # TypeScript 타입 정의
│   ├── auth.types.ts       # 인증 관련 interface
│   └── auth.d.ts           # NextAuth 모듈 확장
├── schema/                  # Zod 유효성 검사 스키마
│   └── auth.schema.ts      # 로그인/회원가입 폼 스키마
├── services/                # API 통신 서비스
│   └── auth.service.ts     # 백엔드 인증 API 호출
├── hooks/                   # React 커스텀 훅
│   └── useAuthSession.ts   # 세션 관리 훅
├── components/              # 인증 UI 컴포넌트
│   ├── SignInForm.tsx      # 로그인 폼
│   └── SignUpForm.tsx      # 회원가입 폼
├── actions/                 # Server Actions
│   └── auth.action.ts      # 로그인/회원가입 서버 액션
├── utils/                   # 유틸리티 함수들
│   ├── callbacks.utils.ts  # NextAuth 콜백 함수
│   ├── jwt.utils.ts        # JWT 토큰 관련 유틸
│   └── providers.utils.ts  # 인증 프로바이더 설정
├── constants/               # 상수 정의
│   └── auth.message.ts     # 에러/성공 메시지
└── README.md               # 이 문서
```

## 🚀 빠른 시작

### 1. Middleware 기반 인증 시스템

이 프로젝트는 **middleware를 통한 자동 리다이렉팅**으로 인증을 처리합니다:

```typescript
// src/middleware.ts - 자동 경로 보호
export default auth((req) => {
  const session = req.auth;
  const isLoggedIn = !!session?.user;
  const { pathname } = req.nextUrl;

  // 로그인한 사용자 → 로그인/회원가입 페이지 접근 시
  if (
    isLoggedIn &&
    (pathname.startsWith('/signin') || pathname.startsWith('/signup'))
  ) {
    return Response.redirect(new URL('/wines', nextUrl));
  }

  // 미인증 사용자 → 보호된 페이지 접근 시
  if (!isLoggedIn && pathname.startsWith('/myprofile')) {
    return Response.redirect(new URL('/signin', nextUrl));
  }
});
```

- **보호된 경로**: `/myprofile` (자동 로그인 페이지로 리다이렉트)
- **인증 후 리다이렉트**: `/wines` (기본 홈 페이지)

### 2. 서버 컴포넌트에서 세션 사용

**보호된 페이지**: middleware가 인증을 보장하므로 조건부 렌더링 불필요

```tsx
// 보호된 페이지 (/myprofile 등)
import { auth } from '@/feature/auth';

export default async function MyProfilePage() {
  const session = await auth();

  // middleware가 인증을 보장하므로 session은 항상 존재
  return (
    <div>
      <h1>마이 프로필</h1>
      <p>안녕하세요, {session!.user.nickname}님!</p>
      <p>팀 ID: {session!.user.teamId}</p>
      <p>이메일: {session!.user.email}</p>
    </div>
  );
}
```

**공개 페이지**: 선택적 인증 확인

```tsx
// 공개 페이지 (/, /wines 등)
import { auth } from '@/feature/auth';

export default async function HomePage() {
  const session = await auth();

  if (session) {
    return <div>안녕하세요, {session.user.nickname}님! 와인을 둘러보세요.</div>;
  }

  return (
    <div>
      <h1>와인 커뮤니티에 오신 것을 환영합니다!</h1>
      <p>로그인하여 더 많은 기능을 이용해보세요.</p>
    </div>
  );
}
```

### 3. 클라이언트 컴포넌트에서 세션 사용

```tsx
'use client';

import { useAuthSession } from '@/feature/auth';

export default function UserProfile() {
  const { user, isLoading, accessToken } = useAuthSession();

  if (isLoading) return <div>로딩 중...</div>;

  // 보호된 페이지에서는 user가 항상 존재
  return (
    <div>
      <h2>현재 사용자: {user!.nickname}</h2>
      <p>액세스 토큰: {accessToken ? '✅ 유효' : '❌ 없음'}</p>
    </div>
  );
}
```

### 4. 로그인/회원가입 폼 사용

```tsx
// 로그인 페이지
import { SignInForm } from '@/feature/auth';

export default function SignInPage() {
  return (
    <div className='mx-auto max-w-md'>
      <h1>로그인</h1>
      <SignInForm />
    </div>
  );
}
```

```tsx
// 회원가입 페이지
import { SignUpForm } from '@/feature/auth';

export default function SignUpPage() {
  return (
    <div className='mx-auto max-w-md'>
      <h1>회원가입</h1>
      <SignUpForm />
    </div>
  );
}
```

## 🔧 주요 컴포넌트

### 인증 설정 (`libs/auth.config.ts`)

NextAuth.js의 핵심 설정을 관리합니다:

- **프로바이더**: Credentials 기반 이메일/비밀번호 인증
- **세션 전략**: JWT 기반 (데이터베이스 불필요)
- **세션 수명**: 30일
- **콜백**: JWT 토큰 생성/갱신, 세션 객체 변환
- **보안**: HTTPS 강제 (프로덕션), httpOnly 쿠키

### 타입 시스템 (`types/auth.types.ts`)

완전한 타입 안전성을 제공하는 인터페이스들:

```typescript
// 사용자 정보
interface User {
  id: number;
  nickname: string;
  teamId: string;
  email: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

// 인증 응답 (로그인/회원가입 후)
interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// 로그인 요청
interface SignInRequest {
  email: string;
  password: string;
}

// 회원가입 요청
interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}
```

### 유효성 검사 (`schema/auth.schema.ts`)

Zod를 활용한 강력한 폼 유효성 검사:

```typescript
// 이메일 검증
const emailSchema = z.string().email('이메일 형식으로 작성해주세요.');

// 비밀번호 검증 (8자 이상, 영문/숫자/특수문자만)
const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상입니다.')
  .regex(/^[a-zA-Z0-9!@#$%^&*]+$/, '허용되지 않은 문자가 포함되어 있습니다.');

// 회원가입 스키마 (비밀번호 일치 검증 포함)
const signUpSchema = z
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
```

## 🔒 보안 기능

### 1. JWT 토큰 관리

- **Access Token**: 짧은 수명의 API 인증 토큰
- **Refresh Token**: 긴 수명의 토큰 갱신용 토큰
- **자동 갱신**: 토큰 만료 시 자동으로 새 토큰 발급
- **토큰 검증**: 만료 시간 및 유효성 자동 확인

### 2. 세션 보안

```typescript
// useAuthSession 훅의 자동 로그아웃 기능
useEffect(() => {
  if (session?.error === 'RefreshAccessTokenError') {
    console.warn('토큰 갱신 오류 감지. 로그아웃을 진행합니다.');
    signOut({
      callbackUrl: '/signin',
      redirect: true,
    });
  }
}, [session?.error]);
```

### 3. 쿠키 보안 설정

```typescript
cookies: {
  sessionToken: {
    name: 'next-auth.session-token',
    options: {
      httpOnly: true,        // XSS 공격 방지
      sameSite: 'lax',       // CSRF 공격 방지
      path: '/',
      secure: process.env.NODE_ENV === 'production', // HTTPS 강제
    },
  },
}
```

## 📋 Server Actions

### 회원가입 액션

```typescript
export async function signUpAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // 1. 입력값 유효성 검사
  const validatedFields = signUpSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return { message: '입력 값이 유효하지 않습니다.' };
  }

  try {
    // 2. 회원가입 API 호출
    await signUp(validatedFields.data);

    // 3. 자동 로그인
    await signIn('credentials', {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false,
    });
  } catch {
    return { message: '회원가입에 실패했습니다.' };
  }

  // 4. 성공 시 홈으로 리다이렉트
  redirect('/wines');
}
```

### 로그인 액션

```typescript
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
```

## 🎯 커스텀 훅 사용법

### `useAuthSession`

세션 상태를 관리하는 강력한 커스텀 훅:

```typescript
const {
  session, // 전체 세션 객체
  status, // 'loading' | 'authenticated' | 'unauthenticated'
  isAuthenticated, // 인증 여부 (boolean)
  isLoading, // 로딩 상태 (boolean)
  refreshSession, // 세션 강제 갱신 함수
  errorMessage, // 에러 메시지 (string | null)
  user, // 사용자 정보 (User | null)
  accessToken, // API 요청용 토큰 (string | null)
} = useAuthSession();
```

**사용 예시**:

```tsx
function UserDashboard() {
  const { isAuthenticated, user, isLoading, refreshSession } = useAuthSession();

  if (isLoading) {
    return <div>세션 확인 중...</div>;
  }

  if (!isAuthenticated) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div>
      <h1>안녕하세요, {user?.nickname}님!</h1>
      <p>팀 ID: {user?.teamId}</p>
      <button onClick={refreshSession}>세션 새로고침</button>
    </div>
  );
}
```

## 🌐 API 통신

### 서비스 함수들

백엔드와의 통신을 담당하는 타입 안전한 서비스 함수들:

```typescript
// 회원가입
const authResponse = await signUp({
  email: 'user@example.com',
  nickname: '사용자',
  password: 'password123',
  passwordConfirmation: 'password123',
});

// 로그인
const authResponse = await signIn({
  email: 'user@example.com',
  password: 'password123',
});

// 토큰 갱신
const tokenResponse = await refreshToken({
  refreshToken: 'your-refresh-token',
});
```

### API 클라이언트 설정

```typescript
// apiClient는 자동으로 Authorization 헤더를 추가
const response = await apiClient
  .post('auth/signIn', { json: credentials })
  .json<AuthResponse>();
```

## 🚨 에러 처리

### 메시지 상수

```typescript
// 에러 메시지
export const ERROR_MESSAGES = {
  INVALID_INPUT: '입력 값이 유효하지 않습니다.',
  SIGN_UP_FAILED: '회원가입에 실패했습니다.',
  INVALID_CREDENTIALS: '이메일 또는 비밀번호가 올바르지 않습니다.',
  TOKEN_REFRESH_FAILED: '토큰 갱신에 실패했습니다. 다시 로그인해주세요.',
} as const;

// 성공 메시지
export const SUCCESS_MESSAGES = {
  SIGN_UP_SUCCESS: '회원가입이 완료되었습니다.',
  SIGN_IN_SUCCESS: '로그인되었습니다.',
} as const;
```

### 에러 핸들링 예시

```typescript
try {
  await signUpAction(null, formData);
} catch (error) {
  const errorMessage = handleApiError(error);
  console.error('회원가입 실패:', errorMessage);
}
```

## 🔧 커스터마이징

### 새로운 인증 프로바이더 추가

```typescript
// utils/providers.utils.ts에 추가
import Google from 'next-auth/providers/google';

export const authProviders = [
  credentialsProvider,
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
];
```

### 세션 데이터 확장

```typescript
// types/auth.d.ts에 타입 확장
declare module 'next-auth' {
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      nickname: string;
      teamId: string;
      email: string;
      image: string | null;
    };
  }
}
```

## 🧪 테스트 가이드

### 단위 테스트 예시

```typescript
// __tests__/auth.test.ts
import { signInSchema, signUpSchema } from '@/feature/auth';

describe('Auth Schema', () => {
  test('유효한 이메일 검증', () => {
    const result = signInSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  test('비밀번호 길이 검증', () => {
    const result = signUpSchema.safeParse({
      email: 'test@example.com',
      nickname: 'testuser',
      password: '123', // 너무 짧음
      passwordConfirmation: '123',
    });
    expect(result.success).toBe(false);
  });
});
```

## 🔍 디버깅

### 개발 환경 로깅

```typescript
// auth.config.ts
debug: process.env.NODE_ENV === 'development',
```

### 세션 상태 확인

```tsx
function DebugSession() {
  const session = useSession();

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
```

## 📚 참고 자료

- [NextAuth.js 공식 문서](https://authjs.dev/)
- [Next.js 15 문서](https://nextjs.org/docs)
- [Zod 유효성 검사](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)

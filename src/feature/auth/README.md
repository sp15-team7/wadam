# Auth Feature Module

이 모듈은 NextAuth.js를 기반으로 한 인증 시스템을 제공합니다. JWT 토큰 기반 인증과 자동 토큰 갱신 기능을 포함합니다.

## 📁 파일 구조

```
src/feature/auth/
├── actions/                 # Server Actions
│   └── auth.action.ts      # 회원가입 액션
├── constants/              # 상수 정의
│   └── auth.message.ts     # 에러/성공 메시지
├── hooks/                  # 커스텀 훅
│   └── useAuthSession.ts   # 세션 관리 훅
├── libs/                   # 핵심 라이브러리
│   ├── auth.config.ts      # NextAuth 설정
│   └── auth.ts            # NextAuth 인스턴스
├── schema/                 # Zod 스키마
│   └── auth.schema.ts      # 유효성 검사 스키마
├── services/              # API 서비스
│   └── auth.service.ts     # 인증 관련 API 호출
├── types/                 # 타입 정의
│   ├── auth.types.ts      # 인증 관련 타입
│   └── auth.d.ts          # NextAuth 타입 확장
├── utils/                 # 유틸리티 함수
│   ├── auth-callbacks.utils.ts  # JWT/Session 콜백
│   ├── auth-providers.utils.ts  # 인증 제공자
│   └── jwt.utils.ts            # JWT 관련 유틸리티
└── index.ts               # 모듈 진입점
```

## 🚀 주요 기능

### 1. 타입 안전성

- 완전한 TypeScript 지원
- NextAuth 타입 확장으로 커스텀 필드 지원
- Zod를 이용한 런타임 유효성 검사

### 2. 모듈화된 구조

- 관심사별로 분리된 파일 구조
- 재사용 가능한 유틸리티 함수
- 명확한 의존성 관리

### 3. 자동 토큰 관리

- JWT 토큰 자동 갱신
- 토큰 만료 감지 및 처리
- 에러 시 자동 로그아웃

### 4. 향상된 에러 처리

- 명확한 에러 메시지
- 타입 안전한 에러 상태 관리
- 사용자 친화적인 에러 처리

## 📖 사용법

### 기본 사용

```typescript
import { useAuthSession } from '@/feature/auth';

function MyComponent() {
  const {
    isAuthenticated,
    isLoading,
    user,
    errorMessage
  } = useAuthSession();

  if (isLoading) return <div>로딩 중...</div>;
  if (!isAuthenticated) return <div>로그인이 필요합니다.</div>;
  if (errorMessage) return <div>오류: {errorMessage}</div>;

  return <div>안녕하세요, {user.nickname}님!</div>;
}
```

### 서버 컴포넌트에서 세션 확인

```typescript
import { auth } from '@/feature/auth';

export default async function ServerComponent() {
  const session = await auth();

  if (!session?.user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return <div>서버에서 렌더링: {session.user.nickname}</div>;
}
```

### API 라우트에서 인증 확인

```typescript
import { auth } from '@/feature/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return Response.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  return Response.json({ user: session.user });
}
```

## 🔧 설정

### 환경 변수

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 미들웨어 설정

```typescript
// middleware.ts
import { authConfig } from '@/feature/auth';
import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // 인증 로직...
});
```

## 🔄 토큰 갱신 플로우

1. **토큰 만료 감지**: JWT 콜백에서 자동으로 토큰 만료 시간 확인
2. **자동 갱신 시도**: refreshToken을 사용하여 새로운 accessToken 요청
3. **에러 처리**: 갱신 실패 시 RefreshAccessTokenError 설정
4. **자동 로그아웃**: 클라이언트에서 에러 감지 시 자동 로그아웃 처리

## 🛡️ 보안 기능

- HTTP-Only 쿠키로 토큰 저장
- CSRF 보호
- 안전한 쿠키 설정 (production 환경에서 secure 플래그)
- 토큰 만료 시 자동 로그아웃

## 📝 확장 가능성

### OAuth 제공자 추가

```typescript
// utils/auth-providers.utils.ts
import Google from 'next-auth/providers/google';

export const authProviders = [
  credentialsProvider,
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
];
```

### 커스텀 콜백 추가

```typescript
// utils/auth-callbacks.utils.ts
export const signInCallback = async ({ user, account }) => {
  // 커스텀 로그인 로직
  return true;
};
```

## ⚠️ 주의사항

1. **RefreshToken 만료**: RefreshToken이 만료된 경우 사용자는 다시 로그인해야 합니다.
2. **환경 변수**: 모든 필수 환경 변수가 설정되어 있는지 확인하세요.
3. **HTTPS**: Production 환경에서는 반드시 HTTPS를 사용하세요.
4. **세션 시간**: 세션 만료 시간을 적절히 설정하세요.

## 🐛 트러블슈팅

### 토큰 갱신 실패

- 백엔드 API 상태 확인
- RefreshToken 유효성 확인
- 네트워크 연결 상태 확인

### 세션 정보 불일치

- 브라우저 쿠키 삭제 후 재로그인
- 세션 강제 갱신 (`refreshSession()` 호출)

### 타입 에러

- `auth.d.ts` 파일이 올바르게 import되는지 확인
- TypeScript 컴파일러 재시작

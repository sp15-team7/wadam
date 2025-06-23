# 🍷 WADAM - Wine Archive & Review Platform

**와인 아카이브 & 리뷰 플랫폼**

> "WHYNE" 중급 프로젝트 테마의 리브랜딩 버전으로, 와인의 따뜻한 빨간색을 보완하는 빈티지 베이지 컬러를 사용하여 사용자에게 따뜻한 와인 탐구 경험을 제공합니다.

![image](https://github.com/user-attachments/assets/1e03d866-549a-46ce-93ae-22be7ffc990f)


## 📋 목차

- [프로젝트 소개](#project-introduction)
- [팀 정보](#team-information)
- [주요 기능](#key-features)
- [기술 스택](#tech-stack)
- [프로젝트 구조](#project-structure)
- [API 문서](#api-documentation)
- [개발 가이드](#development-guide)


## 🍷 프로젝트 소개 <a id="project-introduction"></a>

WADAM은 와인 애호가들을 위한 포괄적인 와인 아카이브 및 리뷰 플랫폼입니다. 사용자는 다양한 와인을 탐색하고, 개인적인 와인 컬렉션을 관리하며, 상세한 테이스팅 노트와 리뷰를 작성할 수 있습니다.

### 🎯 프로젝트 목표

- **개인화된 와인 아카이브**: 사용자만의 와인 컬렉션 관리
- **상세한 테이스팅 노트**: 아로마, 맛, 바디감 등 세부적인 와인 특성 기록
- **커뮤니티 기반 리뷰**: 다른 사용자들과 와인 경험 공유
- **직관적인 검색 및 필터링**: 취향에 맞는 와인 쉽게 발견


## 👥 팀 정보 <a id="team-information"></a>

**CODEIT SPRINT FRONTEND PART3 TEAM7**


| [![GitHub Profile](https://github.com/justhighway.png?size=200)](https://github.com/justhighway) | [![GitHub Profile](https://github.com/ddumini.png?size=200)](https://github.com/ddumini) | [![GitHub Profile](https://github.com/Hyunbara.png?size=200)](https://github.com/Hyunbara) |
|---|---|---|
| 박재현 | 김수민 | 김영현 |

## ✨ 주요 기능 <a id="key-features"></a>

### 🔐 사용자 인증
- 이메일 기반 회원가입/로그인
- JWT 토큰 기반 세션 관리
- 카카오 소셜 로그인 지원

### 🍷 와인 관리
- **이 달의 추천 와인**: 이 달의 추천 와인 캐러셀
- **와인 등록**: 새로운 와인 정보 추가
- **와인 검색**: 이름, 지역, 타입별 검색
- **와인 필터링**: 가격, 평점, 타입별 필터링
- **와인 카드 정보**: 이름, 지역, 타입, 가격, 평점

### 📝 와인 상세 및 리뷰 시스템
- **상세 정보**: 당도, 산도, 바디감, 탄닌 정보 및 사용자들이 선택한 아로마 정보
- **평점 시스템**: 5점 만점 평균 별점 정보
- **아로마 태그**: 체리, 복숭아, 오크 등 다양한 아로마 복수 선택
- **테이스팅 노트**: 당도, 산도, 바디감, 탄닌에 대한 슬라이더
- **리뷰 수정/삭제**: 자신의 리뷰 관리

### 👤 마이페이지
- **개인 와인 컬렉션**: 내가 등록한 와인 목록 및 수정, 삭제
- **리뷰 기록**: 작성한 리뷰 내역 목록 및 수정, 삭제
- **프로필 관리**: 닉네임, 프로필 이미지 변경

### 📊 데이터 시각화
- **와인 특성 차트**: 슬라이더 차트로 와인 특성 시각화
- **평점 분포**: 와인별 평점 통계
- **월별 추천 와인**: 이달의 추천 와인 섹션

## 🛠 기술 스택 <a id="tech-stack"></a>

### Frontend
- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Radix UI, Shadcn/ui
- **State Management**: Zustand 5.x
- **Data Fetching**: TanStack Query 5.x
- **Forms**: React Hook Form + Zod
- **Animation**: Framer Motion (motion)
- **Icons**: Lucide React

### Backend & Authentication
- **Authentication**: NextAuth.js 5.0 (Beta)
- **API Client**: Ky (HTTP client)
- **Token Management**: JWT Decode

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint 9.x
- **Formatting**: Prettier 3.x
- **Git Hooks**: Husky + lint-staged
- **Commit Convention**: Commitlint

### Build & Deployment
- **Build Tool**: Turbopack (Next.js)
- **Node Version**: 22.16.0+
- **Environment**: Volta

## 📁 프로젝트 구조 <a id="project-structure"></a>
```
wadam/
├── public/ # 정적 자산
│ ├── fonts/ # 폰트 파일
│ ├── icons/ # 아이콘 이미지
│ ├── images/ # 이미지 자산
│ └── logos/ # 로고 파일
├── src/
│ ├── app/ # Next.js App Router
│ │ ├── (entry)/ # 인증 페이지 그룹
│ │ ├── (main)/ # 메인 페이지 그룹
│ │ └── api/ # API 라우트
│ ├── feature/ # 기능별 모듈
│ │ ├── auth/ # 인증 관리
│ │ ├── wines/ # 와인 관리
│ │ ├── reviews/ # 리뷰 시스템
│ │ ├── myprofile/ # 마이페이지
│ │ └── landing/ # 랜딩 페이지
│ ├── shared/ # 공통 컴포넌트 & 유틸
│ │ ├── components/ # 재사용 가능한 컴포넌트
│ │ ├── hooks/ # 커스텀 훅
│ │ ├── stores/ # 전역 상태 관리
│ │ └── utils/ # 유틸리티 함수
│ └── middleware.ts # Next.js 미들웨어
├── components.json # Shadcn/ui 설정
├── next.config.ts # Next.js 설정
├── tailwind.config.ts # Tailwind CSS 설정
└── tsconfig.json # TypeScript 설정
```

### 주요 디렉토리 설명

- **`src/feature/`**: 기능별로 모듈화된 코드 구조
  - 각 기능은 독립적인 components, hooks, services, types 등을 포함
  - 기능별 응집도를 높이고 의존성을 최소화
- **`src/shared/`**: 여러 기능에서 공유되는 코드
  - 재사용 가능한 UI 컴포넌트
  - 공통 유틸리티 함수 및 훅
- **`src/app/`**: Next.js App Router 기반 라우팅
  - 그룹 라우팅을 통한 레이아웃 분리

## 🔌 API 문서 <a id="api-documentation"></a>

### 주요 엔드포인트

#### 인증 관련
```typescript
`POST /api/auth/signin`      # 로그인
`POST /api/auth/signup`      # 회원가입
`POST /api/auth/refresh`     # 토큰 갱신
```

#### 와인 관리
```typescript
GET    /api/wines          # 와인 목록 조회
POST   /api/wines          # 와인 등록
GET    /api/wines/:id      # 와인 상세 조회
PUT    /api/wines/:id      # 와인 정보 수정
DELETE /api/wines/:id      # 와인 삭제
```

#### 리뷰 시스템
```typescript
GET    /api/reviews        # 리뷰 목록 조회
POST   /api/reviews        # 리뷰 작성
PUT    /api/reviews/:id    # 리뷰 수정
DELETE /api/reviews/:id    # 리뷰 삭제
```

## 🎨 개발 가이드 <a id="development-guide"></a>

### 코딩 컨벤션

- **컴포넌트**: PascalCase 사용
- **파일명**: kebab-case 사용
- **디렉토리**: kebab-case 사용
- **변수/함수**: camelCase 사용
- **상수**: UPPER_SNAKE_CASE 사용

### 스타일링 가이드

- **Tailwind CSS**: 유틸리티 클래스 우선 사용
- **반응형 디자인**: Mobile-first 접근법
- **색상 시스템**: 커스텀 색상 팔레트 사용
- **타이포그래피**: Pretendard 폰트 사용

### 상태 관리

- **로컬 상태**: React useState/useReducer
- **전역 상태**: Zustand
- **서버 상태**: TanStack Query
- **폼 상태**: React Hook Form

## 🎯 성능 최적화

### 구현된 최적화 기법

- **코드 분할**: 동적 import 사용
- **이미지 최적화**: Next.js Image 컴포넌트 + WebP 포맷
- **지연 로딩**: Intersection Observer API
- **무한 스크롤**: TanStack Query Infinite Queries
- **메모이제이션**: React.memo, useMemo, useCallback

### 성능 모니터링

- **Lighthouse**: 웹 성능 측정
- **Bundle Analyzer**: 번들 크기 분석
- **React DevTools**: 컴포넌트 성능 프로파일링

## 📱 반응형 디자인

### 브레이크포인트

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

### 반응형 구현

- **Tailwind CSS**: 반응형 유틸리티 클래스
- **Flexible Grid**: CSS Grid + Flexbox
- **Adaptive Images**: 디바이스별 최적화된 이미지

## 🔒 보안

### 보안 조치

- **JWT 토큰**: 안전한 인증 시스템
- **입력 검증**: Zod 스키마 검증
- **XSS 방지**: 입력 데이터 새니타이제이션
- **CSRF 방지**: NextAuth.js 내장 보안

### 환경 변수 관리

- **비밀 키**: .env.local 파일 관리
- **API 키**: 서버 사이드에서만 사용
- **공개 변수**: NEXT_PUBLIC_ 접두사 사용

## 🚀 배포

### 배포 환경: Vercel

- **배포 주소**: https://wadam.vercel.app/

## 🤝 팀 컨벤션

### 개발 워크플로우

1. **Fork** 저장소
2. **Feature Branch** 생성 (`git checkout -b feature/new-feature`)
3. **Commit** 변경사항 (`git commit -m 'feat: add new feature'`)
4. **Push** 브랜치 (`git push origin feature/new-feature`)
5. **Pull Request** 생성

### 커밋 컨벤션

- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 포맷팅
- refactor: 코드 리팩토링
- test: 테스트 추가
- chore: 빌드 프로세스 또는 보조 도구 변경


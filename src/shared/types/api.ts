// --- 공통 에러 응답 형식 ---
export interface ErrorResponse {
  message: string;
}

export interface ValidationErrorDetail {
  constraints: string;
  property: string;
}

export interface ValidationErrorResponse extends ErrorResponse {
  errors?: ValidationErrorDetail[];
}

// --- 와인 관련 타입 ---
export type WineType = 'RED' | 'WHITE' | 'SPARKLING' | 'ROSE' | 'ETC';

// 와인 생성 요청 Body
export interface CreateWineRequestBody {
  name: string;
  region: string;
  image: string;
  price: number;
  type: WineType;
  alcohol: number;
  sweetness: number;
  acidity: number;
  body: number;
  tannin: number;
  aroma: string[];
}

// 사용자 상세 정보 (리뷰 등에서 사용)
export interface UserDetail {
  id: number;
  nickname: string;
  image: string;
}

// 최근 리뷰 정보 (WineDetail에 포함)
export interface RecentReview {
  user: UserDetail;
  updatedAt: string;
  createdAt: string;
  content: string;
  aroma: string[];
  rating: number;
  id: number;
}

// 와인 상세 정보 응답 Body
export interface WineDetail {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: WineType;
  avgRating: number;
  reviewCount: number;
  recentReview: RecentReview | null;
  userId: number;
  alcohol: number;
  sweetness: number;
  acidity: number;
  body: number;
  tannin: number;
  aroma: string[];
  reviews?: ReviewDetail[]; // 와인 상세 조회 시 포함될 수 있는 리뷰 목록
  avgRatings?: Record<WineType, number>; // 와인 타입별 평균 점수
}

// 리뷰 상세 정보 (ReviewDetail[]에 사용)
export interface ReviewDetail {
  id: number;
  content: string;
  rating: number;
  aroma: string[];
  createdAt: string;
  updatedAt: string;
  user: UserDetail;
  wineId: number;
}

// --- 인증 관련 타입 ---
// 회원가입 요청 Body
export interface SignUpRequestBody {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string; // Zod 스키마에서만
}

// 로그인 요청 Body
export interface SignInRequestBody {
  email: string;
  password: string;
}

// 인증된 사용자 정보
export interface AuthUser {
  id: number;
  email: string;
  nickname: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
}

// 인증 응답 (회원가입, 로그인)
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

// --- 기타 필요한 타입 (예: 페이지네이션 응답) ---
export interface PagedResponse<T> {
  contents: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
  isFirst: boolean;
}

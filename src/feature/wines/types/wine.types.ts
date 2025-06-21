// 와인 타입 정의
export type WineType = 'RED' | 'WHITE' | 'SPARKLING';

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

// 사용자 상세 정보 (리뷰 등에서 사용될 수 있으므로 일단 여기에 포함)
export interface UserDetail {
  id: number;
  nickname: string;
  image: string;
}

// 최근 리뷰 정보 (WineDetail에 포함)
export interface RecentReview {
  user: UserDetail;
  updatedAt: string; // ISO 8601 Date String
  createdAt: string; // ISO 8601 Date String
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
  avgRatings?: Record<WineType, number>; // 와인 타입별 평균 점수 (Swagger에는 없지만 필요시 사용)
}

// 리뷰 상세 정보 (ReviewDetail[]에 사용)
export interface ReviewDetail {
  id: number;
  content: string;
  rating: number;
  aroma: string[];
  createdAt: string; // ISO 8601 Date String
  updatedAt: string; // ISO 8601 Date String
  user: UserDetail;
  wineId: number;
}

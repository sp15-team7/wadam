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
  reviews?: ReviewDetail[];
  avgRatings?: Record<WineType, number>;
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

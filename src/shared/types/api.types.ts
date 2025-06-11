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

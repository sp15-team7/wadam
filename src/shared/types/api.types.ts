/**
 * API 응답의 기본 구조를 정의하는 인터페이스
 * @description 모든 API 응답이 따라야 하는 공통 형태
 */
export interface ApiResponse<T = unknown> {
  /** 응답 데이터 */
  data?: T;
  /** 에러 메시지 */
  message?: string;
  /** HTTP 상태 코드 */
  status?: number;
  /** 성공 여부 */
  success?: boolean;
}

/**
 * API 에러의 상세 정보를 담는 인터페이스
 * @description 에러 핸들링 시 사용되는 구조화된 에러 정보
 */
export interface ApiErrorDetails {
  /** 에러 코드 */
  code?: string;
  /** 사용자에게 표시할 메시지 */
  message: string;
  /** 개발자용 상세 메시지 */
  details?: string;
  /** HTTP 상태 코드 */
  status?: number;
}

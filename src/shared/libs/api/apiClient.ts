import ky from 'ky';
import { toast } from 'sonner';
import { z } from 'zod';

import { authResponseSchema } from '@/feature/auth/schema/auth.schema';
import {
  ErrorResponse,
  ValidationErrorResponse,
} from '@/shared/types/api.types';

// --- 💡 커스텀 HTTP 에러 클래스 정의 (HttpError) ---
export class HttpError extends Error {
  statusCode: number;
  responseBody?: ErrorResponse | ValidationErrorResponse; // API 응답 본문 포함

  constructor(
    message: string,
    statusCode: number,
    responseBody?: ErrorResponse | ValidationErrorResponse,
  ) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.responseBody = responseBody;

    // TypeScript에서 instanceof 작동을 위해 프로토타입 체인 수정
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
/**
 * API 클라이언트 인스턴스
 *
 * @description
 * - `ky`는 fetch 기반의 경량 HTTP 클라이언트 라이브러리입니다.
 * - 본 인스턴스는 **모든 요청에 공통 설정**을 적용하며, 주로 클라이언트 컴포넌트에서 API 요청 시 사용합니다.
 * - 인증 토큰은 **HTTP-Only 쿠키**로 전달되므로, `credentials: 'include'` 옵션이 필수입니다.
 * - 서버가 응답한 JSON 에러 메시지를 클라이언트에 **직관적인 형태로 전달**하기 위해 `beforeError` 훅을 사용합니다.
 */
export const apiClient = ky.create({
  /**
   * API 요청의 기본 URL 경로
   * 환경 변수에서 가져오며, 접두사로 모든 요청에 자동으로 붙습니다.
   */
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  throwHttpErrors: false, // Ky가 4xx/5xx 응답 시 자동으로 에러를 throw하지 않도록

  /**
   * 기본 요청 헤더 설정
   * 모든 요청에서 Content-Type을 JSON으로 명시
   */
  headers: {
    'Content-Type': 'application/json',
  },

  /**
   * 쿠키 기반 인증을 위한 설정
   * - 브라우저가 cross-origin 요청에서도 인증 쿠키를 자동 포함하도록 함
   * - 서버에서 accessToken/refreshToken을 HTTP-Only 쿠키로 전달하는 구조에서 필수
   */
  credentials: 'include',

  /**
   * 에러 응답 전처리 훅
   * - ky는 네트워크 오류나 HTTP 상태 코드 400 이상일 때 예외를 throw함
   * - 이 훅은 그런 예외를 커스터마이징하여 클라이언트에 더 유용한 메시지를 전달
   */

  hooks: {
    beforeRequest: [],
    afterResponse: [
      async (request, _, response) => {
        // HTTP 응답 상태 코드가 2xx (성공) 범위가 아닌 경우 (4xx, 5xx 에러)
        if (!response.ok) {
          let errorBody: unknown;
          let parsedErrorResponse:
            | ErrorResponse
            | ValidationErrorResponse
            | undefined;

          try {
            // 응답 본문을 JSON으로 파싱 시도 (API 에러 응답은 대부분 JSON 형태)
            errorBody = await response.json();
            // errorBody가 예상 타입과 일치하는지 런타임 유효성 검사를 추가
            if (typeof errorBody === 'object' && errorBody !== null) {
              parsedErrorResponse = errorBody as
                | ErrorResponse
                | ValidationErrorResponse;
            }
          } catch {
            // JSON 파싱 실패 (예: HTML 응답, 빈 응답, 네트워크 에러 등)
            parsedErrorResponse = {
              message: `알 수 없는 오류가 발생했습니다. (상태 코드: ${response.status})`,
            };
            // console.error("API 에러 응답 파싱 오류:", _e); // 디버깅용
          }

          let displayMessage =
            parsedErrorResponse?.message || // 파싱된 에러 응답에서 메시지가 있으면 사용
            `API 요청 실패 (상태 코드: ${response.status})`; // 폴백 메시지

          // --- 💡 HTTP 상태 코드별 상세 메시지 구성 및 처리 분기 ---

          // 400 Bad Request (유효성 검사 오류 포함)
          if (response.status === 400) {
            // parsedErrorResponse가 ValidationErrorResponse인지 확인하는 타입 가드
            const isValidationError = (
              res: unknown,
            ): res is ValidationErrorResponse =>
              typeof res === 'object' &&
              res !== null &&
              'errors' in res &&
              Array.isArray((res as ValidationErrorResponse).errors);

            if (isValidationError(parsedErrorResponse)) {
              // 타입 가드를 사용합니다.
              // 상세 오류가 있는 유효성 검사 오류인 경우 (예: Zod 또는 class-validator)
              const validationErrors = parsedErrorResponse
                .errors!.map((err) =>
                  err.constraints
                    ? Object.values(err.constraints).join(', ')
                    : err.property,
                )
                .filter(Boolean)
                .join('; ');
              displayMessage = `입력 값 오류: ${validationErrors || parsedErrorResponse.message || '요청 값이 올바르지 않습니다.'}`;
            } else {
              displayMessage =
                parsedErrorResponse?.message ||
                '잘못된 요청입니다. 입력 값을 확인해주세요.';
            }
            toast.error(displayMessage);
            // 400 에러는 주로 입력값 문제이므로, HttpError를 throw하여 추가 처리(예: error.tsx에서 캐치)가 가능하도록 함.
            throw new HttpError(
              displayMessage,
              response.status,
              parsedErrorResponse,
            );
          }
          // 401 Unauthorized (인증 필요/만료)
          else if (response.status === 401) {
            displayMessage =
              parsedErrorResponse?.message ||
              '인증이 필요합니다. 다시 로그인해주세요.';
            toast.error(displayMessage); // 사용자에게 토스트 알림 표시
            // TODO: 여기에 토큰 새로고침 로직 또는 로그인 페이지 리다이렉션 로직 추가 (예: router.push('/signin'))
            throw new HttpError(
              displayMessage,
              response.status,
              parsedErrorResponse,
            );
          }
          // 403 Forbidden (권한 없음)
          else if (response.status === 403) {
            displayMessage =
              parsedErrorResponse?.message || '이 작업에 대한 권한이 없습니다.';
            toast.error(displayMessage);
            throw new HttpError(
              displayMessage,
              response.status,
              parsedErrorResponse,
            );
          }
          // 404 Not Found (API 리소스 기준 404)
          else if (response.status === 404) {
            displayMessage =
              parsedErrorResponse?.message ||
              '요청한 데이터를 찾을 수 없습니다.';
            toast.error(displayMessage);
            throw new HttpError(
              displayMessage,
              response.status,
              parsedErrorResponse,
            );
          }
          // 5xx Server Errors (서버 측 오류) 및 기타 예상치 못한 치명적인 에러
          else if (response.status >= 500 && response.status < 600) {
            displayMessage =
              '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
            toast.error(displayMessage);
            throw new HttpError(
              displayMessage,
              response.status,
              parsedErrorResponse,
            ); // 반드시 에러 페이지로 이동해야 함.
          }
          // 기타 예상치 못한 에러 (네트워크 에러, 알 수 없는 상태 코드 등)
          else {
            displayMessage = `API 요청 중 예상치 못한 오류 발생: ${response.status} ${response.statusText || ''}`;
            toast.error(displayMessage);
            throw new HttpError(
              displayMessage,
              response.status,
              parsedErrorResponse,
            );
          }
        }

        // --- 💡 응답이 성공적일 경우 (2xx), 여기서 Zod로 응답 데이터 유효성 검사 가능 ---
        // Ky는 응답 스트림을 한 번 읽으면 소모되므로, Zod 검사를 위해 clone()을 사용.
        const clonedResponse = response.clone();
        let _data: unknown;

        try {
          _data = await clonedResponse.json();
          if (
            request.url.includes('/auth/signin') ||
            request.url.includes('/auth/signup')
          ) {
            authResponseSchema.parse(_data); // 로그인/회원가입 응답 스키마 검증
          }
        } catch (_e: unknown) {
          // JSON 파싱 실패 또는 Zod 유효성 검사 실패 (특정 엔드포인트에만 적용)
          console.error('API 응답 파싱 또는 Zod 유효성 검사 오류:', _e);

          let errorMessage =
            '서버 응답 형식이 올바르지 않거나 내부 스키마와 불일치합니다.';
          // ZodError는 일반 Error의 하위 클래스가 아니므로 instanceof z.ZodError를 사용하여 정확히 체크하는 것이 좋습니다.
          // 💡 여기에 `import { z } from 'zod';` 가 필요합니다! (최상단에 추가해주세요)
          if (_e instanceof z.ZodError) {
            errorMessage = `응답 데이터 형식이 올바르지 않습니다. (스키마 불일치: ${_e.errors[0]?.message || '상세 오류 없음'})`;
          } else if (_e instanceof TypeError) {
            // JSON 파싱 실패는 TypeError일 수 있음
            errorMessage = '서버 응답 형식 오류: JSON 파싱 실패';
          }

          toast.error(errorMessage);
          throw new HttpError(errorMessage, response.status || 500, {
            message: errorMessage,
          });
        }
        // 성공적인 응답은 다음 체인으로 전달.
        return response;
      },
    ],
  },
});

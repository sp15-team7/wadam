import ky from 'ky';
import { toast } from 'sonner'; // sonner 토스트 함수 임포트
import { ValidationErrorResponse, ErrorResponse } from '@/shared/types/api';
import { authResponseSchema } from '@/shared/schemas/authSchema';

// --- 💡 커스텀 HTTP 에러 클래스 정의 (HttpError) ---
export class HttpError extends Error {
  statusCode: number;
  responseBody?: ErrorResponse | ValidationErrorResponse; // API 응답 본문 포함

  constructor(message: string, statusCode: number, responseBody?: any) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.responseBody = responseBody;

    // TypeScript에서 instanceof 작동을 위해 프로토타입 체인 수정
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

const apiClient = ky.create({
  prefixUrl: 'http://localhost:3000/api',
  throwHttpErrors: false,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // 모든 요청 전에 실행될 로직
        const token = localStorage.getItem('accessToken');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
        return request;
      },
    ],
    afterResponse: [
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      async (request, options, response) => {
        if (!response.ok) {
          // 💡 HTTP 상태 코드가 2xx가 아닌 경우 (4xx, 5xx 에러)
          let errorBody: ErrorResponse | ValidationErrorResponse | any;
          try {
            // 응답 본문을 JSON으로 파싱 (API 에러 응답 DTO 형태)
            errorBody = await response.json();
          } catch (e) {
            // JSON 파싱 실패 시 (예: HTML 응답, 빈 응답)
            errorBody = {
              message: `알 수 없는 오류가 발생했습니다. (상태 코드: ${response.status})`,
            };
          }

          let displayMessage =
            errorBody.message ||
            `API 요청 실패 (상태 코드: ${response.status})`;

          // --- 💡 HTTP 상태 코드별 상세 처리 ---
          if (
            response.status === 400 &&
            'errors' in errorBody &&
            Array.isArray(errorBody.errors)
          ) {
            // 400 Bad Request이면서 상세 유효성 검사 오류 (ValidationErrorResponse)
            const validationErrors = errorBody.errors
              .map((err: any) => err.constraints || err.property)
              .join(', ');
            displayMessage = `입력값 오류: ${validationErrors || errorBody.message || '요청 값이 올바르지 않습니다.'}`;
            // Zod validation feedback과 연동하여 폼 필드별 메시지를 표시할 수도 있음.
          } else if (response.status === 401) {
            // 401 Unauthorized (인증 필요/만료)
            displayMessage = '인증이 필요합니다. 다시 로그인해주세요.';
            // 토큰 새로고침 로직이 있다면 여기서 시도 후 실패 시 리다이렉트
          } else if (response.status === 403) {
            // 403 Forbidden (권한 없음)
            displayMessage = '이 작업에 대한 권한이 없습니다.';
          } else if (response.status === 404) {
            // 404 Not Found (리소스 기준 - 경로 404는 Next.js not-found.tsx가 처리)
            displayMessage =
              errorBody.message || '요청한 데이터를 찾을 수 없습니다.';
          } else if (response.status >= 500) {
            // 5xx Server Errors (서버 측 오류)
            displayMessage =
              '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
          }

          // --- 💡 sonner를 사용하여 사용자에게 즉각적인 알림 표시 ---
          toast.error(displayMessage);

          // --- 💡 HttpError를 throw하여 상위 Error Boundary (error.tsx)가 잡도록 함 ---
          // throw된 에러는 해당 API를 호출한 컴포넌트의 상위 error.tsx로 전달됩니다.
          throw new HttpError(displayMessage, response.status, errorBody);
        }
        // 💡 응답이 성공적일 경우 (2xx), 여기서 Zod로 응답 데이터 유효성 검사 가능
        const data = await response.json();
        authResponseSchema.parse(data);
      },
    ],
    beforeError: [],
  },
});

const get = (path: string) => {
  return apiClient.get(path).json();
};

const post = (path: string, body: any) => {
  return apiClient.post(path, { json: body }).json();
};

const put = (path: string, body: any) => {
  return apiClient.put(path, { json: body }).json();
};

const del = (path: string) => {
  return apiClient.delete(path).json();
};

const patch = (path: string, body: any) => {
  return apiClient.patch(path, { json: body }).json();
};

export { get, post, put, del, patch };

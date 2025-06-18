import ky from 'ky';

/**
 * API 클라이언트 인스턴스
 *
 * @description
 * - `ky`는 fetch 기반의 경량 HTTP 클라이언트 라이브러리입니다.
 * - 본 인스턴스는 모든 API 요청에 사용됩니다.
 * - 인증이 필요한 요청에는 자동으로 Authorization 헤더를 추가하며,
 *   특정 경로(로그인, 회원가입, 토큰 갱신)는 헤더 추가 로직에서 제외됩니다.
 * - 서버가 응답한 JSON 에러 메시지를 클라이언트에 직관적인 형태로 전달합니다.
 */
export const apiClient = ky.create({
  /**
   * API 요청의 기본 URL 경로
   * 환경 변수에서 가져오며, 접두사로 모든 요청에 자동으로 붙습니다.
   */
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,

  /**
   * 기본 요청 헤더 설정
   * 모든 요청에서 Content-Type을 JSON으로 명시
   */
  headers: {
    'Content-Type': 'application/json',
  },

  /**
   * 요청 전처리 및 에러 처리 훅
   */
  hooks: {
    beforeRequest: [
      (request) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('accessToken');
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
          }
        }
      },
    ],
    beforeError: [
      /**
       * @param error - ky 내부에서 발생한 HTTP 에러 객체
       * @returns Error - 수정된 에러 객체 반환
       */
      async (error) => {
        const { response } = error;

        // 서버 응답 본문이 JSON 형태일 경우, { message: '...' }를 추출하여 에러 메시지로 설정
        try {
          const data = (await response?.json()) as { message?: string };

          if (data?.message) {
            error.name = 'APIError'; // 에러 분류 명확히 설정
            error.message = data.message; // 사용자에게 보여줄 메시지로 덮어쓰기
          }
        } catch {
          // JSON 파싱 실패 또는 메시지 없음: 기본 HTTP 상태 메시지 사용
          if (response) {
            error.name = 'APIError';
            error.message = `${response.status} ${response.statusText}`;
          }
        }

        return error;
      },
    ],
  },
});

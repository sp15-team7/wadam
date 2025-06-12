import ky from 'ky';
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

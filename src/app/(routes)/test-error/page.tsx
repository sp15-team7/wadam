// src/app/(main)/test-error/page.tsx
'use client';

import ky, { HTTPError } from 'ky'; // ky와 HTTPError를 임포트합니다.
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { HttpError as CustomHttpError } from '@/shared/libs/api/apiClient'; // 커스텀 HttpError 임포트

export default function TestErrorPage() {
  const [shouldThrowRenderingError, setShouldThrowRenderingError] =
    useState(false);
  // API 에러 시뮬레이션을 위해 렌더링 단계에서 throw할 에러 객체를 저장합니다.
  const [simulatedApiErrorToThrow, setSimulatedApiErrorToThrow] =
    useState<Error | null>(null);

  // 이 함수는 렌더링 도중 호출될 수 있도록 useState와 연동합니다.
  if (shouldThrowRenderingError) {
    // 렌더링 단계에서 직접 에러를 던집니다.
    throw new Error(
      '이것은 렌더링 과정에서 발생한 강제 에러입니다. (error.tsx로 이동)',
    );
  }

  // 시뮬레이션된 API 에러를 렌더링 단계에서 던지도록 유도합니다.
  if (simulatedApiErrorToThrow) {
    throw simulatedApiErrorToThrow;
  }

  // API 에러를 시뮬레이션하고 HttpError를 throw 합니다.
  // 이 또한 error.tsx가 잡도록 외부로 전파되도록 구성합니다.
  // 이 함수는 이벤트 핸들러에서 호출되어 상태를 변경하고, 다음 렌더링 사이클에서 에러가 throw됩니다.
  const triggerSimulatedApiError = (statusCode: number, message: string) => {
    // 실제 API 호출이 아니므로 apiClient의 인터셉터는 작동하지 않습니다.
    // 하지만 error.tsx가 HttpError를 잡는 시나리오를 시뮬레이션하기 위해
    // CustomHttpError 인스턴스를 직접 생성하여 던집니다.
    const mockResponse = {
      status: statusCode,
      json: async () => ({ message: message, statusCode: statusCode }),
      text: async () =>
        JSON.stringify({ message: message, statusCode: statusCode }),
    };
    const error = new CustomHttpError(message, statusCode, {
      message: message,
    });

    // HTTPError와 유사하게 response 속성을 추가 (error.tsx에서 활용하기 위해)
    // 실제 ky의 HTTPError는 이 속성을 자동으로 가집니다.
    Object.defineProperty(error, 'response', {
      value: mockResponse,
      writable: true,
      configurable: true,
    });

    setSimulatedApiErrorToThrow(error); // 상태를 변경하여 렌더링 단계에서 에러가 던져지도록 합니다.
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>에러 테스트 페이지</h1>
      <p>강제로 에러를 발생시켜 error.tsx 동작을 확인합니다.</p>

      {/* 렌더링 에러 발생 버튼 */}
      <Button
        onClick={() => setShouldThrowRenderingError(true)}
        style={{ margin: '10px', padding: '10px', backgroundColor: 'salmon' }}
      >
        일반 렌더링 에러 발생 (error.tsx로 이동)
      </Button>

      {/* 시뮬레이션된 API 에러 발생 버튼 (500 에러) */}
      <Button
        onClick={() =>
          triggerSimulatedApiError(
            500,
            '서버에 문제가 발생했습니다. (시뮬레이션)',
          )
        }
        style={{ margin: '10px', padding: '10px', backgroundColor: 'purple' }}
      >
        API 500 에러 시뮬레이션 (error.tsx로 이동)
      </Button>

      {/* API 호출을 통한 실제 에러 발생 버튼 (500 Internal Server Error) */}
      <Button
        onClick={async () => {
          try {
            // 이 경로는 실제 API 서버에서 500 응답을 주도록 설정되어 있어야 합니다.
            // (예: Next.js API Routes 또는 별도 백엔드 서버)
            await ky.get('/api/simulate-500').json(); // ky를 사용한 실제 API 호출
            toast.success('API 500 호출 성공 (예상치 못한 성공)'); // 500인데 성공하면 이상하므로 이 토스트는 뜨지 않을 것입니다.
          } catch (error: unknown) {
            // <-- 'any'를 'unknown'으로 변경
            console.error('API 500 호출 에러:', error);

            let displayMessage = '알 수 없는 오류가 발생했습니다.';

            // ky의 HTTPError 타입이거나 커스텀 HttpError인지 확인
            if (
              error instanceof HTTPError ||
              error instanceof CustomHttpError
            ) {
              const statusCode =
                error instanceof HTTPError
                  ? error.response.status
                  : (error as CustomHttpError).statusCode;
              displayMessage = `API 호출 실패: HTTP ${statusCode} 오류`;

              try {
                const errorData = await (error instanceof HTTPError
                  ? error.response.json()
                  : (error as CustomHttpError).responseBody);
                if (errorData && errorData.message) {
                  displayMessage = `API 호출 실패: ${errorData.message} (코드: ${statusCode})`;
                }
              } catch (parseError) {
                console.warn('HTTP 에러 응답 JSON 파싱 실패:', parseError);
              }
            } else if (error instanceof Error) {
              // 일반 Error 객체인 경우
              displayMessage = `API 호출 실패: ${error.message}`;
            }

            // 여기서 에러를 다시 throw하여 Next.js의 error.tsx로 전달합니다.
            // 5xx 에러는 전역 에러 페이지로 이동하는 것이 일반적입니다.
            throw new Error(displayMessage); // error.tsx가 잡도록 에러를 다시 던집니다.
          }
        }}
        style={{ margin: '10px', padding: '10px', backgroundColor: 'darkred' }}
      >
        실제 API 500 호출 (error.tsx로 이동)
      </Button>

      {/* API 호출을 통한 실제 에러 발생 버튼 (400 Bad Request) */}
      <Button
        onClick={async () => {
          try {
            // 이 경로는 실제 API 서버에서 400 응답을 주도록 설정되어 있어야 합니다.
            await ky
              .post('/api/simulate-400', { json: { invalid_data: 'test' } })
              .json(); // ky를 사용한 실제 API 호출
            toast.success('API 400 호출 성공 (예상치 못한 성공)');
          } catch (error: unknown) {
            // <-- 'any'를 'unknown'으로 변경
            console.error('API 400 호출 에러:', error);

            let displayMessage = '요청에 문제가 발생했습니다.';

            if (
              error instanceof HTTPError ||
              error instanceof CustomHttpError
            ) {
              const statusCode =
                error instanceof HTTPError
                  ? error.response.status
                  : (error as CustomHttpError).statusCode;
              displayMessage = `API 호출 실패: HTTP ${statusCode} 오류`;

              try {
                const errorData = await (error instanceof HTTPError
                  ? error.response.json()
                  : (error as CustomHttpError).responseBody);
                if (errorData && errorData.message) {
                  displayMessage = `API 호출 실패: ${errorData.message} (코드: ${statusCode})`;
                }
              } catch (parseError) {
                console.warn('HTTP 에러 응답 JSON 파싱 실패:', parseError);
              }
            } else if (error instanceof Error) {
              displayMessage = `API 호출 실패: ${error.message}`;
            }

            // 4xx 에러는 보통 전역 에러 페이지로 이동하기보다는
            // 사용자에게 피드백(toast)을 주고 현재 페이지에 머무는 것이 일반적입니다.
            // 따라서 여기서는 error.tsx로 throw하지 않고 toast만 띄웁니다.
            toast.error(displayMessage);
          }
        }}
        style={{ margin: '10px', padding: '10px', backgroundColor: 'orange' }}
      >
        실제 API 400 호출 (Sonner 토스트만)
      </Button>

      <Button
        onClick={() => toast.success('테스트 성공 알림!')}
        style={{
          margin: '10px',
          padding: '10px',
          backgroundColor: 'lightgreen',
        }}
      >
        Sonner 성공 알림 테스트
      </Button>
    </div>
  );
}

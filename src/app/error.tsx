'use client'; // 클라이언트 컴포넌트임을 명시

import { useEffect } from 'react';

import { HttpError } from '@/shared/libs/api/apiClient';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // 개발자 콘솔에 에러 상세 로그 출력
    console.error('클라이언트 측 에러 발생:', error);

    // HttpError 인스턴스인지 확인
    if (error instanceof HttpError) {
      console.error(`HTTP 에러 발생 (상태 코드: ${error.statusCode})`);
    }
  }, [error]);

  // 에러 메시지를 사용자에게 친화적으로 표시
  let displayMessage = '알 수 없는 오류가 발생했습니다.';
  if (error instanceof HttpError) {
    // HttpError라면 해당 에러의 메시지를 사용
    displayMessage = error.message;
  } else if (error.message) {
    // 일반 Error라면 해당 에러의 메시지를 사용
    displayMessage = error.message;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #f5c6cb',
      }}
    >
      <h2 style={{ fontSize: '2em', marginBottom: '15px' }}>
        😟 앗! 문제가 발생했어요
      </h2>
      <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
        죄송합니다. 페이지를 불러오거나 작업하는 데 문제가 생겼습니다.
      </p>
      <p style={{ fontSize: '1em', color: '#a03b44', marginBottom: '30px' }}>
        상세: {displayMessage}
      </p>

      <button
        onClick={
          // 에러 상태를 리셋하여 해당 라우트 세그먼트를 다시 렌더링 시도
          () => reset()
        }
        style={{
          marginTop: '25px',
          padding: '12px 25px',
          fontSize: '1em',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          transition: 'background-color 0.3s ease',
        }}
      >
        다시 시도하기
      </button>
    </div>
  );
};

export default Error;

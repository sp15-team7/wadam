'use client';

import { useEffect } from 'react';

import { Button } from '@/shared/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // 개발자 콘솔에 에러 상세 로그 출력
    console.error('클라이언트 측 에러 발생:', error);

    // HttpError 인스턴스인지 확인
    if (error.name === 'APIError') {
      console.error(`API 에러 발생: ${error.message}`);
    }
  }, [error]); // error 객체가 변경될 때마다 훅이 다시 실행.

  let displayMessage = '알 수 없는 오류가 발생했습니다.';
  if (error.name === 'APIError') {
    displayMessage = error.message;
  }
  // 일반 Error 인스턴스인 경우 (런타임 에러), 해당 Error의 메시지를 사용.
  else if (error.message) {
    displayMessage = error.message;
  }

  return (
    <div className='flex-center flex min-h-screen flex-col rounded-lg border border-red-300 p-5 text-center'>
      <h2 className='txt-2xl-bold mb-4'>😟 앗! 문제가 발생했어요</h2>
      <p className='txt-lg-regular mb-5'>
        죄송합니다. 페이지를 불러오거나 작업하는 데 문제가 생겼습니다.
      </p>
      <p
        className='txt-md-regular mb-8'
        style={{ color: 'var(--color-primary)' }}
      >
        상세: {displayMessage}
      </p>

      <Button
        onClick={
          // 에러 상태를 리셋하여 해당 라우트 세그먼트를 다시 렌더링 시도
          () => reset()
        }
        className='bg-primary txt-white mt-6 cursor-pointer rounded-md px-6 py-3 text-lg transition-colors duration-300 hover:bg-red-700'
      >
        다시 시도하기
      </Button>
    </div>
  );
};

export default Error;

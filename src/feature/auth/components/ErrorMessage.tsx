/**
 * @author Hyun
 * @since 2025-06-17
 * @description: 에러 메시지 컴포넌트 (서버 액션의 실행결과로 발생하는 에러메시지를 표시하는 로직)
 */

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;

  return <p className='text-primary text-xl font-medium'>{message}</p>;
};

export default ErrorMessage;

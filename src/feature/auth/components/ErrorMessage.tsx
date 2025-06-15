/**
 * @author Hyun
 * @since 2025-06-10
 * @description: 에러 메시지 컴포넌트 (서버 액션의 실행결과로 발생하는 에러메시지를 표시하는 로직)
 */

interface ErrorMessageProps {
  message?: string;
}

//const ERROR_MESSAGE_STYLE = 'text-destructive text-sm font-medium';
const ERROR_MESSAGE_STYLE =
  'txt-sm-small txt-primary md:txt-md-small lg:txt-md-small pt-2 ml-2';

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return <p className={ERROR_MESSAGE_STYLE}>{message}</p>;
};

export default ErrorMessage;

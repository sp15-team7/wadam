/**
 * @author: Hyun
 * @since: 2025-06-10
 * @description: auth에서 사용되는 제출 버튼 모듈화 컴포넌트 (props로 버튼 텍스트, 클래스명 전달)
 */

'use client';

import { Button } from '@/shared/components/ui/button';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
}

const SubmitButton = ({ children, className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' variant='primary' size='full' disabled={pending}>
      {pending ? '처리 중...' : children}
    </Button>
  );
};

export default SubmitButton;

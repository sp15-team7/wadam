/**
 * @author: Hyun
 * @since: 2025-06-10
 * @description: auth에서 사용되는 제출 버튼 모듈화 컴포넌트 (props로 버튼 텍스트, 클래스명 전달)
 */

'use client';

import { Button } from '@/shared/components/ui/button';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  isPending?: boolean;
}

const SubmitButton = ({ children, isPending }: SubmitButtonProps) => {
  return (
    <Button type='submit' variant='primary' size='full' disabled={isPending}>
      {children}
    </Button>
  );
};

export default SubmitButton;

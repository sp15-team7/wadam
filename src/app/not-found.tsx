import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { LineShadowText } from '@/shared/components/ui/line-shadow-text';

const NotFound = () => {
  return (
    <main className='flex-center h-[100dvh] flex-col justify-around gap-4'>
      <LineShadowText
        shadowColor='var(--color-primary)'
        className='text-primary mr-4 text-9xl font-bold tracking-tighter italic'
      >
        404
      </LineShadowText>
      <p className='txt-xl-regular'>페이지를 찾을 수 없습니다.</p>
      <Link href='/wines' className='mt-8'>
        <Button size='xs'>홈으로 돌아가기</Button>
      </Link>
    </main>
  );
};

export default NotFound;

'use client';

import { useRouter } from 'next/navigation';

import { UserMenu } from '@/shared/components/common/combobox/UserMenu';

export default function Page() {
  const router = useRouter();

  return (
    <main className=''>
      <div className=''>
        {/* ✅ UserMenu 사용법
            -items 아래 부분 수정해서 사용하시면 됩니다.
        */}

        <div className='space-y-2'>
          <UserMenu
            items={[
              { label: '마이페이지', onClick: () => router.push('/mypage') },
              { label: '로그아웃', onClick: () => alert('로그아웃!') },
              { label: 'test', onClick: () => alert('테스트!') },
            ]}
          />
        </div>
      </div>
    </main>
  );
}

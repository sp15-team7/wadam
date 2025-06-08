import { auth } from '@/feature/auth/libs/auth';

export default async function HomePage() {
  const session = await auth();
  return (
    <div className='container mx-auto p-4'>
      <div className='mt-10 p-6 border rounded-lg'>
        <h2 className='text-2xl font-semibold mb-4'>인증 상태 테스트</h2>
        {session?.user ? (
          <div>
            <h3 className='text-xl text-green-600'>✅ 로그인 상태입니다.</h3>
            <pre className='mt-4 p-4 bg-gray-50 rounded-md overflow-x-auto text-sm'>
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        ) : (
          <p className='text-xl text-red-600'>❌ 로그아웃 상태입니다.</p>
        )}
      </div>
    </div>
  );
}

import { auth, signOut } from '@/feature/auth/libs/auth';
import MyPage from '@/feature/myprofile/components/MyPage';
import { Button } from '@/shared/components/ui/button';

/**
 * 마이페이지 컴포넌트입니다.
 * 이 페이지는 서버 컴포넌트로, 인증된 사용자만 접근할 수 있습니다.
 */

const MyProfilePage = async () => {
  // 1. `auth()` 함수를 호출하여 현재 세션 정보를 가져옵니다.
  // 사용 시 {session?.user.nickname} 으로 닉네임 가져오고
  const session = await auth();

  /**
   * {
    user: {
    id: 1379,
    email: 'hyun@test.com',
    nickname: 'hyun',
    image: null,
    createdAt: '2025-06-13T04:52:46.411Z',
    updatedAt: '2025-06-13T04:52:46.411Z',
    teamId: '15-7'
  },
  expires: '2025-07-17T01:45:33.458Z',
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM3OSwidGVhbUlkIjoiMTUtNyIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzUwMTI0MTg0LCJleHAiOjE3NTAxMjU5ODQsImlzcyI6InNwLWVwaWdyYW0ifQ.oliEcuW1QJQ6_TsaqPJ9pCB-GNAbb6QBHVI-xqDmSB4'
   }
   */

  // 실제로는 아래걸로 리턴하면됨
  // return <MyPage session={session!} />;
  return (
    <div>
      <MyPage session={session!} />
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      >
        <Button type='submit' variant='primary'>
          로그아웃
        </Button>
        <span>{session?.accessToken}</span>
      </form>
    </div>
  );
};

export default MyProfilePage;

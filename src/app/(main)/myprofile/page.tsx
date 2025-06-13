import MonthlyWineCard from '@/app/(main)/myprofile/MonthlyWineCard';
import { auth, signOut } from '@/feature/auth/libs/auth';
import { Button } from '@/shared/components/ui/button';
import { Wine } from '@/shared/schemas/wine.schema';

/**
 * 마이페이지 컴포넌트입니다.
 * 이 페이지는 서버 컴포넌트로, 인증된 사용자만 접근할 수 있습니다.
 */
// (property) wine: {
//     id: number;
//     name: string;
//     region: string;
//     image: string;
//     price: number;
//     type: string;
//     avgRating: number;
//     reviewCount: number;
//     recentReview: {
//         id: number;
//         user: {
//             id: number;
//             image: string;
//             nickname: string;
//         };
//         ... 4 more ...;
//         rating: number;
//     };
//     userId: number;
// }
const wine: Wine = {
  id: 1054,
  name: '모스카토 다스티 2018',
  region: '이탈리아',
  image:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1134/1749232902002/blob',
  price: 47000,
  type: 'SPARKLING',
  avgRating: 4.1,
  reviewCount: 2,
  recentReview: {
    id: 2489,
    rating: 4,
    lightBold: 2,
    smoothTannic: 3,
    drySweet: 8,
    softAcidic: 7,
    aroma: ['CHOCOLATE'],
    content: 'ㅁㄴㅇㅁㄴㅇ',
    createdAt: '2025-06-06T18:02:06.834Z',
    updatedAt: '2025-06-06T18:02:06.834Z',
    user: {
      id: 1134,
      nickname: '최권진',
      image: null,
    },
    likes: [],
  },
};

const MyProfilePage = async () => {
  // 1. `auth()` 함수를 호출하여 현재 세션 정보를 가져옵니다.
  const session = await auth();

  return (
    <div className='container mx-auto p-6'>
      <div className='bg-card text-card-foreground rounded-lg border p-8'>
        <h1 className='mb-2 text-3xl font-bold'>마이페이지</h1>
        <p className='text-muted-foreground mb-6'>
          안녕하세요, {session?.user.nickname}님!
        </p>
        {/*
          2. 로그아웃을 위한 <form>을 생성합니다.
             action 속성에 인라인 서버 액션을 직접 정의합니다.
        */}
        <div className='container mx-auto p-4'>
          <div className='mt-10 rounded-lg border p-6'>
            <h2 className='mb-4 text-2xl font-semibold'>인증 상태 테스트</h2>
            {session?.user ? (
              <div>
                <h3 className='text-xl text-green-600'>
                  ✅ 로그인 상태입니다.
                </h3>
                <pre className='mt-4 overflow-x-auto rounded-md bg-gray-50 p-4 text-sm'>
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>
            ) : (
              <p className='text-xl text-red-600'>❌ 로그아웃 상태입니다.</p>
            )}
          </div>
        </div>

        <form
          action={async () => {
            'use server'; // 이 함수가 서버에서만 실행되는 서버 액션임을 명시합니다.

            // 4. Auth.js의 signOut 함수를 호출합니다.
            //    로그아웃 후 랜딩 페이지('/')로 이동하도록 옵션을 추가합니다.
            await signOut({ redirectTo: '/' });
          }}
        >
          <Button type='submit' variant='primary'>
            로그아웃
          </Button>
        </form>
      </div>
      <MonthlyWineCard wine={wine} />
    </div>
  );
};

export default MyProfilePage;

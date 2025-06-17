'use client';

import { Session } from 'next-auth';
import { useCallback, useEffect, useState } from 'react';

import { getUserInfo } from '@/feature/libs/api/userApi';
import ProfileCard from '@/feature/myprofile/components/ProfileCard';
import ReviewCardList from '@/feature/myprofile/components/ReviewCardList';
import WineCardList from '@/feature/myprofile/components/WineCardList';
import { useUserStore } from '@/shared/stores/userStore';

const MyPage = ({ session }: { session: Session }) => {
  // 탭 상태 관리 (후기/와인)
  const [tab, setTab] = useState<'review' | 'wine'>('review');

  const { updateProfileImg, updateNickname } = useUserStore();

  // 유저 정보 fetch 함수
  const fetchUserInfo = useCallback(async () => {
    try {
      const data = await getUserInfo(session.accessToken);
      updateNickname(data.nickname);
      updateProfileImg(data.image);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  }, [session.accessToken, updateNickname, updateProfileImg]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  // ProfileCard에서 변경 성공 시 호출될 콜백
  const handleProfileUpdate = () => {
    fetchUserInfo();
  };

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-8'>
      {/* 전체 컨테이너 - 중앙 정렬 */}
      <div className='mx-auto flex w-full max-w-none justify-center gap-8'>
        {/* 좌측 프로필 카드 - 고정 너비 */}
        <div className='flex-shrink-0'>
          <ProfileCard
            session={session!}
            onProfileUpdate={handleProfileUpdate}
          />
        </div>

        {/* 우측 콘텐츠 영역 - 카드에 맞게 더 넓은 너비 */}
        <div className='w-[830px] min-w-0'>
          {/* 탭 버튼들 */}
          <div className='mb-8 flex gap-1 border-b border-gray-200'>
            <button
              onClick={() => setTab('review')}
              className={`px-6 py-3 font-medium transition-colors duration-200 ${
                tab === 'review'
                  ? 'border-primary text-primary border-b-2'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              내가 쓴 후기
            </button>
            <button
              onClick={() => setTab('wine')}
              className={`px-6 py-3 font-medium transition-colors duration-200 ${
                tab === 'wine'
                  ? 'border-primary text-primary border-b-2'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              내가 등록한 와인
            </button>
          </div>

          {/* 콘텐츠 영역 - 카드에 맞게 너비 조정 */}
          <div className='min-h-[600px] w-full rounded-lg bg-white shadow-sm'>
            {tab === 'review' ? (
              <ReviewCardList accessToken={session.accessToken} />
            ) : (
              <WineCardList accessToken={session.accessToken} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

'use client';

/**
 * @author: Hyun
 * @since: 2025-06-18
 * @description: 마이페이지 컴포넌트 (프로필 카드, 탭 네비게이션, 탭 콘텐츠)
 */

import { useCallback, useEffect, useState } from 'react';

import ProfileCard from '@/feature/myprofile/components/ProfileCard';
import ReviewCardList from '@/feature/myprofile/components/ReviewCardList';
import WineCardList from '@/feature/myprofile/components/WineCardList';
import { getUserInfo } from '@/feature/myprofile/services/user.service';
import InnerContainer from '@/shared/components/container/InnerContainer';
import { PAGE_STYLES } from '@/shared/constants/styles';
import { useUserStore } from '@/shared/stores/userStore';

// 탭 타입
type TabType = 'review' | 'wine';

// 마이페이지 컴포넌트
const MyPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('review');
  const { updateProfileImg, updateNickname } = useUserStore();
  const [countUpdateTrigger, setCountUpdateTrigger] = useState(0);

  // 유저 정보 가져오기
  const fetchUserInfo = useCallback(async () => {
    try {
      const data = await getUserInfo();
      updateNickname(data.nickname);
      updateProfileImg(data.image);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  }, [updateNickname, updateProfileImg]);

  // 유저 정보 가져오기 후 닉네임, 프로필 이미지 업데이트
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  // 프로필 정보 업데이트 핸들러
  const handleProfileUpdate = useCallback(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  // 카운트 업데이트 핸들러
  const handleCountUpdate = useCallback(() => {
    setCountUpdateTrigger((prev) => prev + 1);
  }, []);

  // 탭 버튼 렌더링 함수
  const renderTabButton = (tab: TabType, label: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-3 text-[1.6rem] font-medium transition-colors duration-200 ${
        activeTab === tab
          ? 'border-primary text-primary border-b-2'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {label}
    </button>
  );

  // 탭 콘텐츠 렌더링 함수
  const renderTabContent = () => {
    return activeTab === 'review' ? (
      <ReviewCardList onDeleteSuccess={handleCountUpdate} />
    ) : (
      <WineCardList onDeleteSuccess={handleCountUpdate} />
    );
  };

  return (
    <main className={PAGE_STYLES.backgroundOverlay}>
      <InnerContainer>
        <div className='mx-auto flex w-full max-w-none flex-col justify-center gap-[4rem] lg:flex-row lg:gap-[6rem]'>
          {/* 프로필 카드 */}
          <div className='flex-shrink-0'>
            <ProfileCard
              onProfileUpdate={handleProfileUpdate}
              onCountUpdate={countUpdateTrigger}
            />
          </div>

          {/* 콘텐츠 영역 */}
          <div className='min-w-0 flex-1'>
            {/* 탭 네비게이션 */}
            <div className='mb-8 flex gap-1'>
              {renderTabButton('review', '내가 쓴 후기')}
              {renderTabButton('wine', '내가 등록한 와인')}
            </div>

            {/* 탭 콘텐츠 */}
            <div className='w-full'>{renderTabContent()}</div>
          </div>
        </div>
      </InnerContainer>
    </main>
  );
};

export default MyPage;

// Import ky
import { Session } from 'next-auth';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  getUserReviewCount,
  getUserWineCount,
  updateUserProfile,
  uploadUserImage,
} from '@/feature/libs/api/userApi';
import UserAvatar from '@/shared/components/common/user-avatar';
import { useUserStore } from '@/shared/stores/userStore';

interface ProfileCardProps {
  session: Session;
  onProfileUpdate: () => void;
}

const ProfileCard = ({ session, onProfileUpdate }: ProfileCardProps) => {
  const { profileImg, nickname, updateProfileImg, updateNickname } =
    useUserStore();

  const [inputValue, setInputValue] = useState(nickname);
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [wineCount, setWineCount] = useState(0);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [isLoadingWines, setIsLoadingWines] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const accessToken = session.accessToken;

  // store의 nickname이 변경되면 input도 동기화
  useEffect(() => {
    setInputValue(nickname);
  }, [nickname]);

  // 후기 개수 가져오기
  const fetchReviewCount = useCallback(async () => {
    try {
      setIsLoadingReviews(true);
      const count = await getUserReviewCount(accessToken);
      setReviewCount(count);
    } catch (error) {
      console.error('후기 개수 조회 실패:', error);
      setReviewCount(0);
    } finally {
      setIsLoadingReviews(false);
    }
  }, [accessToken]);

  // 와인 개수 가져오기
  const fetchWineCount = useCallback(async () => {
    try {
      setIsLoadingWines(true);
      const count = await getUserWineCount(accessToken);
      setWineCount(count);
    } catch (error) {
      console.error('와인 개수 조회 실패:', error);
      setWineCount(0);
    } finally {
      setIsLoadingWines(false);
    }
  }, [accessToken]);

  // 컴포넌트 마운트 시 후기 및 와인 개수 조회
  useEffect(() => {
    fetchReviewCount();
    fetchWineCount();
  }, [fetchReviewCount, fetchWineCount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 이미지 변경
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE_MB = 5;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      alert('이미지 파일은 최대 5MB까지만 업로드할 수 있습니다.');
      return;
    }

    setIsUploading(true);

    // 1. 미리보기용 URL 생성
    const previewUrl = URL.createObjectURL(file);
    updateProfileImg(previewUrl);

    try {
      // 2. 업로드 요청 (userApi 함수 사용)
      const serverImageUrl = await uploadUserImage(accessToken, file);
      updateProfileImg(serverImageUrl);
      setUploadedImgUrl(serverImageUrl);
      URL.revokeObjectURL(previewUrl);
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      updateProfileImg('/icons/ui/icon-default-user.svg');
      setUploadedImgUrl(null);
      URL.revokeObjectURL(previewUrl);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const imageUrl = uploadedImgUrl || profileImg;
      const updateData = {
        nickname: inputValue,
        ...(imageUrl && { image: imageUrl }),
      };

      await updateUserProfile(accessToken, updateData);

      updateNickname(inputValue);
      if (uploadedImgUrl) {
        updateProfileImg(uploadedImgUrl);
      }

      setUploadedImgUrl(null);
      alert('프로필이 성공적으로 업데이트되었습니다.');
      onProfileUpdate();
    } catch (err: unknown) {
      console.error('프로필 업데이트 실패:', err);
      if (err && typeof err === 'object' && 'response' in err) {
        const errorText = await (
          err as { response: { text: () => Promise<string> } }
        ).response.text();
        console.error(
          'API 응답 에러:',
          (err as { response: { status: number } }).response.status,
          errorText,
        );
      }
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className='sticky top-8 w-80 rounded-2xl bg-white p-8 shadow-lg'>
      {/* 프로필 이미지 */}
      <div className='mb-6 flex justify-center'>
        <div className='relative'>
          <UserAvatar
            src={profileImg || '/icons/ui/icon-default-user.svg'}
            className='h-24 w-24'
          />
          <button
            type='button'
            className={`absolute right-[-10px] bottom-[-10px] flex h-8 w-8 items-center justify-center rounded-full text-sm text-white transition-colors ${
              isUploading
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-primary hover:bg-red-600'
            }`}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? '⏳' : '✎'}
          </button>
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
            disabled={isUploading}
          />
        </div>
      </div>

      {/* 닉네임 표시 */}
      <div className='mb-8 text-center'>
        <h2 className='text-2xl font-bold text-gray-800'>{nickname}</h2>
      </div>

      {/* 닉네임 변경 폼 */}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='nickname'
            className='mb-2 block text-sm font-medium text-gray-700'
          >
            닉네임
          </label>
          <input
            id='nickname'
            type='text'
            value={inputValue}
            onChange={handleChange}
            className='focus:ring-primary w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:outline-none'
            placeholder='닉네임을 입력하세요'
            disabled={isUpdating}
          />
        </div>

        <button
          type='submit'
          className={`focus:ring-primary w-full rounded-lg px-4 py-3 font-medium text-white transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
            isUpdating
              ? 'bg-secondary cursor-not-allowed'
              : 'bg-primary hover:bg-red-600'
          }`}
          disabled={isUpdating}
        >
          {isUpdating ? '변경 중...' : '변경하기'}
        </button>
      </form>

      {/* 추가 정보 섹션 (선택사항) */}
      <div className='mt-8 border-t border-gray-100 pt-6'>
        <div className='space-y-3 text-sm text-gray-600'>
          <div className='flex justify-between'>
            <span>작성한 후기</span>
            <span className='font-medium'>
              {isLoadingReviews ? '로딩중...' : `${reviewCount}개`}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>등록한 와인</span>
            <span className='font-medium'>
              {isLoadingWines ? '로딩중...' : `${wineCount}개`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

'use client';

/**
 * @author: Hyun
 * @since: 2025-06-18
 * @description: 프로필 카드 컴포넌트 (프로필 이미지 업로드, 닉네임 변경, 통계 정보 표시)
 * 반복되는 코드는 함수 형태로 빼서 재사용성 증가 (추후 리팩토링 예정) (예: 파일 크기 검증 함수, 로딩 상태 타입, 카운트 상태 타입, 프로필 카드 컴포넌트 속성 타입)
 */

import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import {
  getUserReviewCount,
  getUserWineCount,
  updateUserProfile,
  uploadUserImage,
} from '@/feature/libs/api/userApi';
import UserAvatar from '@/shared/components/common/user-avatar';
import { useUserStore } from '@/shared/stores/userStore';

// 프로필 카드 컴포넌트 속성 타입
interface ProfileCardProps {
  session: Session;
  onProfileUpdate: () => void;
}

// 카운트 상태 타입 (리뷰개수, 등록한 와인개수)
interface CountState {
  reviews: number;
  wines: number;
}

// 로딩 상태 타입
interface LoadingState {
  reviews: boolean;
  wines: boolean;
  uploading: boolean;
  updating: boolean;
}

// 최대 파일 크기 설정 (5MB)
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// 프로필 카드 컴포넌트
const ProfileCard = ({ session, onProfileUpdate }: ProfileCardProps) => {
  const { profileImg, nickname, updateProfileImg, updateNickname } =
    useUserStore();
  const { update } = useSession();

  const [inputValue, setInputValue] = useState(nickname);
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string | null>(null);
  const [counts, setCounts] = useState<CountState>({ reviews: 0, wines: 0 });
  const [loading, setLoading] = useState<LoadingState>({
    reviews: true,
    wines: true,
    uploading: false,
    updating: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { accessToken } = session;

  // nickname 동기화
  useEffect(() => {
    setInputValue(nickname);
  }, [nickname]);

  // 카운트 정보 가져오기 (리뷰 개수, 등록한 와인 개수)
  const fetchCounts = useCallback(async () => {
    const updateLoading = (
      key: keyof Pick<LoadingState, 'reviews' | 'wines'>,
      value: boolean,
    ) => {
      setLoading((prev) => ({ ...prev, [key]: value }));
    };

    try {
      const [reviewsPromise, winesPromise] = [
        getUserReviewCount(accessToken).finally(() =>
          updateLoading('reviews', false),
        ),
        getUserWineCount(accessToken).finally(() =>
          updateLoading('wines', false),
        ),
      ];

      const [reviewCount, wineCount] = await Promise.allSettled([
        reviewsPromise,
        winesPromise,
      ]);

      setCounts({
        reviews: reviewCount.status === 'fulfilled' ? reviewCount.value : 0,
        wines: wineCount.status === 'fulfilled' ? wineCount.value : 0,
      });
    } catch (error) {
      console.error('카운트 정보 조회 실패:', error);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  // 파일 크기 검증 함수
  const validateFileSize = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(
        `이미지 파일은 최대 ${MAX_FILE_SIZE_MB}MB까지만 업로드할 수 있습니다.`,
      );
      return false;
    }
    return true;
  };

  // 이미지 업로드 핸들러
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // 파일이 선택되지 않은 경우
    if (!file) {
      toast.error('이미지 파일을 선택해주세요.');
      return;
    }

    // 파일 크기 검증
    if (!validateFileSize(file)) return;

    setLoading((prev) => ({ ...prev, uploading: true }));

    const previewUrl = URL.createObjectURL(file);
    const previousImg = profileImg; // 기존 이미지 백업
    updateProfileImg(previewUrl);

    try {
      const serverImageUrl = await uploadUserImage(accessToken, file);

      // 업로드된 이미지가 실제로 로드 가능한지 확인
      const img = new Image();
      img.onload = () => {
        updateProfileImg(serverImageUrl);
        setUploadedImgUrl(serverImageUrl);
        toast.success('이미지가 성공적으로 업로드되었습니다.');
      };
      img.onerror = () => {
        updateProfileImg(previousImg ?? '/icons/ui/icon-default-user.svg');
        setUploadedImgUrl(null);
        toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      };
      img.src = serverImageUrl;
    } catch (error: unknown) {
      console.error('이미지 업로드 실패:', error);

      // 기존 이미지로 롤백 (없으면 기본 이미지)
      updateProfileImg(previousImg ?? '/icons/ui/icon-default-user.svg');
      setUploadedImgUrl(null);

      toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      URL.revokeObjectURL(previewUrl);
      setLoading((prev) => ({ ...prev, uploading: false }));
    }
  };

  // 닉네임 변경 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // inputValue를 trim해서 검증하고 사용
    const trimmedNickname = inputValue.trim();

    if (!trimmedNickname && !uploadedImgUrl) return;
    if (trimmedNickname.length < 2) {
      toast.error('닉네임은 최소 2자 이상이어야 합니다.');
      return;
    }

    setLoading((prev) => ({ ...prev, updating: true }));

    try {
      const updateData = {
        nickname: trimmedNickname, // trim된 값 사용
        ...(uploadedImgUrl && { image: uploadedImgUrl }),
      };

      await updateUserProfile(accessToken, updateData);

      // 세션 업데이트
      const sessionUpdateData: { name?: string; image?: string } = {};
      if (trimmedNickname && nickname !== trimmedNickname) {
        sessionUpdateData.name = trimmedNickname;
      }
      if (uploadedImgUrl) {
        sessionUpdateData.image = uploadedImgUrl;
      }
      if (Object.keys(sessionUpdateData).length > 0) {
        await update(sessionUpdateData);
      }

      updateNickname(trimmedNickname); // trim된 값으로 업데이트
      if (uploadedImgUrl) {
        updateProfileImg(uploadedImgUrl);
        setUploadedImgUrl(null);
      }

      toast.success('프로필이 성공적으로 업데이트되었습니다.');
      onProfileUpdate();
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      toast.error('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading((prev) => ({ ...prev, updating: false }));
    }
  };

  // 통계 정보 표시 컴포넌트 (개수 표시)
  const CountItem = ({
    label,
    count,
    isLoading,
  }: {
    label: string;
    count: number;
    isLoading: boolean;
  }) => (
    <div className='flex justify-between'>
      <span className='text-[1.4rem] font-bold'>{label}</span>
      <span className='text-[1.4rem] font-medium'>
        {isLoading ? '로딩중...' : `${count}개`}
      </span>
    </div>
  );

  return (
    <div className='sticky top-8 w-80 rounded-2xl border bg-white p-8 shadow-lg'>
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
              loading.uploading
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-primary hover:bg-red-600'
            }`}
            onClick={() => !loading.uploading && fileInputRef.current?.click()}
            disabled={loading.uploading}
          >
            {loading.uploading ? '⏳' : '✎'}
          </button>
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            className='hidden'
            onChange={handleImageChange}
            disabled={loading.uploading}
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
            className='mb-2 block text-[1.2rem] font-bold text-gray-700'
          >
            닉네임
          </label>
          <input
            id='nickname'
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='focus:ring-primary w-full rounded-lg border border-gray-300 px-4 py-3 text-[1.2rem] transition-all duration-200 focus:border-transparent focus:ring-2 focus:outline-none'
            placeholder='닉네임을 입력하세요'
            disabled={loading.updating}
          />
        </div>

        <button
          type='submit'
          className={`focus:ring-primary w-full rounded-lg px-4 py-3 text-[1.2rem] font-medium text-white transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
            loading.updating
              ? 'bg-secondary cursor-not-allowed'
              : 'bg-primary hover:bg-red-600'
          }`}
          disabled={loading.updating}
        >
          {loading.updating ? '변경 중...' : '변경하기'}
        </button>
      </form>

      {/* 통계 정보 */}
      <div className='mt-8 border-t border-gray-100 pt-6'>
        <div className='space-y-3 text-sm text-gray-600'>
          <CountItem
            label='작성한 후기'
            count={counts.reviews}
            isLoading={loading.reviews}
          />
          <CountItem
            label='등록한 와인'
            count={counts.wines}
            isLoading={loading.wines}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

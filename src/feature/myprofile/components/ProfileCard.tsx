'use client';

/**
 * @author: Hyun
 * @since: 2025-06-18
 * @description: 프로필 카드 컴포넌트 (프로필 이미지 업로드, 닉네임 변경, 통계 정보 표시)
 * 반복되는 코드는 함수 형태로 빼서 재사용성 증가 (추후 리팩토링 예정) (예: 파일 크기 검증 함수, 로딩 상태 타입, 카운트 상태 타입, 프로필 카드 컴포넌트 속성 타입)
 */

import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import {
  getUserReviewCount,
  getUserWineCount,
  updateUserProfile,
  uploadUserImage,
} from '@/feature/myprofile/services/user.service';
import UserAvatar from '@/shared/components/common/user-avatar';
import { Button } from '@/shared/components/ui/button';
import { useUserStore } from '@/shared/stores/userStore';

// 프로필 카드 컴포넌트 속성 타입
interface ProfileCardProps {
  onProfileUpdate: () => void;
  onCountUpdate?: number;
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
const ProfileCard = ({ onProfileUpdate, onCountUpdate }: ProfileCardProps) => {
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
        getUserReviewCount().finally(() => updateLoading('reviews', false)),
        getUserWineCount().finally(() => updateLoading('wines', false)),
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
  }, []);

  useEffect(() => {
    if (onCountUpdate !== undefined) {
      fetchCounts();
    }
  }, [onCountUpdate, fetchCounts]);

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
      const serverImageUrl = await uploadUserImage(file);

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

      await updateUserProfile(updateData);

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
      <span className='txt-md-regular'>{label}</span>
      <span className='txt-md-regular'>
        {isLoading ? '로딩중...' : `${count}개`}
      </span>
    </div>
  );

  return (
    <div className='relative top-8 w-full rounded-2xl border bg-white px-[2rem] py-[4rem] shadow-lg lg:sticky lg:w-[28rem]'>
      {/* 프로필 이미지 */}
      <div className='mb-[3rem] flex items-center gap-[3.2rem] lg:flex-col lg:gap-[6rem]'>
        <div className='flex justify-center'>
          <div className='relative'>
            <UserAvatar
              src={profileImg || '/icons/ui/icon-default-user.svg'}
              className='!h-[8.3rem] !w-[8.3rem] lg:!h-[16.4rem] lg:!w-[16.4rem]'
            />
            <button
              type='button'
              className={`absolute right-0 bottom-0 z-[10] flex h-8 w-8 items-center justify-center rounded-full text-sm text-white transition-colors ${
                loading.uploading
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-primary hover:bg-red-600'
              }`}
              onClick={() =>
                !loading.uploading && fileInputRef.current?.click()
              }
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
        <div className='text-center'>
          <h2 className='txt-2xl-bold font-bold text-gray-800'>{nickname}</h2>
        </div>
      </div>
      {/* 닉네임 변경 폼 */}
      <form
        onSubmit={handleSubmit}
        className='flex items-end gap-[1.6rem] lg:flex-col'
      >
        <div className='flex-1'>
          <label htmlFor='nickname' className='txt-lg-bold mb-2 block'>
            닉네임
          </label>
          <input
            id='nickname'
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='focus:ring-primary txt-lg-regular h-[4.2rem] w-full rounded-full border border-gray-300 px-[2rem] text-gray-500 transition-all duration-200 focus:border-transparent focus:ring-2 focus:outline-none lg:h-[4.8rem]'
            placeholder='닉네임을 입력하세요'
            disabled={loading.updating}
          />
        </div>

        <Button
          type='submit'
          size='sm'
          className='tex-bold h-[4.2rem] w-[9.6rem] px-0 text-[1.6rem] whitespace-nowrap lg:ml-auto'
        >
          {loading.updating ? '변경 중...' : '변경하기'}
        </Button>
        {/* <button
          type='submit'
          className={`focus:ring-primary w-full rounded-lg px-4 py-3 font-medium text-white transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
            loading.updating ? 'bg-secondary cursor-not-allowed' : 'bg-primary'
          }`}
          disabled={loading.updating}
        >
          {loading.updating ? '변경 중...' : '변경하기'}
        </button> */}
      </form>

      {/* 통계 정보 */}
      <div className='mt-8 border-t border-gray-100 pt-6'>
        <div className='space-y-3 md:absolute md:top-[4rem] md:right-[4rem] md:w-[16rem] md:translate-y-[20%] md:space-y-8 lg:static lg:w-full lg:translate-y-0 lg:space-y-3 lg:pl-0'>
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

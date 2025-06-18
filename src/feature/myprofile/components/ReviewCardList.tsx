import React, { useEffect, useState } from 'react';

import { getUserReviews } from '@/feature/libs/api/userApi';
import { ReviewCard } from '@/feature/wines/components/card/ReviewCard';
import { ReviewDetail } from '@/feature/wines/schema/wine.schema';

// 테스트용 더미 데이터 (ReviewDetail 타입에 맞게 수정)

// {
//   id: 1,
//   aroma: [AromaTypeEnumSchema.enum.BERRY, AromaTypeEnumSchema.enum.CHERRY],
//   content:
//     'Plum and peppery on the nose. Black cherry and blackberry on the palate. Supple tannins, medium body.',
//   createdAt: '2025-06-17T10:30:00.000Z',
//   updatedAt: '2025-06-17T10:30:00.000Z',
//   rating: 5.0,
//   user: { id: 1, nickname: '완다', image: null },
//   isLiked: false,
//   lightBold: 60,
//   smoothTannic: 40,
//   drySweet: 50,
//   softAcidic: 55,
// }

interface ReviewCardListProps {
  accessToken: string;
  currentUser?: number;
}

const ReviewCardList = ({
  accessToken,
  currentUser = 1,
}: ReviewCardListProps) => {
  const [reviews, setReviews] = useState<ReviewDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        // 전체 응답 구조분해
        const { list } = await getUserReviews(accessToken, 100);
        setReviews(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error('리뷰 로딩 실패: ', err);
        setError('리뷰를 불러오는데 실패했습니다. ');
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchReviews();
    }
  }, [accessToken]);

  if (loading) {
    return (
      <div className='w-full p-6'>
        <div className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600'></div>
            <p className='text-gray-600'>리뷰를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full p-6'>
        <div className='py-12 text-center'>
          <div className='mb-4 text-red-400'>
            <svg
              className='mx-auto h-16 w-16'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <h3 className='mb-2 text-lg font-medium text-gray-900'>
            오류가 발생했습니다
          </h3>
          <p className='text-gray-600'>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full p-6'>
      {/* 후기 리스트 - 카드 너비에 맞게 조정 */}
      <div className='w-full space-y-4'>
        {reviews.map((review) => (
          <div
            key={review.id}
            className='w-full border-b border-gray-100 pb-4 last:border-b-0 last:pb-0'
          >
            <div className='w-full max-w-[800px] overflow-hidden'>
              <ReviewCard review={review} currentUser={currentUser} />
            </div>
          </div>
        ))}
      </div>

      {/* 빈 상태 (후기가 없을 때) */}
      {reviews.length === 0 && (
        <div className='py-12 text-center'>
          <div className='mb-4 text-gray-400'>
            <svg
              className='mx-auto h-16 w-16'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              {/* 원 테두리 및 느낌표 막대 */}
              <path
                fillRule='evenodd'
                d='M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-1 0A7 7 0 1 1 3 10a7 7 0 0 1 14 0zM10 6a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1z'
                clipRule='evenodd'
              />
              {/* 점(일자 표시)만 별도로, x좌표를 살짝 왼쪽으로 이동 */}
              <rect x='9.2' y='13' width='1.6' height='2' rx='0.8' />
            </svg>
          </div>
          <h3 className='mb-2 text-lg font-medium text-gray-900'>
            아직 작성한 후기가 없습니다
          </h3>
          <p className='text-gray-600'>
            와인을 시음하고 첫 번째 후기를 작성해보세요!
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewCardList;

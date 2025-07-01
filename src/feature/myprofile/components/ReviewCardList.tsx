'use client';

/**
 * @author: Hyun
 * @since: 2025-06-18
 * @description: 내가 작성한 후기 리스트
 * 흐름: useEffect로 내가 작성한 후기를 가져와 setReviews에 저장 -> 화면에 뿌려줌(로딩 상태 표시/에러 상태 표시/빈 상태 표시/후기 카드 렌더링)
 */

import React, { useEffect, useState } from 'react';

import { getUserReviews } from '@/feature/myprofile/services/user.service';
import DeleteForm from '@/feature/reviews/components/form/DeleteForm';
import EditReviewForm from '@/feature/reviews/components/review-form/EditReviewForm';
import {
  MyReviewWithWine,
  UpdateReviewResponse,
} from '@/feature/reviews/schemas/reviews.schema';
import MyReviewCard from '@/feature/wines/components/card/MyReviewCard';
import { useModalStore } from '@/shared/stores/useModalStore';

interface ReviewCardListProps {
  onDeleteSuccess?: () => void; // 삭제 성공 시 호출할 콜백 추가
}

const REVIEWS_LIMIT = 100;

const ReviewCardList = ({ onDeleteSuccess }: ReviewCardListProps) => {
  const [reviews, setReviews] = useState<MyReviewWithWine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //리뷰 수정 모달 관련
  const [selectedReview, setSelectedReview] = useState<MyReviewWithWine | null>(
    null,
  );
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);

  const { open, close, isOpen } = useModalStore();

  //리뷰 수정 모달 관련
  const handleEditClick = (review: MyReviewWithWine) => {
    setSelectedReview(review);
    open('EditReviewForm');
  };

  //리뷰 수정 모달 관련
  const handleEditClose = () => {
    close('EditReviewForm');
    setSelectedReview(null);
  };

  const handleEditSuccess = (updatedReviewData: UpdateReviewResponse) => {
    setReviews((prevReviews) => {
      const newReviews = prevReviews.map((review) => {
        if (review.id === updatedReviewData.id) {
          // 기존 'wine' 정보를 유지하면서, API 응답으로 받은 새 정보로 덮어쓰기
          return {
            ...review,
            ...updatedReviewData,
          };
        }
        return review;
      });

      // updatedAt을 기준으로 내림차순 정렬
      return newReviews.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    });
    handleEditClose();
  };

  //리뷰 삭제 관련
  const handleDeleteClick = (reviewId: number) => {
    setReviewToDelete(reviewId);
    open(`delete-review-${reviewId}`);
  };

  const handleDeleteClose = () => {
    if (reviewToDelete) {
      close(`delete-review-${reviewToDelete}`);
    }
    setReviewToDelete(null);
  };

  const handleDeleteSuccess = () => {
    if (!reviewToDelete) return;

    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewToDelete),
    );
    handleDeleteClose();

    // 삭제 성공 시 상위 컴포넌트에 알림
    onDeleteSuccess?.();
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        const { list } = await getUserReviews(REVIEWS_LIMIT);
        const reviewsArray = Array.isArray(list) ? list : [];

        // updatedAt을 기준으로 최신순으로 정렬
        const sortedReviews = reviewsArray.sort((a, b) => {
          const dateA = new Date(a.updatedAt).getTime();
          const dateB = new Date(b.updatedAt).getTime();
          return dateB - dateA; // 내림차순 (최신순)
        });

        setReviews(sortedReviews);
      } catch (error) {
        console.error('리뷰 로딩 실패:', error);
        setError('리뷰를 불러오는데 실패했습니다.');
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // 로딩 상태 표시 - 임시적으로 개발 (추후 개발된 스피너로 대체예정)
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

  // 에러 상태 표시 (추후 개발된 에러 메시지로 대체예정)
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

  // 빈 상태 (후기가 없을 때) - 추후 위 컴포넌트로 빼기
  if (reviews.length === 0) {
    return (
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
    );
  }

  return (
    <div className='w-full'>
      {/* 후기 리스트 - 카드 너비에 맞게 조정 */}
      <div className='flex w-full flex-col gap-[1.6rem]'>
        {reviews.map((review) => (
          <div key={review.id}>
            <MyReviewCard
              review={review}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
        ))}
      </div>
      {isOpen('EditReviewForm') && selectedReview && (
        <EditReviewForm
          review={selectedReview}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
        />
      )}
      {reviewToDelete !== null && (
        <DeleteForm
          reviewId={reviewToDelete}
          onClose={handleDeleteClose}
          onReviewUpdate={handleDeleteSuccess}
          type='review'
          modalId={`delete-review-${reviewToDelete}`}
        />
      )}
    </div>
  );
};

export default ReviewCardList;

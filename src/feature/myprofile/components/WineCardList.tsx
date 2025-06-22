'use client';

/**
 * @author: Hyun
 * @since: 2025-06-18
 * @description: 내가 등록한 와인 리스트 (ReviewCardList와 로직이 거의 같은 컴포넌트)
 * 흐름: useEffect로 내가 등록한 와인을 가져와 setWines에 저장 -> 화면에 뿌려줌(로딩 상태 표시/에러 상태 표시/빈 상태 표시/와인 카드 렌더링)
 */

import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { deleteWine, getUserWines, Wine } from '@/feature/libs/api/userApi';
import EditWineReviewForm from '@/feature/reviews/components/wine-review-form/EditWineReviewForm';
import DetailCard from '@/feature/wines/components/card/DetailCard';
import {
  GetWineDetailResponse,
  UpdateWineResponse,
} from '@/feature/wines/schema/wine.schema';
import { useModalStore } from '@/shared/stores/useModalStore';

interface WineCardListProps {
  accessToken: string;
}

const WineCardList: React.FC<WineCardListProps> = ({ accessToken }) => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);

  const { open, close, isOpen } = useModalStore();

  // 와인 목록을 updatedAt 기준으로 내림차순 정렬하는 함수
  const sortWinesByUpdatedAt = useCallback((wineList: Wine[]) => {
    return wineList.sort((a, b) => {
      // updatedAt이 있으면 updatedAt 기준, 없으면 createdAt 기준으로 정렬
      const aDate = a.updatedAt
        ? new Date(a.updatedAt)
        : a.createdAt
          ? new Date(a.createdAt)
          : new Date(0);
      const bDate = b.updatedAt
        ? new Date(b.updatedAt)
        : b.createdAt
          ? new Date(b.createdAt)
          : new Date(0);

      return bDate.getTime() - aDate.getTime();
    });
  }, []);

  const fetchUserWines = useCallback(async () => {
    if (!accessToken) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getUserWines(accessToken);
      const wineList = Array.isArray(data.list) ? data.list : [];

      // 정렬 함수 사용
      const sortedWines = sortWinesByUpdatedAt(wineList);

      setWines(sortedWines);
    } catch (error) {
      console.error('와인 데이터 로딩 실패:', error);
      setError('와인을 불러오는 데 실패했습니다.');
      setWines([]);
    } finally {
      setLoading(false);
    }
  }, [accessToken, sortWinesByUpdatedAt]);

  // 와인 수정 핸들러 (동작은 추후 구현)
  const handleEditClick = (wineId: number) => {
    setSelectedWine(wines.find((wine) => wine.id === wineId) || null);
    open('EditWineReviewForm');
  };

  // 와인 수정 모달 닫기
  const handleEditClose = () => {
    close('EditWineReviewForm');
    setSelectedWine(null);
  };

  // 와인 수정 완료 후 콜백 함수
  const handleEditSuccess = useCallback(
    (updatedWineData?: UpdateWineResponse) => {
      if (selectedWine && updatedWineData) {
        // 수정된 데이터로 와인 목록 업데이트
        setWines((prevWines) => {
          const updatedWines = prevWines.map((wine) =>
            wine.id === selectedWine.id
              ? {
                  ...wine,
                  ...updatedWineData,
                  updatedAt: new Date().toISOString(), // 클라이언트에서 수정 시간 업데이트
                }
              : wine,
          );

          // 정렬 함수 사용
          return sortWinesByUpdatedAt(updatedWines);
        });
      } else {
        // 수정된 데이터가 없으면 전체 목록을 다시 조회
        fetchUserWines();
      }

      // 모달 닫기
      handleEditClose();
    },
    [selectedWine, handleEditClose, fetchUserWines, sortWinesByUpdatedAt],
  );

  // 와인 삭제 핸들러 (동작은 추후 구현) 와인 삭제 후 상태 업데이트(filter)
  const handleDeleteWineClick = (wineId: number) => {
    toast('정말로 이 와인을 삭제하시겠습니까?', {
      action: {
        label: '삭제',
        onClick: () => {
          deleteWine(wineId)
            .then(() => {
              setWines((prev) => prev.filter((wine) => wine.id !== wineId));
              toast.success('와인이 삭제되었습니다.');
            })
            .catch((error) => {
              console.error('와인 삭제 실패:', error);
              toast.error('와인 삭제에 실패했습니다.');
            });
        },
      },
      cancel: {
        label: '취소',
        onClick: () => {},
      },
    });
  };

  useEffect(() => {
    fetchUserWines();
  }, [fetchUserWines]);

  // 로딩 상태 표시 - 임시적으로 개발 (추후 개발된 스피너로 대체예정)
  if (loading) {
    return (
      <div className='w-full p-6'>
        <div className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600'></div>
            <p className='text-gray-600'>와인을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태 표시 (추후 개발된 에러 메시지로 대체예정)
  if (error) {
    return <div className='py-12 text-center text-red-500'>에러: {error}</div>;
  }

  // 빈 상태 (와인이 없을 때) - 추후 위 컴포넌트로 빼기
  if (wines.length === 0) {
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
          등록한 와인이 없습니다.
        </h3>
        <p className='text-gray-600'>새로운 와인을 등록해보세요!</p>
      </div>
    );
  }

  return (
    <div className='w-full px-6 pb-6'>
      {/* 와인 리스트 - 카드 간격 조정 */}
      <div className='mt-10 w-full space-y-6'>
        {wines.map((wine) => (
          <div key={wine.id} className='mt-20 w-full'>
            <DetailCard
              wine={wine as unknown as GetWineDetailResponse}
              currentUser={wine.userId}
              onEditClick={() => handleEditClick(wine.id)}
              onDeleteSuccess={() => handleDeleteWineClick(wine.id)}
            />
          </div>
        ))}
      </div>
      {isOpen('EditWineReviewForm') && selectedWine && (
        <EditWineReviewForm
          wine={selectedWine}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default WineCardList;

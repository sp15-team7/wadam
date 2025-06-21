'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { deleteWine, getUserWines, Wine } from '@/feature/libs/api/userApi';
import EditWineReviewForm from '@/feature/reviews/components/wine-review-form/EditWineReviewForm';
import DetailCard from '@/feature/wines/components/card/DetailCard';
import { useWineDetail } from '@/feature/wines/hooks/useWineDetailsQuery';
import {
  GetWineDetailResponse,
  UpdateWineResponse,
} from '@/feature/wines/schema/wine.schema';
import ErrorDisplay from '@/shared/components/common/error-display';
import SkeletonCard from '@/shared/components/common/skeleton-card';
import Spinner from '@/shared/components/common/spinner';
import { useModalStore } from '@/shared/stores/useModalStore';

interface WineDetailCardSectionProps {
  wineId: number;
  currentUserId?: number;
  accessToken: string;
}

const WineDetailCardSection = ({
  currentUserId,
  wineId,
  accessToken,
}: WineDetailCardSectionProps) => {
  const {
    data: wineDetail,
    isLoading: wineLoading,
    isError,
  } = useWineDetail({
    wineId,
    enabled: !!wineId,
  });
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

  if (wineLoading) return <SkeletonCard variant='detailTop' />;

  if (isError)
    return <ErrorDisplay message='와인 정보를 불러올 수 없습니다.' isRetry />;

  if (!wineDetail) return null;

  // 로딩 상태 표시
  if (loading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Spinner size='large' />
      </div>
    );
  }

  // 에러 상태 표시
  if (error) {
    return <ErrorDisplay message={error} isRetry />;
  }

  return (
    <>
      <DetailCard
        wine={wineDetail as unknown as GetWineDetailResponse}
        currentUser={currentUserId ?? 0}
        onEditClick={() => handleEditClick(wineId)}
        onDeleteClick={() => handleDeleteWineClick(wineId)}
      />
      {isOpen('EditWineReviewForm') && selectedWine && (
        <EditWineReviewForm
          wine={selectedWine}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  );
};

export default WineDetailCardSection;

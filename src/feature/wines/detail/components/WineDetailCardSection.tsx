'use client';
import React, { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { Wine } from '@/feature/libs/api/userApi';
import EditWineReviewForm from '@/feature/reviews/components/wine-review-form/EditWineReviewForm';
import DetailCard from '@/feature/wines/components/card/DetailCard';
import { useUserWinesQuery } from '@/feature/wines/hooks/useUserWinesQuery';
import { useWineDetail } from '@/feature/wines/hooks/useWineDetailsQuery';
import { UpdateWineResponse } from '@/feature/wines/schema/wine.schema';
import ErrorDisplay from '@/shared/components/common/error-display';
import SkeletonCard from '@/shared/components/common/skeleton-card';
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
    isError: wineError,
  } = useWineDetail({
    wineId,
    enabled: !!wineId,
  });

  const {
    data: userWines,
    isLoading: userWinesLoading,
    isError: userWinesError,
    updateWineInCache,
    deleteWine,
  } = useUserWinesQuery({
    accessToken,
    enabled: !!accessToken,
  });

  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  const { open, close, isOpen } = useModalStore();

  // 현재 와인이 사용자의 와인인지 확인
  const currentWine = userWines.find((wine) => wine.id === wineId);

  // 와인 수정 핸들러
  const handleEditClick = () => {
    if (currentWine) {
      setSelectedWine(currentWine);
      open('EditWineReviewForm');
    }
  };

  // 와인 수정 모달 닫기
  const handleEditClose = useCallback(() => {
    close('EditWineReviewForm');
    setSelectedWine(null);
  }, [close]);

  // 와인 수정 완료 후 콜백 함수
  const handleEditSuccess = useCallback(
    (updatedWineData?: UpdateWineResponse) => {
      if (selectedWine && updatedWineData) {
        // React Query 캐시 업데이트
        updateWineInCache(selectedWine.id, updatedWineData);
        toast.success('와인 정보가 수정되었습니다.');
      }
      handleEditClose();
    },
    [selectedWine, updateWineInCache, handleEditClose],
  );

  // 와인 삭제 핸들러
  const handleDeleteWineClick = () => {
    toast('정말로 이 와인을 삭제하시겠습니까?', {
      action: {
        label: '삭제',
        onClick: async () => {
          try {
            await deleteWine(wineId);
            toast.success('와인이 삭제되었습니다.');
          } catch (error) {
            console.error('와인 삭제 실패:', error);
            toast.error('와인 삭제에 실패했습니다.');
          }
        },
      },
      cancel: {
        label: '취소',
        onClick: () => {},
      },
    });
  };

  // 로딩 상태 처리
  if (wineLoading || userWinesLoading) {
    return <SkeletonCard variant='detailTop' />;
  }

  // 에러 상태 처리
  if (wineError) {
    return <ErrorDisplay message='와인 정보를 불러올 수 없습니다.' isRetry />;
  }

  if (userWinesError) {
    return (
      <ErrorDisplay message='사용자 와인 정보를 불러올 수 없습니다.' isRetry />
    );
  }

  if (!wineDetail) return null;

  return (
    <>
      <DetailCard
        wine={wineDetail}
        currentUser={currentUserId}
        onEditClick={currentWine ? handleEditClick : undefined}
        onDeleteSuccess={currentWine ? handleDeleteWineClick : undefined}
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

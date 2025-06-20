'use client';

import DetailCard from '@/feature/wines/components/card/DetailCard';
import { useWineDetail } from '@/feature/wines/hooks/useWineDetailsQuery';
import ErrorDisplay from '@/shared/components/common/error-display';
import SkeletonCard from '@/shared/components/common/skeleton-card';

interface WineDetailCardSectionProps {
  wineId: number;
  currentUserId?: number;
}

const WineDetailCardSection = ({
  currentUserId,
  wineId,
}: WineDetailCardSectionProps) => {
  const {
    data: wineDetail,
    isLoading: wineLoading,
    isError,
  } = useWineDetail({
    wineId,
    enabled: !!wineId,
  });

  if (wineLoading) return <SkeletonCard variant='detailTop' />;

  if (isError)
    return <ErrorDisplay message='와인 정보를 불러올 수 없습니다.' isRetry />;

  if (!wineDetail) return null;

  return (
    <>
      {wineDetail?.recentReview && (
        <DetailCard wine={wineDetail} currentUser={currentUserId ?? 0} />
      )}
    </>
  );
};

export default WineDetailCardSection;

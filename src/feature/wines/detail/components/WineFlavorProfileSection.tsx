'use client';
import { useMemo } from 'react';

import WineTasteSlider from '@/feature/reviews/components/wine-taste-slider';
import WineAromaCards from '@/feature/wines/detail/components/WineAromaCards';
import WineDetailTitle from '@/feature/wines/detail/components/WineDetailTitle';
import { useWineDetail } from '@/feature/wines/hooks/useWineDetailsQuery';
import { WineDetailReview } from '@/feature/wines/schema/wine.schema';
import { TasteType } from '@/feature/wines/types/wine-taste';

interface WineFlavorProfileSectionProps {
  wineId: number;
}

const DEFAULT_TASTE_VALUES = {
  바디감: 5,
  타닌: 5,
  당도: 5,
  산미: 5,
} as Record<TasteType, number>;

const WineFlavorProfileSection = ({
  wineId,
}: WineFlavorProfileSectionProps) => {
  const {
    data: wineDetail,
    isLoading,
    isError,
  } = useWineDetail({
    wineId,
    enabled: !!wineId,
  });

  // 와인 리뷰 데이터에서 평균 맛 점수를 계산
  const averageTasteValues = useMemo(() => {
    if (!wineDetail?.reviews || wineDetail.reviews.length === 0) {
      return DEFAULT_TASTE_VALUES;
    }

    const reviews = wineDetail.reviews as WineDetailReview[];
    const totalReviews = reviews.length;

    const tasteMappings = {
      바디감: 'lightBold',
      타닌: 'smoothTannic',
      당도: 'drySweet',
      산미: 'softAcidic',
    } as const;

    const averages = {} as Record<TasteType, number>;
    Object.entries(tasteMappings).forEach(([tasteName, reviewKey]) => {
      averages[tasteName as TasteType] =
        reviews.reduce((sum, review) => sum + review[reviewKey], 0) /
        totalReviews;
    });

    return averages;
  }, [wineDetail?.reviews]);

  const aroma = wineDetail?.reviews?.[0]?.aroma || [];

  const reviewCount = wineDetail?.reviewCount || 0;

  return (
    <section className='mt-[5.4rem] grid grid-cols-2 gap-[6rem]'>
      <div className='flex flex-col gap-[3rem]'>
        <WineDetailTitle title='어떤 맛이 나나요?' count={reviewCount} />
        <WineTasteSlider
          values={averageTasteValues}
          readonly={true}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
      <div className='flex flex-col gap-[3rem]'>
        <WineDetailTitle title='어떤 향이 있나요?' count={reviewCount} />
        <WineAromaCards aroma={aroma} isLoading={isLoading} isError={isError} />
      </div>
    </section>
  );
};

export default WineFlavorProfileSection;

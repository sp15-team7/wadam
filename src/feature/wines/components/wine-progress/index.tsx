'use client';

/**
 * @author: Hyun, Sumin
 * @since: 2025-06-13
 * @description: 와인 점수 프로그레스 컴포넌트 (와인 점수 분포 표시 - 1점 ~ 5점)
 */

import { useWineDetail } from '@/feature/wines/hooks/useWineDetailsQuery';
import StarRating from '@/shared/components/common/star-rating';
import { Progress } from '@/shared/components/ui/progress';
import Skeleton from '@/shared/components/ui/skeleton';

interface WineProgressProps {
  wineId: number;
}

const WineProgress = ({ wineId }: WineProgressProps) => {
  const {
    data: wineDetail,
    isLoading,
    isError,
  } = useWineDetail({ wineId, enabled: !!wineId });

  if (isLoading)
    return (
      <div className='flex flex-col gap-[1.2rem]'>
        <div className='flex items-center gap-[2rem]'>
          <Skeleton className='h-[6rem] w-[11.5rem]' />
          <Skeleton className='h-[4.2rem] w-[10.5rem]' />
        </div>
        <Skeleton className='h-[2.6rem] w-full' />
        <Skeleton className='h-[2.6rem] w-full' />
        <Skeleton className='h-[2.6rem] w-full' />
        <Skeleton className='h-[2.6rem] w-full' />
      </div>
    );
  if (isError) return null;

  const reviewCount = wineDetail?.reviewCount || 0;
  const avgRatings = wineDetail?.avgRatings || {};
  const getPercentage = (count = 0) =>
    reviewCount === 0 ? 0 : (count / reviewCount) * 100;
  return (
    <div className='flex flex-col md:flex-row md:justify-between lg:flex-col lg:justify-start'>
      <div className='flex items-center gap-[1.5rem] md:gap-[2rem]'>
        <strong className='text-[3.6rem] leading-none font-extrabold md:text-[5.4rem]'>
          {wineDetail?.avgRating}
        </strong>
        <div>
          <StarRating
            value={Number(wineDetail?.avgRating)}
            size='md'
            readOnly
          />
          <p className='txt-md-regular text-gray mt-[0.5rem]'>
            {reviewCount}개의 후기
          </p>
        </div>
      </div>
      <div className='mt-[2rem] flex w-full flex-col gap-[1.5rem] md:w-[28rem] lg:w-full'>
        {[5, 4, 3, 2, 1].map((score) => (
          <div key={score} className='flex items-center gap-[1.5rem]'>
            <span className='txt-lg-small text-gray flex-none text-right'>
              {score}점
            </span>
            <Progress
              value={getPercentage(
                avgRatings[score.toString() as keyof typeof avgRatings] ?? 0,
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineProgress;

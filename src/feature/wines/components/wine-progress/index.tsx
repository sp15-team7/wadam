'use client';

/**
 * @author: Hyun, Sumin
 * @since: 2025-06-13
 * @description: 와인 점수 프로그레스 컴포넌트 (와인 점수 분포 표시 - 1점 ~ 5점)
 */

import { useWineDetail } from '@/feature/wines/hooks/useWineDetailsQuery';
import StarRating from '@/shared/components/common/star-rating';
import { Progress } from '@/shared/components/ui/progress';

interface WineProgressProps {
  wineId: number;
}

const WineProgress = ({ wineId }: WineProgressProps) => {
  const {
    data: wineDetail,
    isLoading,
    isError,
  } = useWineDetail({ wineId, enabled: !!wineId });

  if (isLoading) return <div>평점 정보를 불러오는 중...</div>;
  if (isError) return <div>평점 정보를 불러올 수 없습니다.</div>;

  const reviewCount = wineDetail?.reviewCount || 0;
  const avgRatings = wineDetail?.avgRatings || {};
  const getPercentage = (count = 0) =>
    reviewCount === 0 ? 0 : (count / reviewCount) * 100;
  return (
    <div>
      <div className='flex items-center gap-[2rem]'>
        <strong className='text-[5.4rem] font-extrabold'>
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
      <div className='mt-[2rem] flex flex-col gap-[1.5rem]'>
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

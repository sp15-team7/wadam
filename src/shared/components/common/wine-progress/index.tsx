/**
 * @author: Hyun
 * @since: 2025-06-13
 * @description: 와인 점수 프로그레스 컴포넌트 (와인 점수 분포 표시 - 1점 ~ 5점) + 현재는 mockData 사용 (실제 사용 시 api 통신하는 커스텀 훅 연결 필요)
 */

import { Progress } from '@/shared/components/ui/progress';
import { mockWine } from '@/shared/mock/mockData';

interface WineProgressProps {
  wineId: number;
}

const WineProgress = ({ wineId }: WineProgressProps) => {
  // 실제로는 wineId로 데이터 fetch, 지금은 mockWine 사용
  const { avgRatings, reviewCount } = mockWine;

  const getPercentage = (count: number) =>
    reviewCount === 0 ? 0 : (count / reviewCount) * 100;

  return (
    <div className='flex flex-col items-center'>
      <p className='txt-2xl-bold flex justify-center'>
        {reviewCount}명이 평가했습니다.
      </p>
      <div className='w-full max-w-md rounded-md bg-white p-6'>
        {[5, 4, 3, 2, 1].map((score) => (
          <div key={score} className='mb-4 flex items-center gap-4 last:mb-0'>
            <span className='txt-xl-bold w-20 text-right'>{score}점</span>
            <Progress
              value={getPercentage(
                avgRatings[score as keyof typeof avgRatings],
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineProgress;

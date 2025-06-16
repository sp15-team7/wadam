/**
 * @author: Hyun
 * @since: 2025-06-13
 * @description: 와인 점수 프로그레스 컴포넌트 (와인 점수 분포 표시 - 1점 ~ 5점) + 현재는 mockData 사용 (실제 사용 시 api 통신하는 커스텀 훅 연결 필요)
 */

import { Progress } from '@/shared/components/ui/progress';

interface WineProgressProps {
  // TODO: 현재 컴포넌트에서는 wineId를 가져와 따로 핸들링하는 코드가 없기 때문에 일시적으로 옵셔널 타입으로 선언
  wineId?: number;
}
const mockData = {
  avgRatings: {
    1: 3,
    2: 8,
    3: 11,
    4: 14,
    5: 19,
  },
  reviewCount: 55,
};

const WineProgress = ({ wineId }: WineProgressProps) => {
  // TODO: API 연동 시 windId를 받아 커스텀 훅으로 데이터 가져와 사용
  const getPercentage = (count: number) =>
    mockData.reviewCount === 0 ? 0 : (count / mockData.reviewCount) * 100;

  return (
    <div className='flex flex-col items-center'>
      <p className='txt-2xl-bold flex justify-center'>
        {mockData.reviewCount}명이 평가했습니다.
      </p>
      <div className='w-full max-w-md rounded-md bg-white p-6'>
        {[5, 4, 3, 2, 1].map((score) => (
          <div key={score} className='mb-4 flex items-center gap-4 last:mb-0'>
            <span className='txt-xl-bold w-20 text-right'>{score}점</span>
            <Progress
              value={getPercentage(
                mockData.avgRatings[score as keyof typeof mockData.avgRatings],
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineProgress;

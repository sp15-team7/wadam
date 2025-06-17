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

const getAverageRating = (data: typeof mockData) => {
  const { avgRatings, reviewCount } = data;

  if (!reviewCount || reviewCount === 0) return 0;

  const totalScore = Object.entries(avgRatings).reduce(
    (acc, [rating, count]) => {
      return acc + Number(rating) * count;
    },
    0,
  );

  return (totalScore / reviewCount).toFixed(1); // 소수점 첫째자리까지 반올림
};

const WineProgress = ({ wineId }: WineProgressProps) => {
  console.log(wineId);
  // TODO: API 연동 시 windId를 받아 커스텀 훅으로 데이터 가져와 사용
  const getPercentage = (count: number) =>
    mockData.reviewCount === 0 ? 0 : (count / mockData.reviewCount) * 100;

  return (
    <div>
      <div className='flex items-center gap-[2rem]'>
        <strong className='text-[5.4rem] font-extrabold'>
          {getAverageRating(mockData)}
        </strong>
        <div>
          <p>{mockData.reviewCount.toLocaleString('ko-KR')}개의 후기</p>
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

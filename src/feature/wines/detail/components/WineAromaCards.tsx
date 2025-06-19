import { AromaTypeEnum } from '@/feature/wines/schema/wine.schema';
import { formatAromaType } from '@/feature/wines/utils/formatWineType';
import { shuffleArray } from '@/feature/wines/utils/shuffleArray';

import WineAromaCard from './WineAromaCard';

/**
 * @author Sumin
 * @since 2025-06-18
 * @description 와인 향 카드 목록 컴포넌트
 * @returns {JSX.Element} 와인 향 카드 목록 컴포넌트
 *
 */

const WineAromaCards = ({ aroma }: { aroma: AromaTypeEnum[] }) => {
  // 랜덤으로 섞어서 최대 3개만 선택
  const shuffledAroma = shuffleArray(aroma).slice(0, 3);

  const aromaData = shuffledAroma.map((item: AromaTypeEnum) => ({
    name: formatAromaType(item),
    imageUrl: `/icons/ui/icon-aroma-${item}.png`,
  }));

  if (aromaData.length === 0) {
    return (
      <div className='flex items-center justify-center p-8 text-gray-500'>
        아직 등록된 향 정보가 없습니다.
      </div>
    );
  }

  return (
    <div className='grid flex-1 grid-cols-3 gap-[1.5rem]'>
      {aromaData.map((item) => (
        <WineAromaCard
          key={item.name}
          name={item.name}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  );
};

export default WineAromaCards;

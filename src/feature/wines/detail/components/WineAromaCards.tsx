import { formatAromaType } from '@/feature/wines/utils/formatWineType';

import WineAromaCard from './WineAromaCard';

/**
 * @author Sumin
 * @since 2025-06-18
 * @description 와인 향 카드 목록 컴포넌트
 * @returns {JSX.Element} 와인 향 카드 목록 컴포넌트
 *
 */

const WineAromaCards = () => {
  const mockData = [
    {
      name: formatAromaType('CHERRY'),
      imageUrl: '/icons/ui/icon-aroma-cherry.png',
    },
    {
      name: formatAromaType('VANILLA'),
      imageUrl: '/icons/ui/icon-aroma-vanilla.png',
    },
    {
      name: formatAromaType('TROPICAL'),
      imageUrl: '/icons/ui/icon-aroma-tropical.png',
    },
  ];

  return (
    <div className='grid flex-1 grid-cols-3 gap-[1.5rem]'>
      {mockData.map((item) => (
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

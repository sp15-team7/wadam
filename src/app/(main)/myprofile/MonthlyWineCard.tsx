import Image from 'next/image';

import { WineSummary } from '@/feature/wines/schema/wine.schema';
import { Card, CardContent } from '@/shared/components/ui/card';
import { cn } from '@/shared/libs/utils/cn';

const MonthlyWineCard = ({ wine }: { wine: WineSummary }) => {
  const { id, name, image, avgRating } = wine;
  return (
    <Card
      className={cn(
        'flex h-[16rem] w-[19.3rem] items-center p-0 md:h-[18.5rem] md:w-[23.2rem]',
      )}
    >
      <CardContent
        className={cn('flex h-full justify-center gap-8', 'md:gap-10')}
      >
        <div className='flex items-end'>
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            id={`${id}-${name}`}
            className='object-contain'
          />
        </div>
        <div className='flex flex-col justify-center gap-2'>
          <p className='txt-3xl-semibold'>{avgRating}</p>
          {/* <StarRating value={avgRating} readOnly /> */}
          <p className='font-regular text-lg'>{name}</p>
        </div>
      </CardContent>
    </Card>
  );
};
export default MonthlyWineCard;

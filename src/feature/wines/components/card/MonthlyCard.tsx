import Image from 'next/image';

import { WineSummary } from '@/feature/wines/schema/wine.schema';
import StarRating from '@/shared/components/common/star-rating';
import { Card, CardContent } from '@/shared/components/ui/card';

const MonthlyCard = ({ wine }: { wine: WineSummary }) => {
  const { name, image, avgRating } = wine;
  return (
    <Card className='h-[16rem] w-[19.3rem] p-0 md:h-[18.5rem] md:w-[23.2rem]'>
      <CardContent className='flex h-full items-end gap-[2.8rem] px-[3rem] pt-[2.4rem]'>
        <figure className='relative h-full w-[4.4rem] overflow-hidden'>
          <Image
            src={image}
            alt='와인 이미지'
            fill
            className='!h-[108%] w-full object-cover object-top'
          />
        </figure>
        <article className='flex h-full flex-2 flex-col justify-start'>
          <h2 className='text-[2.8rem] leading-none font-bold md:text-[3.6rem]'>
            {avgRating ? avgRating.toFixed(1) : '0.0'}
          </h2>
          <StarRating value={avgRating ?? 0} readOnly />
          <p className='mt-2 line-clamp-3 text-[1.2rem] md:line-clamp-4'>
            {name}
          </p>
        </article>
      </CardContent>
    </Card>
  );
};
export default MonthlyCard;

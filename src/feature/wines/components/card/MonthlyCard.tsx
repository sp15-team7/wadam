import Image from 'next/image';

import { WineSummary } from '@/feature/wines/schema/wine.schema';
import StarRating from '@/shared/components/common/star-rating';
import { Card, CardContent } from '@/shared/components/ui/card';

const MonthlyCard = ({ wine }: { wine: WineSummary }) => {
  const { name, image, avgRating } = wine;
  return (
    <Card className='h-[16rem] w-[19.3rem] p-0 md:h-[18.5rem] md:w-[23.2rem]'>
      <CardContent className='flex h-full p-0 px-6'>
        <figure className='flex flex-1 items-end justify-center px-4'>
          <Image
            src={image}
            alt='와인 이미지'
            width={38}
            height={136}
            className='md:h-[16.1rem] md:w-[4.4rem]'
          />
        </figure>
        <article className='flex flex-2 flex-col justify-center gap-2'>
          <h2 className='text-[2.8rem] font-bold md:text-[3.6rem]'>
            {avgRating}
          </h2>
          <StarRating value={avgRating} readOnly />
          <p className='mt-2 line-clamp-3 text-[1.2rem] md:line-clamp-4'>
            {name}
          </p>
        </article>
      </CardContent>
    </Card>
  );
};
export default MonthlyCard;

import Image from 'next/image';
import Link from 'next/link';

import { WineSummary } from '@/feature/wines/schema/wine.schema';
import StarRating from '@/shared/components/common/star-rating';
import { Card, CardContent } from '@/shared/components/ui/card';

const MonthlyCard = ({ wine }: { wine: WineSummary }) => {
  const { id, name, image, avgRating } = wine;
  return (
    <Link href={`/wines/${id}`}>
      <Card className='h-[16rem] w-[19.3rem] p-0 md:h-[18.5rem] md:w-[23.2rem]'>
        <CardContent className='flex h-full items-end gap-[2.8rem] px-[3rem] pt-[2.4rem]'>
          <figure className='relative h-full w-[4.4rem]'>
            <Image
              src={image}
              alt='와인 이미지'
              fill
              className='!top-auto !bottom-[-1rem] max-h-[100%] w-full object-contain object-bottom'
            />
          </figure>
          <article className='flex h-full flex-2 flex-col justify-around'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-[2.8rem] leading-none font-bold md:text-[3.6rem]'>
                {avgRating ? avgRating.toFixed(1) : '0.0'}
              </h2>
              <StarRating value={avgRating ?? 0} readOnly />
            </div>

            <p className='line-clamp-3 text-[1.2rem] md:line-clamp-4 md:text-[1.4rem]'>
              {name}
            </p>
          </article>
        </CardContent>
      </Card>
    </Link>
  );
};
export default MonthlyCard;

import Image from 'next/image';

import CardDropdownMenu from '@/feature/wines/components/button/CardDropdownMenu';
import { WineDetailResponse } from '@/feature/wines/schema/wine.schema';
import { Card, CardContent } from '@/shared/components/ui/card';

const DetailCard = ({ wine }: { wine: WineDetailResponse }) => {
  const { name, region, image, price } = wine;
  return (
    <Card className='h-[19rem] w-[34.3rem] md:h-[26rem] md:w-[70.4rem] lg:w-[114rem]'>
      <CardContent className='flex h-full px-8 md:gap-8'>
        <figure
          className='flex items-end px-4 md:px-6'
          aria-label='와인 이미지'
        >
          <Image
            src={image}
            alt='와인 이미지'
            width={58}
            height={209}
            className='md:h-[30.2rem] md:w-[8.4rem]'
          />
        </figure>

        <article className='relative flex flex-2 flex-col justify-between py-12'>
          <header className='flex justify-between gap-4'>
            <h2 className='max-w-[19rem] text-[2rem] leading-tight font-semibold md:max-w-[30rem] md:text-[3rem]'>
              {name}
            </h2>
            <CardDropdownMenu />
          </header>

          <p className='text-[1.6rem] text-gray-800'>{region}</p>

          <footer>
            <strong className='bg-secondary text-primary w-fit rounded-full px-4 py-1.5 text-[1.4rem] font-bold md:text-[1.8rem]'>
              ₩ {price.toLocaleString()}
            </strong>
          </footer>
        </article>
      </CardContent>
    </Card>
  );
};

export default DetailCard;

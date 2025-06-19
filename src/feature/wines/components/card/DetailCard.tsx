import Image from 'next/image';

import CardDropdownMenu from '@/feature/wines/components/button/CardDropdownMenu';
import { GetWineDetailResponse } from '@/feature/wines/schema/wine.schema';
import { Card, CardContent } from '@/shared/components/ui/card';

const DetailCard = ({
  wine,
  currentUser,
}: {
  wine: GetWineDetailResponse;
  currentUser?: number | null;
}) => {
  const { name, region, image, price } = wine;
  return (
    <Card className='h-[26rem]'>
      <CardContent className='flex h-full items-end gap-[8rem] px-[8rem]'>
        <figure
          className='relative h-[30.6rem] w-[8.5rem] overflow-hidden'
          aria-label='와인 이미지'
        >
          <Image
            src={image}
            alt='와인 이미지'
            fill
            className='!h-[31.4rem] object-cover object-top'
          />
        </figure>

        <article className='relative flex h-full flex-col justify-center gap-[2rem]'>
          <header className='flex justify-between gap-4'>
            <h2 className='max-w-[19rem] text-[2rem] leading-tight font-semibold md:max-w-[30rem] md:text-[3rem]'>
              {name}
            </h2>
            {currentUser && currentUser === wine.userId && <CardDropdownMenu />}
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

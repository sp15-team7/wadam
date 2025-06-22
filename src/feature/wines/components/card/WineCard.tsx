import { cva } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';

import { GetWinesResponse } from '@/feature/wines/schema/wine.schema';
import StarRating from '@/shared/components/common/star-rating';
import { Card, CardContent, CardFooter } from '@/shared/components/ui/card';

const wineCardVariants = {
  card: cva(
    'border-secondary flex h-[34.3rem] justify-center gap-0 rounded-[3rem] bg-white md:max-h-[37.5rem]',
  ),
  content: cva('flex gap-4 px-[2rem] md:gap-[8rem] md:px-[6rem]'),
  footer: cva('border-primary border-t-2 p-6 md:px-24 md:pt-12'),
};

const WineCard = ({ wine }: { wine: GetWinesResponse['list'][number] }) => {
  const {
    id,
    name,
    region,
    image,
    price,
    avgRating,
    reviewCount,
    recentReview,
  } = wine;
  return (
    <Card className={wineCardVariants.card()} role='article'>
      <CardContent className={wineCardVariants.content()}>
        <figure
          className='relative w-[7rem] flex-none overflow-hidden md:w-[6rem]'
          aria-label='와인 이미지'
        >
          <Image
            src={image}
            alt='와인 이미지'
            fill
            draggable={false}
            className='!top-auto !bottom-[-1rem] max-h-[100%] w-full object-contain object-bottom select-none'
          />
        </figure>

        <div className='flex flex-2 flex-col justify-center md:flex-3 md:flex-row'>
          <header className='flex flex-col gap-3 md:flex-2 md:gap-6'>
            <h2 className='line-clamp-2 text-[2rem] leading-tight font-semibold md:text-[3rem]'>
              {name}
            </h2>
            <p className='text-[1.6rem]'>{region}</p>
            <strong className='text-primary bg-secondary w-fit rounded-full px-4 py-2 text-[1.4rem] font-bold md:text-[1.8rem]'>
              ₩ {price.toLocaleString()}
            </strong>
          </header>

          <footer className='flex items-center justify-between gap-8 md:flex-1 md:flex-col md:items-end md:justify-start'>
            <div
              className='mt-[2.2rem] flex items-center gap-8 md:mt-0 md:flex-col md:items-start md:justify-start md:gap-6'
              aria-label='평점 정보'
            >
              <span className='text-[2.8rem] font-extrabold md:text-[4.8rem]'>
                {avgRating ? avgRating.toFixed(1) : '0.0'}
              </span>
              <div className='flex flex-col items-center gap-2 md:items-start md:justify-start md:gap-4'>
                <StarRating value={avgRating ?? 0} readOnly size='md' />
                <span className='text-gray text-[1.2rem] md:text-[1.4rem]'>
                  {reviewCount}개의 후기
                </span>
              </div>
            </div>
            <Link
              href={`/wines/${id}`}
              className='flex items-end justify-end md:ml-auto'
              aria-label='와인 상세 정보 보기'
            >
              <Image
                src='/icons/ui/icon-arrow-right.svg'
                alt='상세 정보 보기'
                width={32}
                height={32}
                draggable={false}
                className='select-none'
              />
            </Link>
          </footer>
        </div>
      </CardContent>

      <CardFooter className={wineCardVariants.footer()}>
        <p className='line-clamp-3 text-[1.4rem] md:text-[1.6rem]'>
          {recentReview?.content || '아직 리뷰가 없습니다.'}
        </p>
      </CardFooter>
    </Card>
  );
};

export default WineCard;

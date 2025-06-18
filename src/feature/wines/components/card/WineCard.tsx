import { cva } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';

import { GetWinesResponse } from '@/feature/wines/schema/wine.schema';
import StarRating from '@/shared/components/common/star-rating';
import { Card, CardContent, CardFooter } from '@/shared/components/ui/card';

const wineCardVariants = {
  card: cva(
    'w-[34.3rem] h-[36rem] md:w-[70.4rem] md:h-[37.5rem] lg:w-[80rem] lg:h-[37.5rem] rounded-[3rem] border-secondary bg-white gap-0 flex justify-center',
  ),
  content: cva('flex gap-4 md:gap-6'),
  footer: cva(
    'border-primary border-t-2 p-6 flex justify-center items-center md:px-24 md:pt-12',
  ),
};

const WineCard = ({ wine }: { wine: GetWinesResponse['list'][number] }) => {
  const { name, region, image, price, avgRating, reviewCount, recentReview } =
    wine;
  return (
    <Card className={wineCardVariants.card()} role='article'>
      <CardContent className={wineCardVariants.content()}>
        <figure className='flex flex-1 justify-center' aria-label='와인 이미지'>
          <Image
            src={image}
            alt='와인 이미지'
            width={60}
            height={200}
            className=''
          />
        </figure>

        <div className='flex flex-2 flex-col justify-center gap-10 md:flex-3 md:flex-row'>
          <header className='flex flex-col gap-3 md:flex-2 md:gap-6'>
            <h2 className='line-clamp-2 text-[2rem] leading-tight font-semibold md:text-[3rem]'>
              {name}
            </h2>
            <p className='text-[1.6rem]'>{region}</p>
            <strong className='text-primary bg-secondary w-fit rounded-full px-4 py-2 text-[1.4rem] font-bold md:text-[1.8rem]'>
              ₩ {price.toLocaleString()}
            </strong>
          </header>

          <footer className='flex items-center justify-between gap-8 md:flex-1 md:flex-col md:items-end md:justify-start md:pr-12 lg:pr-24'>
            <div
              className='flex items-center gap-8 md:flex-col md:items-start md:justify-start md:gap-6'
              aria-label='평점 정보'
            >
              <span className='text-[2.8rem] font-extrabold md:text-[4.8rem]'>
                {avgRating.toFixed(1)}
              </span>
              <div className='flex flex-col items-center gap-2 md:items-start md:justify-start md:gap-4'>
                <StarRating value={avgRating} readOnly size='md' />
                <span className='text-gray text-[1.2rem] md:text-[1.4rem]'>
                  {reviewCount}개의 후기
                </span>
              </div>
            </div>
            <Link
              href='/wines'
              className='flex items-end justify-end md:ml-auto'
              aria-label='와인 상세 정보 보기'
            >
              <Image
                src='/icons/ui/icon-arrow-right.svg'
                alt='상세 정보 보기'
                width={32}
                height={32}
                className=''
              />
            </Link>
          </footer>
        </div>
      </CardContent>

      <CardFooter className={wineCardVariants.footer()}>
        <p className='line-clamp-2 text-[1.4rem] md:text-[1.6rem]'>
          {recentReview?.content || '아직 리뷰가 없습니다.'}
        </p>
      </CardFooter>
    </Card>
  );
};

export default WineCard;

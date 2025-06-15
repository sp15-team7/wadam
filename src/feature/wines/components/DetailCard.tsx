import Image from 'next/image';

import CardDropdownMenu from '@/feature/myprofile/components/CardDropdownMenu';
import { Card, CardContent } from '@/shared/components/ui/card';

const DetailCard = () => {
  return (
    <Card className='h-[19rem] w-[34.3rem] md:h-[26rem] md:w-[70.4rem] lg:w-[114rem]'>
      <CardContent className='flex h-full px-6 md:gap-8'>
        <figure className='flex items-end px-4 md:px-6'>
          <Image
            src={'/images/wines/image-wine1.png'}
            alt='와인 이미지'
            width={58}
            height={209}
            className='md:h-[30.2rem] md:w-[8.4rem]'
          />
        </figure>
        <article className='relative flex flex-2 flex-col justify-between gap-2 py-12'>
          <div className='flex flex-col gap-4'>
            <CardDropdownMenu />
            <h2 className='flex max-w-[19rem] items-start text-[2rem] leading-tight font-semibold md:max-w-[30rem] md:text-[3rem]'>
              Sentinel Carbernet Sauvignon 2016
            </h2>
            <p className='text-[1.6rem]'>Western Cape, South Africa</p>
          </div>
          <div className=''>
            <strong className='text-primary bg-secondary w-fit rounded-full px-[1rem] py-[0.6rem] text-[1.4rem] font-bold md:text-[1.8rem]'>
              ₩ 64,990
            </strong>
          </div>
        </article>
      </CardContent>
    </Card>
  );
};
export default DetailCard;

import { cva, type VariantProps } from 'class-variance-authority';

import Skeleton from '@/shared/components/ui/skeleton';
import { cn } from '@/shared/libs/utils/cn';

const skeletonCardVariants = cva('flex flex-col', {
  variants: {
    variant: {
      recommend:
        'border-secondary h-[16rem] rounded-[3rem] border-1 bg-white p-[2.4rem] pb-0 md:h-[18.5rem] md:px-[3rem]',
      list: 'border-secondary w-full rounded-[3rem] border-1 bg-white p-[3rem] pr-[2rem] pl-[2rem] md:p-[4rem]',
      detailTop:
        'h-[20.9rem] w-full rounded-[3rem] p-[2.4rem] py-0 md:h-[30.6rem] md:px-[6rem] lg:mt-[-4.8rem] lg:px-[8rem]',
      detailList:
        'border-secondary w-full rounded-[1.6rem] border-1 bg-white p-[2rem]',
      myReview:
        'border-secondary w-full rounded-[3rem] border-1 bg-white px-[2rem] py-[1.6rem]',
    },
  },
  defaultVariants: {
    variant: 'list',
  },
});

type SkeletonCardProps = {
  className?: string;
} & VariantProps<typeof skeletonCardVariants>;

const SkeletonCard = ({ variant, className }: SkeletonCardProps) => {
  const classes = cn(skeletonCardVariants({ variant }), className);

  switch (variant) {
    case 'recommend':
      return (
        <div className={cn(classes, 'flex-row gap-[2.5rem] md:gap-[2.8rem]')}>
          <Skeleton className='h-[13.6rem] w-[3.8rem] md:h-[16.1rem] md:w-[4.4rem]' />
          <div className='flex flex-1 flex-col'>
            <Skeleton className='mb-[1.2rem] h-[2.8rem] w-[4.5rem] md:mb-[1.6rem] md:h-[3.6rem] md:w-[5.7rem]' />
            <Skeleton className='mb-[0.7rem] h-[1.2rem] w-[6rem] md:mb-[1.2rem] md:h-[1.6rem] md:w-[9rem]' />
            <Skeleton className='mb-[0.5rem] h-[1rem] w-[4rem] md:mb-[0.7rem] md:h-[1.2rem] md:w-4/6' />
            <Skeleton className='mb-[0.5rem] h-[1rem] w-[8rem] md:mb-[0.7rem] md:h-[1.2rem] md:w-6/7' />
            <Skeleton className='h-[1rem] w-[8rem] md:h-[1.4rem] md:w-5/6' />
          </div>
        </div>
      );
    case 'detailTop':
      return (
        <div
          className={cn(
            classes,
            'after:border-secondary relative z-[2] flex-row items-end gap-[2.5rem] after:absolute after:bottom-0 after:left-0 after:z-[-1] after:block after:h-[19rem] after:w-full after:rounded-[3rem] after:border-1 after:bg-white after:content-[""] md:gap-[6rem] md:after:h-[26rem] xl:gap-[7.9rem]',
          )}
        >
          <Skeleton className='h-full w-[5.8rem]' />
          <div className='flex flex-1 flex-col pb-[2.95rem] md:pb-[4rem]'>
            <Skeleton className='mb-[0.7rem] h-[2rem] w-[13rem] md:mb-[1.2rem] md:h-[3.2rem] md:w-[30rem]' />
            <Skeleton className='mb-[1.5rem] h-[2rem] w-[18rem] md:mb-[2rem] md:h-[3.2rem] md:w-[27rem]' />
            <Skeleton className='mb-[1rem] h-[1.4rem] w-[17.3rem] md:mb-[2rem] md:h-[1.6rem] md:w-[20rem]' />
            <Skeleton className='h-[2.8rem] w-[8.6rem] rounded-2xl md:h-[3.7rem] md:w-[11.4rem]' />
          </div>
        </div>
      );
    case 'detailList':
      return (
        <div
          className={cn(classes, 'flex flex-col gap-[2rem] md:gap-[2.4rem]')}
        >
          <div className='mb-[2rem] flex items-center gap-[1.6rem]'>
            <Skeleton className='h-[4.2rem] w-[4.2rem] rounded-full md:h-[6.4rem] md:w-[6.4rem]' />
            <div className='flex flex-1 flex-col gap-[0.8rem]'>
              <Skeleton className='h-[1.6rem] w-[5.6rem] md:h-[2rem] md:w-[6.3rem]' />
              <Skeleton className='h-[1.4rem] w-[5.6rem] md:h-[1.6rem] md:w-[6.3rem]' />
            </div>
          </div>
          <div className='mb-[1.6rem] flex gap-[0.6rem] md:mb-[1rem]'>
            <Skeleton className='h-[3.6rem] w-3/5 rounded-full md:max-w-[7.2rem]' />
            <Skeleton className='h-[3.6rem] w-3/5 rounded-full md:max-w-[7.2rem]' />
            <Skeleton className='h-[3.6rem] w-3/5 rounded-full md:max-w-[7.2rem]' />
            <Skeleton className='h-[3.6rem] w-3/5 rounded-full md:max-w-[7.2rem]' />
            <Skeleton className='h-[3.6rem] w-3/5 rounded-2xl md:ml-auto md:max-w-[8rem]' />
          </div>
          <div className='mb-[1.6rem] flex flex-col gap-[0.8rem]'>
            <Skeleton className='h-[1.4rem] w-full md:h-[1.6rem]' />
            <Skeleton className='h-[1.4rem] w-full md:h-[1.6rem]' />
            <Skeleton className='h-[1.4rem] w-5/6 md:h-[1.6rem]' />
            <Skeleton className='h-[1.4rem] w-full md:h-[1.6rem]' />
            <Skeleton className='h-[1.4rem] w-1/2 md:h-[1.6rem]' />
          </div>
          <div className='flex flex-col gap-[1.2rem]'>
            <div className='flex items-center gap-[0.9rem]'>
              <Skeleton className='h-[3rem] w-[4.8rem]' />
              <Skeleton className='h-[2rem] flex-1' />
            </div>
            <div className='item flex items-center gap-[0.9rem]'>
              <Skeleton className='h-[3rem] w-[4.8rem]' />
              <Skeleton className='h-[2rem] flex-1' />
            </div>
            <div className='item flex items-center gap-[0.9rem]'>
              <Skeleton className='h-[3rem] w-[4.8rem]' />
              <Skeleton className='h-[2rem] flex-1' />
            </div>
            <div className='item flex items-center gap-[0.9rem]'>
              <Skeleton className='h-[3rem] w-[4.8rem]' />
              <Skeleton className='h-[2rem] flex-1' />
            </div>
          </div>
        </div>
      );
    case 'myReview':
      return (
        <div
          className={cn(classes, 'flex flex-col gap-[1.7rem] md:gap-[2.4rem]')}
        >
          <div className='flex items-center gap-[1.5rem]'>
            <Skeleton className='h-[3.2rem] w-[6rem] rounded-2xl md:h-[3.8rem] md:w-[8rem]' />
            <Skeleton className='h-[1.4rem] w-[5.5rem] md:h-[1.6rem]' />
          </div>
          <div className='flex flex-col gap-[1.2rem]'>
            <Skeleton className='h-[1.4rem] w-5/6 md:h-[1.6rem]' />
            <div className='flex flex-col gap-[0.5rem]'>
              <Skeleton className='h-[1.4rem] w-5/7 md:h-[1.6rem]' />
              <Skeleton className='h-[1.4rem] w-6/7 md:h-[1.6rem]' />
              <Skeleton className='h-[1.4rem] w-5/6 md:h-[1.6rem]' />
            </div>
          </div>
        </div>
      );
    case 'list':
    default:
      return (
        <div className={cn(classes, 'flex-col gap-[2.5rem] md:gap-[3.7rem]')}>
          <div className='relative flex gap-[3.6rem] md:gap-[4.7rem] xl:gap-[8rem]'>
            <Skeleton className='h-[21.2rem] w-[7rem] md:h-[20.8rem] md:w-[7.4rem] xl:w-[6rem]' />
            <div className='flex flex-1 flex-col'>
              <Skeleton className='mb-[0.7rem] h-[2rem] w-[30rem] md:h-[3rem]' />
              <Skeleton className='mb-[0.7rem] h-[2rem] w-[25rem] md:mb-[2rem] md:h-[3rem]' />
              <Skeleton className='mb-[0.8rem] h-[1.4rem] w-[16rem] md:h-[1.6rem]' />
              <Skeleton className='mb-[2.2rem] h-[2.9rem] w-[8.6rem] rounded-2xl md:mb-0' />
              <Skeleton className='h-[3.7rem] w-[19.8rem] md:absolute md:top-0 md:right-0 md:h-[12.1rem] md:w-[11.2rem]' />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-[1.4rem] w-full' />
            <Skeleton className='h-[1.4rem] w-5/6' />
            <Skeleton className='h-[1.4rem] w-1/3 md:hidden' />
          </div>
        </div>
      );
  }
};

export default SkeletonCard;

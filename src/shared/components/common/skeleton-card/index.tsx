import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/libs/utils/cn';

import Skeleton from '../../ui/Skeleton';

const skeletonCardVariants = cva('rounded-[30px] flex flex-col', {
  variants: {
    variant: {
      recommend:
        'h-[16rem] p-[2.4rem] pb-0 bg-white border-secondary border-1 md:px-[3rem] md:h-[18.5rem]',
      list: 'w-full h-[36rem] p-[3rem] pr-[2rem] pl-[2rem] bg-white border-secondary border-1',
      detailTop: 'w-full h-[20.9rem] p-[2.4rem] py-0 md:h-[30.2rem]',
      detailList: 'w-full p-[2rem] bg-white border-secondary border-1',
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
        <div className={cn(classes, 'flex-row gap-[2.5rem]')}>
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
            'after: after:border-secondary relative z-2 flex-row items-end gap-[2.5rem] bg-white after:absolute after:bottom-0 after:left-0 after:z-[-1] after:block after:h-[19rem] after:w-full after:rounded-[30px] after:border-1 after:content-[""] md:gap-[6rem] md:after:h-[26rem]',
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
        <div className={cn(classes, 'flex flex-col gap-[2rem]')}>
          <div className='mb-[2rem] flex items-center gap-[1.6rem]'>
            <Skeleton className='h-[4.2rem] w-[4.2rem] rounded-full' />
            <div className='flex flex-1 flex-col gap-[0.8rem]'>
              <Skeleton className='h-[1.6rem] w-[5.6rem]' />
              <Skeleton className='h-[1.4rem] w-[5.6rem]' />
            </div>
          </div>
          <div className='mb-[1.6rem] flex gap-[0.6rem]'>
            <Skeleton className='h-[3.6rem] w-3/5 rounded-full' />
            <Skeleton className='h-[3.6rem] w-3/5 rounded-full' />
            <Skeleton className='h-[3.6rem] w-3/5 rounded-full' />
            <Skeleton className='h-[3.6rem] w-3/5 rounded-full' />
            <Skeleton className='h-[3.6rem] w-3/5 rounded-2xl' />
          </div>
          <div className='mb-[1.6rem] flex flex-col gap-[0.8rem]'>
            <Skeleton className='h-[1.4rem] w-full' />
            <Skeleton className='h-[1.4rem] w-full' />
            <Skeleton className='h-[1.4rem] w-5/6' />
            <Skeleton className='h-[1.4rem] w-full' />
            <Skeleton className='h-[1.4rem] w-1/2' />
          </div>
          <div className='flex flex-col gap-[1.2rem]'>
            <div className='flex items-center gap-[0.9rem]'>
              <Skeleton className='h-[3rem] w-[4.8rem]' />
              <Skeleton className='h-[2rem] flex-1' />
            </div>
            <div className='item flex gap-[0.9rem]'>
              <Skeleton className='h-[3rem] w-[4.8rem]' />
              <Skeleton className='h-[2rem] flex-1' />
            </div>
            <div className='item flex gap-[0.9rem]'>
              <Skeleton className='h-[3rem] w-[4.8rem]' />
              <Skeleton className='h-[2rem] flex-1' />
            </div>
            <div className='item flex gap-[0.9rem]'>
              <Skeleton className='h-[3rem] w-[4.8rem]' />
              <Skeleton className='h-[2rem] flex-1' />
            </div>
          </div>
        </div>
      );
    case 'list':
    default:
      return (
        <div className={cn(classes, 'flex-col gap-[2.5rem]')}>
          <div className='flex gap-[3.6rem]'>
            <Skeleton className='h-[21.2rem] w-[7rem]' />
            <div className='flex flex-1 flex-col'>
              <Skeleton className='mb-[0.7rem] h-[2rem] w-[18.7rem]' />
              <Skeleton className='mb-[0.7rem] h-[2rem] w-[15rem]' />
              <Skeleton className='mb-[0.8rem] h-[1.4rem] w-[16rem]' />
              <Skeleton className='mb-[2.2rem] h-[2.9rem] w-[8.6rem] rounded-2xl' />
              <Skeleton className='h-[3.7rem] w-[19.8rem]' />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-[1.4rem] w-full' />
            <Skeleton className='h-[1.4rem] w-5/6' />
            <Skeleton className='h-[1.4rem] w-1/3' />
          </div>
        </div>
      );
  }
};

export default SkeletonCard;

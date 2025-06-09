import { cn } from '@/shared/libs/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import Skeleton from './Skeleton';

const skeletonCardVariants = cva('rounded-[30px] flex flex-col', {
  variants: {
    variant: {
      recommend: 'w-[19.3rem] h-[16rem] p-[2.4rem] pb-0 bg-white border-secondary border-1',
      list: 'w-[34.3rem] h-[36rem] p-[3rem] pr-[2rem] pl-[2rem] bg-white border-secondary border-1',
      detailTop: 'w-[34.3rem] h-[20.9rem] p-[2.4rem] pb-0',
      detailList: 'w-[34.3rem] p-[2rem] bg-white border-secondary border-1',
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
          <Skeleton className='h-[13.6rem] w-[3.8rem]' />
          <div className='flex flex-col flex-1'>
            <Skeleton className='h-[2.8rem] w-[4.5rem] mb-[1.2rem]' />
            <Skeleton className='h-[1.2rem] w-[6rem] mb-[0.7rem]' />
            <Skeleton className='h-[1rem] w-[4rem] mb-[0.5rem]' />
            <Skeleton className='h-[1rem] w-[8rem] mb-[0.5rem]' /> 
            <Skeleton className='h-[1rem] w-[8rem]' />
          </div>
        </div>
      );
    case 'detailTop':
      return (
        <div
          className={cn(
            classes,
            'flex-row items-end gap-[2.5rem] relative z-2 after:content-[""] after:block after:w-full after:h-[19rem] after: bg-white after:border-secondary after:border-1 after:absolute after:bottom-0 after:left-0 after:z-[-1] after:rounded-[30px]',
          )}
        >
          <Skeleton className='h-[20.9rem] w-[5.8rem]' />
          <div className='flex flex-col flex-1 pb-[2.95rem]'>
            <Skeleton className='h-[2rem] w-[13rem] mb-[0.7rem]' />
            <Skeleton className='h-[2rem] w-[18rem] mb-[1.5rem]' />
            <Skeleton className='h-[1.4rem] w-[17.3rem] mb-[1rem]' />
            <Skeleton className='h-[2.8rem] w-[8.6rem] rounded-2xl' />
          </div>
        </div>
      );
    case 'detailList':
      return (
        <div className={cn(classes, 'flex flex-col gap-[2rem]')}>
          <div className='mb-[2rem] flex items-center gap-[1.6rem]'>
            <Skeleton className='rounded-full w-[4.2rem] h-[4.2rem]' />
            <div className='flex flex-col gap-[0.8rem] flex-1'>
              <Skeleton className='h-[1.6rem] w-[5.6rem]' />
              <Skeleton className='h-[1.4rem] w-[5.6rem]' />
            </div>
          </div>
          <div className='mb-[1.6rem] flex gap-[0.6rem]'>
            <Skeleton className='h-[3.6rem] rounded-full w-3/5' />
            <Skeleton className='h-[3.6rem] rounded-full w-3/5' />
            <Skeleton className='h-[3.6rem] rounded-full w-3/5' />
            <Skeleton className='h-[3.6rem] rounded-full w-3/5' />
            <Skeleton className='h-[3.6rem] rounded-2xl w-3/5' />
          </div>
          <div className='mb-[1.6rem] flex flex-col gap-[0.8rem]'>
            <Skeleton className='h-[1.4rem] w-full' />
            <Skeleton className='h-[1.4rem] w-full' />
            <Skeleton className='h-[1.4rem] w-5/6' />
            <Skeleton className='h-[1.4rem] w-full' />
            <Skeleton className='h-[1.4rem] w-1/2' />
          </div>
          <div className='flex flex-col gap-[1.2rem]'>
            <div className='flex gap-[0.9rem] items-center'>
              <Skeleton className='h-[3rem] w-[4.8rem]' />
              <Skeleton className='h-[2rem] flex-1' />
            </div>
            <div className='flex gap-[0.9rem] item'>
              <Skeleton className='h-[3rem] w-[4.8rem]' />
              <Skeleton className='h-[2rem] flex-1' />
            </div>
            <div className='flex gap-[0.9rem] item'>
              <Skeleton className='h-[3rem] w-[4.8rem]' />
              <Skeleton className='h-[2rem] flex-1' />
            </div>
            <div className='flex gap-[0.9rem] item'>
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
            <div className='flex flex-col flex-1'>
              <Skeleton className='h-[2rem] w-[18.7rem] mb-[0.7rem]' />
              <Skeleton className='h-[2rem] w-[15rem] mb-[0.7rem]' />
              <Skeleton className='h-[1.4rem] w-[16rem] mb-[0.8rem]' />
              <Skeleton className='h-[2.9rem] w-[8.6rem] rounded-2xl mb-[2.2rem]' />
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
}

export default SkeletonCard;
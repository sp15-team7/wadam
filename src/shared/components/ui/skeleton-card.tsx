// components/ui/skeleton-card.tsx
import { cn } from '@/shared/libs/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { Skeleton } from '@/shared/components/ui/skeleton';

const skeletonCardVariants = cva('rounded-md border space-y-3', {
  variants: {
    variant: {
      recommend: 'w-[143px] h-[160px]',
      list: 'w-[300px] h-[180px]',
      detailTop: 'w-[400px] h-[250px]',
      detailList: 'w-[240px] h-[300px] flex flex-col items-center text-center',
    },
  },
  defaultVariants: {
    variant: 'list',
  },
});
 
type SkeletonCardProps = {
  className?: string;
} & VariantProps<typeof skeletonCardVariants>;

export function SkeletonCard({ variant, className }: SkeletonCardProps) {
  const classes = cn(skeletonCardVariants({ variant }), className);

  switch (variant) {
    case 'recommend':
      return (
        <div className={cn(classes, 'flex items-end')}>
          <Skeleton className='h-50 w-10' />
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-10 w-3/4' />
            <Skeleton className='h-3 w-1/2' />
          </div>
        </div>
      );
    case 'detailTop':
      return (
        <div className={classes}>
          <Skeleton className='h-6 w-full rounded-md' />
          <Skeleton className='h-4 w-5/6' />
          <Skeleton className='h-4 w-2/3' />
          <Skeleton className='h-4 w-1/2' />
        </div>
      );
    case 'detailList':
      return (
        <div className={classes}>
          <Skeleton className='rounded-full size-24 mb-4' />
          <Skeleton className='h-4 w-3/5' />
          <Skeleton className='h-3 w-2/4' />
        </div>
      );
    case 'list':
    default:
      return (
        <div className={classes}>
          <Skeleton className='h-5 w-full rounded' />
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
        </div>
      );
  }
}

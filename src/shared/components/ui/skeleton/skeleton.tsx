import { cn } from '@/shared/libs/utils/cn';

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted bg-secondary', className)}
      {...props}
    />
  );
}

export default Skeleton;
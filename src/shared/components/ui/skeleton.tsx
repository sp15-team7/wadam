import { cn } from '@/shared/libs/utils/cn';

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('bg-secondary animate-pulse rounded-md', className)}
      {...props}
    />
  );
};

export default Skeleton;

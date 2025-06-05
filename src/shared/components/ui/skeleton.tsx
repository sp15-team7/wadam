import { cn } from '@/shared/libs/utils/cn';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted bg-secondary', className)}
      {...props}
    />
  );
}

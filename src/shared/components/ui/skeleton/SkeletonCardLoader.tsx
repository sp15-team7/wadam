import { useQuery } from '@tanstack/react-query';
import { SkeletonCard } from './SkeletonCard';

interface SkeletonCardLoaderProps {
  queryKey: any[];
  queryFn: () => Promise<any>;
  variant: 'list' | 'recommend' | 'detailTop' | 'detailList';
  render: (data: any) => React.ReactNode;
}

export function SkeletonCardLoader({
  queryKey,
  queryFn,
  variant,
  render,
}: SkeletonCardLoaderProps) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey,
    queryFn,
  });

  // 최초 로딩 또는 리패칭 중일 때 스켈레톤 노출
  const shouldShowSkeleton = isLoading || isFetching;

  if (shouldShowSkeleton) return <SkeletonCard variant={variant} />;

  return <>{render(data)}</>;
}

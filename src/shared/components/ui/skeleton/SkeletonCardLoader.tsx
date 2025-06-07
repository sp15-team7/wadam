import { useQuery } from '@tanstack/react-query';
import SkeletonCard from './SkeletonCard';

interface SkeletonCardLoaderProps {
  queryKey: any[];
  queryFn: () => Promise<any>;
  variant: 'list' | 'recommend' | 'detailTop' | 'detailList';
  render: (data: any) => React.ReactNode;
}

const SkeletonCardLoader = ({
  queryKey,
  queryFn,
  variant,
  render,
}: SkeletonCardLoaderProps) => {
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
  });

  // 최초 로딩일 때만 스켈레톤 노출
  if (isLoading) return <SkeletonCard variant={variant} />;

  return <>{render(data)}</>;
}

export default SkeletonCardLoader;
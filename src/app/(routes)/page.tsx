import { SkeletonCard } from '@/shared/components/ui/skeleton-card';

const LandingPage = () => {
  return (
    <div>
      <SkeletonCard variant='recommend' />
      <SkeletonCard variant='list' />
      <SkeletonCard variant='detailTop' />
      <SkeletonCard variant='detailList' />
    </div>
  );
};

export default LandingPage;

import { auth } from '@/feature/auth';
import ReviewForm from '@/feature/reviews/components/review-form/ReviewFormButton';
import WineProgressChart from '@/feature/wines/components/wine-progress';
import WineDetailCardSection from '@/feature/wines/detail/components/WineDetailCardSection';
import WineDetailReviewList from '@/feature/wines/detail/components/WineDetailReviewList';
import WineFlavorProfileSection from '@/feature/wines/detail/components/WineFlavorProfileSection';
import Error from '@/shared/components/common/error';
import InnerContainer from '@/shared/components/container/InnerContainer';
import { PAGE_STYLES } from '@/shared/constants/styles';

interface WineDetailPageProps {
  params: Promise<{
    wineid: string;
  }>;
}

const WineDetailPage = async ({ params }: WineDetailPageProps) => {
  const resolvedParams = await params;
  const session = await auth();
  const wineId = Number(resolvedParams.wineid);

  // wineId가 유효하지 않은 경우 처리
  if (!wineId || isNaN(wineId) || wineId <= 0) {
    return (
      <main className='flex min-h-screen items-center justify-center'>
        <Error message='유효하지 않은 와인 정보입니다.' isRetry />
      </main>
    );
  }

  return (
    <main className={PAGE_STYLES.backgroundOverlay}>
      <h1 className='sr-only'>와인 상세 페이지</h1>
      <InnerContainer className='mt-[6.4rem] pb-[13.2rem]'>
        <WineDetailCardSection
          wineId={wineId}
          currentUserId={session?.user?.id}
        />
        <WineFlavorProfileSection wineId={wineId} />
        <section className='mt-[5.8rem] flex gap-[6rem]'>
          <article className='flex-1'>
            <WineDetailReviewList
              wineId={wineId}
              currentUserId={session?.user?.id}
            />
          </article>
          <div className='relative w-[28rem] flex-none'>
            <aside className='sticky top-[10rem]'>
              <WineProgressChart wineId={wineId} />
              <ReviewForm wineId={wineId} />
            </aside>
          </div>
        </section>
      </InnerContainer>
    </main>
  );
};

export default WineDetailPage;

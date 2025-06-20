import { auth } from '@/feature/auth';
import ReviewForm from '@/feature/reviews/components/review-form/ReviewFormButton';
import WineProgressChart from '@/feature/wines/components/wine-progress';
import WineDetailCardSection from '@/feature/wines/detail/components/WineDetailCardSection';
import WineDetailReviewList from '@/feature/wines/detail/components/WineDetailReviewList';
import WineFlavorProfileSection from '@/feature/wines/detail/components/WineFlavorProfileSection';
import ErrorDisplay from '@/shared/components/common/error-display';
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
        <ErrorDisplay message='유효하지 않은 와인 정보입니다.' isRetry />
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
        <section className='mt-[4.8rem] flex flex-col-reverse gap-[6rem] md:mt-[5.8rem] lg:flex-row'>
          <article className='flex-1'>
            <WineDetailReviewList
              wineId={wineId}
              currentUserId={session?.user?.id}
            />
          </article>
          <div className='relative w-full flex-none md:px-[6rem] lg:w-[28rem] lg:px-0'>
            <aside className='lg:sticky lg:top-[10rem]'>
              <WineProgressChart wineId={wineId} />
              <div className='absolute top-0 right-0 md:top-auto md:right-auto md:bottom-[1.8rem] md:left-[6rem] lg:static lg:mt-[3rem]'>
                <ReviewForm wineId={wineId} />
              </div>
            </aside>
          </div>
        </section>
      </InnerContainer>
    </main>
  );
};

export default WineDetailPage;

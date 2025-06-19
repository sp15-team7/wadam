import { auth } from '@/feature/auth/libs/auth';
import ReviewForm from '@/feature/reviews/components/review-form/ReviewFormButton';
import WineTasteSlider from '@/feature/reviews/components/wine-taste-slider';
import DetailCard from '@/feature/wines/components/card/DetailCard';
import WineProgressChart from '@/feature/wines/components/wine-progress';
import WineDetailReviewList from '@/feature/wines/detail/components/WineDetailReviewList';
import WineDetailTitle from '@/feature/wines/detail/components/WineDetailTitle';
import { mockWine } from '@/feature/wines/mocks';
import { GetWineDetailResponse } from '@/feature/wines/schema/wine.schema';
import SkeletonCard from '@/shared/components/common/skeleton-card';
import InnerContainer from '@/shared/components/container/InnerContainer';
import { PAGE_STYLES } from '@/shared/constants/styles';

async function fetchWineDetail(wineId: string): Promise<GetWineDetailResponse> {
  return { ...mockWine, id: Number(wineId) };
}

async function getCurrentUser(): Promise<number | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

const WineDetailPage = async ({ params }: { params: { wineid: string } }) => {
  const { wineid } = params;
  const [wineDetail, currentUser] = await Promise.all([
    fetchWineDetail(wineid),
    getCurrentUser(),
  ]);

  if (!wineDetail) {
    return (
      <InnerContainer className='py-20 text-center'>
        <p className='text-2xl font-bold'>와인 정보를 찾을 수 없습니다.</p>
      </InnerContainer>
    );
  }

  return (
    <main className={PAGE_STYLES.backgroundOverlay}>
      <h1 className='sr-only'>와인 상세 페이지</h1>
      <InnerContainer className='mt-[6.4rem] pb-[13.2rem]'>
        <DetailCard wine={wineDetail} currentUser={currentUser} />
        <section className='mt-[5.4rem] grid grid-cols-2 gap-[6rem]'>
          <div>
            <WineDetailTitle title='어떤 맛이 나나요?' count={47} />
            <WineTasteSlider />
          </div>
          <div>
            <WineDetailTitle title='어떤 향이 있나요?' count={47} />
            <div>향 컴포넌트가 들어갑니다</div>
          </div>
        </section>
        <section className='mt-[5.8rem] flex gap-[6rem]'>
          <article className='flex-1'>
            <WineDetailTitle title='리뷰 목록' />
            <SkeletonCard variant='myReview' />
            <WineDetailReviewList />
          </article>
          <div className='relative w-[28rem] flex-none'>
            <aside className='sticky top-[10rem]'>
              <div>
                <WineProgressChart />
              </div>
              <div>
                <ReviewForm wineId={wineDetail.id} wineName={wineDetail.name} />
              </div>
            </aside>
          </div>
        </section>
      </InnerContainer>
    </main>
  );
};

export default WineDetailPage;

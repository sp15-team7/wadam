import { auth } from '@/feature/auth/libs/auth';
import WineTasteSlider from '@/feature/reviews/components/wine-taste-slider';
import DetailCard from '@/feature/wines/components/card/DetailCard';
import WineProgressChart from '@/feature/wines/components/wine-progress';
import WineAromaCards from '@/feature/wines/detail/components/WineAromaCards';
import WineDetailReviewList from '@/feature/wines/detail/components/WineDetailReviewList';
import WineDetailTitle from '@/feature/wines/detail/components/WineDetailTitle';
import { getWineDetail } from '@/feature/wines/services/wine.service';
import InnerContainer from '@/shared/components/container/InnerContainer';
import { Button } from '@/shared/components/ui/button';
import { PAGE_STYLES } from '@/shared/constants/styles';

async function getCurrentUser(): Promise<number | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

const WineDetailPage = async ({ params }: { params: { wineid: string } }) => {
  const { wineid } = params;
  const session = await auth();

  // 세션이 없으면 로그인 페이지로 안내
  if (!session?.user) {
    return (
      <InnerContainer className='py-20 text-center'>
        <p className='text-2xl font-bold'>로그인이 필요합니다.</p>
      </InnerContainer>
    );
  }

  const [wineDetail, currentUser] = await Promise.all([
    getWineDetail(Number(wineid)),
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
          <div className='flex flex-col gap-[3rem]'>
            <WineDetailTitle title='어떤 맛이 나나요?' count={47} />
            <WineTasteSlider />
          </div>
          <div className='flex flex-col gap-[3rem]'>
            <WineDetailTitle title='어떤 향이 있나요?' count={47} />
            <WineAromaCards />
          </div>
        </section>
        <section className='mt-[5.8rem] flex gap-[6rem]'>
          <article className='flex-1'>
            <WineDetailTitle title='리뷰 목록' />
            <WineDetailReviewList />
          </article>
          <div className='relative w-[28rem] flex-none'>
            <aside className='sticky top-[10rem]'>
              <div>
                <WineProgressChart />
              </div>
              <Button className='mt-[3rem] h-[4.2rem] w-[11.3rem] px-[2rem] text-[1.6rem] font-bold whitespace-nowrap'>
                리뷰 남기기
              </Button>
            </aside>
          </div>
        </section>
      </InnerContainer>
    </main>
  );
};

export default WineDetailPage;

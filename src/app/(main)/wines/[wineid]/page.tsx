import { auth } from '@/feature/auth';
import WineProgressChart from '@/feature/wines/components/wine-progress';
import WineDetailClient from '@/feature/wines/detail/components/WineDetailCardSection';
import WineDetailReviewList from '@/feature/wines/detail/components/WineDetailReviewList';
import WineDetailTitle from '@/feature/wines/detail/components/WineDetailTitle';
import WineFlavorProfileSection from '@/feature/wines/detail/components/WineFlavorProfileSection';
import InnerContainer from '@/shared/components/container/InnerContainer';
import { Button } from '@/shared/components/ui/button';
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
  if (!wineId || isNaN(wineId)) {
    return (
      <main className='flex min-h-screen items-center justify-center'>
        <div>유효하지 않은 와인 ID입니다.</div>
      </main>
    );
  }

  return (
    <main className={PAGE_STYLES.backgroundOverlay}>
      <h1 className='sr-only'>와인 상세 페이지</h1>
      <InnerContainer className='mt-[6.4rem] pb-[13.2rem]'>
        <WineDetailClient wineId={wineId} currentUserId={session?.user?.id} />
        <WineFlavorProfileSection wineId={wineId} />
        <section className='mt-[5.8rem] flex gap-[6rem]'>
          <article className='flex-1'>
            <WineDetailTitle title='리뷰 목록' />
            <WineDetailReviewList />
          </article>
          <div className='relative w-[28rem] flex-none'>
            <aside className='sticky top-[10rem]'>
              <WineProgressChart wineId={wineId} />
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

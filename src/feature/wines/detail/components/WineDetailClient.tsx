'use client';

import WineTasteSlider from '@/feature/reviews/components/wine-taste-slider';
import DetailCard from '@/feature/wines/components/card/DetailCard';
import WineProgressChart from '@/feature/wines/components/wine-progress';
import WineAromaCards from '@/feature/wines/detail/components/WineAromaCards';
import WineDetailReviewList from '@/feature/wines/detail/components/WineDetailReviewList';
import WineDetailTitle from '@/feature/wines/detail/components/WineDetailTitle';
import { useWineDetail } from '@/feature/wines/hooks/useWineDetailsQuery';
import InnerContainer from '@/shared/components/container/InnerContainer';
import { Button } from '@/shared/components/ui/button';
import { PAGE_STYLES } from '@/shared/constants/styles';

interface WineDetailClientProps {
  wineId: number;
  isAuthenticated: boolean;
  currentUserId?: number;
}

export default function WineDetailClient({
  isAuthenticated,
  currentUserId,
  wineId,
}: WineDetailClientProps) {
  const {
    data: wineDetail,
    isLoading: wineLoading,
    isError,
  } = useWineDetail({
    wineId,
    enabled: isAuthenticated && !!wineId,
  });

  if (wineLoading) return <div>로딩중...</div>;

  if (isError) return <div>와인 정보를 불러올 수 없습니다.</div>;

  return (
    <main className={PAGE_STYLES.backgroundOverlay}>
      <h1 className='sr-only'>와인 상세 페이지</h1>
      <InnerContainer className='mt-[6.4rem] pb-[13.2rem]'>
        {wineDetail?.recentReview && (
          <DetailCard wine={wineDetail} currentUser={currentUserId || 0} />
        )}
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
}

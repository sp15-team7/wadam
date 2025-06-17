import { auth } from '@/feature/auth/libs/auth';
import WineTasteSlider from '@/feature/reviews/components/wine-taste-slider';
import DetailCard from '@/feature/wines/components/card/DetailCard';
import WineDetailTitle from '@/feature/wines/detail/components/WineDetailTitle';
import { mockWine } from '@/feature/wines/mocks';
import { GetWineDetailResponse } from '@/feature/wines/schema/wine.schema';
import InnerContainer from '@/shared/components/container/InnerContainer';
import { PAGE_STYLES } from '@/shared/constants/styles';

async function fetchWineDetail(wineId: string): Promise<GetWineDetailResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const wine = { ...mockWine, id: Number(wineId) }; // 또는 Number(wineId)
      resolve(wine);
    }, 1000);
  });
}

async function getCurrentUser(): Promise<number | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

export default async function WineDetailPage({
  params,
}: {
  params: { wineId: string };
}) {
  const { wineId } = await params;

  const [wineDetail, currentUser] = await Promise.all([
    fetchWineDetail(wineId),
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
      <InnerContainer className='mt-[6.4rem]'>
        <DetailCard wine={wineDetail} currentUser={currentUser} />
        <div className='mt-[5.4rem] grid grid-cols-2 gap-[6rem]'>
          <div>
            <WineDetailTitle title='어떤 맛이 나나요?' count={47} />
            <WineTasteSlider />
          </div>
          <div>향 컴포넌트가 들어갑니다</div>
        </div>
      </InnerContainer>
    </main>
  );
}

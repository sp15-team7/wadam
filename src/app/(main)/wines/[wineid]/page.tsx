import { auth } from '@/feature/auth/libs/auth';
import DetailCard from '@/feature/wines/components/card/DetailCard';
import { mockWine } from '@/feature/wines/mocks';
import { GetWineDetailResponse } from '@/feature/wines/schema/wine.schema';
import InnerContainer from '@/shared/components/container/InnerContainer';

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

// 와인 상세 페이지 배경 컬러
const WINE_DETAIL_STYLE = {
  bg: 'after:content-[""] after:absolute after:top-[-17.4rem] after:left-0 after:w-full after:h-[calc(100dvh+17.4rem)] after:bg-[#ffffff] after:z-[-1] relative z-[2]',
};

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
    <main className={WINE_DETAIL_STYLE.bg}>
      <InnerContainer className='mt-[6.4rem]'>
        <DetailCard wine={wineDetail} currentUser={currentUser} />
      </InnerContainer>
    </main>
  );
}

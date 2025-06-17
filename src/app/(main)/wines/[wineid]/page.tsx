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

// Next.js 서버 컴포넌트
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
    <main>
      <InnerContainer className='mt-[6.4rem]'>
        <DetailCard wine={wineDetail} currentUser={currentUser} />
      </InnerContainer>
    </main>
  );
}

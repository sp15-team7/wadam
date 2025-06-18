import { auth } from '@/feature/auth';
import WineDetailClient from '@/feature/wines/detail/components/WineDetailClient';

interface WineDetailPageProps {
  params: Promise<{
    wineid: string;
  }>;
}

export default async function WineDetailPage({ params }: WineDetailPageProps) {
  const resolvedParams = await params;
  const wineId = Number(resolvedParams.wineid);

  // wineId가 유효하지 않은 경우 처리
  if (!wineId || isNaN(wineId)) {
    return (
      <main className='flex min-h-screen items-center justify-center'>
        <div>유효하지 않은 와인 ID입니다.</div>
      </main>
    );
  }

  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <WineDetailClient
      wineId={wineId}
      isAuthenticated={isAuthenticated}
      currentUserId={session?.user?.id}
    />
  );
}

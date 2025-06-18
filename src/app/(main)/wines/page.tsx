import MonthlyWineSection from '@/feature/wines/components/MonthlyWineSection';
import { getWineDetail } from '@/feature/wines/services/wine.service';
import InnerContainer from '@/shared/components/container/InnerContainer';

const WinesPage = async () => {
  const result = await getWineDetail(1112);
  console.log('result:', result);

  return (
    <main>
      <InnerContainer>
        <h1 className='sr-only'>와인 목록 페이지</h1>
        <MonthlyWineSection />
      </InnerContainer>
    </main>
  );
};

export default WinesPage;

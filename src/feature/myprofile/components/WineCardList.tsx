'use client';

/**
 * @author: Hyun
 * @since: 2025-06-18
 * @description: 내가 등록한 와인 리스트 (ReviewCardList와 로직이 거의 같은 컴포넌트)
 * 흐름: useEffect로 내가 등록한 와인을 가져와 setWines에 저장 -> 화면에 뿌려줌(로딩 상태 표시/에러 상태 표시/빈 상태 표시/와인 카드 렌더링)
 */

import React, { useEffect, useState } from 'react';

import { getUserWines, Wine } from '@/feature/libs/api/userApi'; // Import getUserWines and Wine type
import DetailCard from '@/feature/wines/components/card/DetailCard';
import { GetWineDetailResponse } from '@/feature/wines/schema/wine.schema';

interface WineCardListProps {
  accessToken: string;
}

const WineCardList: React.FC<WineCardListProps> = ({ accessToken }) => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserWines = async () => {
      if (!accessToken) return;

      try {
        setLoading(true);
        setError(null);

        const data = await getUserWines(accessToken);
        setWines(Array.isArray(data.list) ? data.list : []);
      } catch (error) {
        console.error('와인 데이터 로딩 실패:', error);
        setError('와인을 불러오는 데 실패했습니다.');
        setWines([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserWines();
  }, [accessToken]);

  // 로딩 상태 표시 - 임시적으로 개발 (추후 개발된 스피너로 대체예정)
  if (loading) {
    return (
      <div className='py-12 text-center text-gray-500'>
        와인을 불러오는 중...
      </div>
    );
  }

  // 에러 상태 표시 (추후 개발된 에러 메시지로 대체예정)
  if (error) {
    return <div className='py-12 text-center text-red-500'>에러: {error}</div>;
  }

  // 빈 상태 (와인이 없을 때) - 추후 위 컴포넌트로 빼기
  if (wines.length === 0) {
    return (
      <div className='py-12 text-center'>
        <div className='mb-4 text-gray-400'>
          <svg
            className='mx-auto h-16 w-16'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            {/* 원 테두리 및 느낌표 막대 */}
            <path
              fillRule='evenodd'
              d='M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-1 0A7 7 0 1 1 3 10a7 7 0 0 1 14 0zM10 6a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1z'
              clipRule='evenodd'
            />
            {/* 점(일자 표시)만 별도로, x좌표를 살짝 왼쪽으로 이동 */}
            <rect x='9.2' y='13' width='1.6' height='2' rx='0.8' />
          </svg>
        </div>
        <h3 className='mb-2 text-lg font-medium text-gray-900'>
          등록한 와인이 없습니다.
        </h3>
        <p className='text-gray-600'>새로운 와인을 등록해보세요!</p>
      </div>
    );
  }

  return (
    <div className='w-full px-6 pb-6'>
      {/* 와인 리스트 - 카드 간격 조정 */}
      <div className='mt-10 w-full space-y-6'>
        {wines.map((wine) => (
          <div key={wine.id} className='mt-20 w-full'>
            <DetailCard
              wine={wine as unknown as GetWineDetailResponse}
              currentUser={wine.userId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineCardList;

// 내가 등록한 와인 리스트

import React, { useEffect, useState } from 'react';

import { getUserWines, Wine } from '@/feature/libs/api/userApi'; // Import getUserWines and Wine type
import WineCard from '@/feature/wines/components/card/WineCard';

interface WineCardListProps {
  accessToken: string;
}

const WineCardList: React.FC<WineCardListProps> = ({ accessToken }) => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserWines = async () => {
      try {
        setLoading(true);
        const data = await getUserWines(accessToken);
        console.log('user wines:', data);
        setWines(Array.isArray(data.list) ? data.list : []);
      } catch (err: unknown) {
        console.error('Failed to fetch user wines:', err);
        setError('와인을 불러오는 데 실패했습니다.');
        setWines([]);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchUserWines();
    }
  }, [accessToken]);

  if (loading) {
    return (
      <div className='py-12 text-center text-gray-500'>
        와인을 불러오는 중...
      </div>
    );
  }

  if (error) {
    return <div className='py-12 text-center text-red-500'>에러: {error}</div>;
  }

  return (
    <div className='w-full p-6'>
      {/* 와인 리스트 - 카드 너비에 맞게 조정 */}
      <div className='w-full space-y-4'>
        {wines.map((wine) => (
          <div
            key={wine.id}
            className='w-full border-b border-gray-100 pb-4 last:border-b-0 last:pb-0'
          >
            <div className='w-full overflow-hidden'>
              <WineCard
                wine={{ ...wine, recentReview: wine.recentReview ?? null }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 빈 상태 (와인이 없을 때) */}
      {wines.length === 0 && (
        <div className='py-12 text-center'>
          <div className='mb-4 text-gray-400'>
            <svg
              className='mx-auto h-16 w-16'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M12 6V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2H4a1 1 0 000 2h1v10a2 2 0 002 2h6a2 2 0 002-2V8h1a1 1 0 100-2h-2zM8 4h2v2H8V4zm6 14H6V8h8v10z' />
            </svg>
          </div>
          <h3 className='mb-2 text-lg font-medium text-gray-900'>
            등록한 와인이 없습니다
          </h3>
          <p className='mb-4 text-gray-600'>새로운 와인을 등록해보세요!</p>
          <button className='rounded-lg bg-red-500 px-6 py-2 text-white transition-colors hover:bg-red-600'>
            와인 등록하기
          </button>
        </div>
      )}
    </div>
  );
};

export default WineCardList;

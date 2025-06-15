'use client';
import DetailCard from '@/feature/wines/components/card/DetailCard';
import MonthlyCard from '@/feature/wines/components/card/MonthlyCard';
import { ReviewCard } from '@/feature/wines/components/card/ReviewCard';
import WineCard from '@/feature/wines/components/card/WineCard';
import { AromaType } from '@/feature/wines/schema/wine.schema';

const CardPage = () => {
  const mockWine = {
    id: 1,
    name: 'Sentinel Carbernet Sauvignon 2016',
    region: 'Western Cape, South Africa',
    image: '/images/wines/image-wine1.png',
    price: 50000,
    type: 'RED',
    avgRating: 4.5,
    reviewCount: 10,
    recentReview: {
      id: 1,
      rating: 4.5,
      aroma: ['CHERRY', 'BERRY'] as AromaType[],
      content:
        'Deep maroon color, tasting notes of blackberry, dark chocolate, plum. Super jammy and bold with some smoky after notes. Big flavor. Amazing value (would pay three times the price for it), well balanced flavor. Could drink all day everyday with or without food. I need more immediately.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        id: 1,
        nickname: '사용자1',
        image: null,
      },
      lightBold: 4.2,
      smoothTannic: 3.8,
      drySweet: 4.0,
      softAcidic: 3.9,
      isLiked: false,
    },
    userId: 1,
    reviews: [],
    avgRatings: {
      lightBold: 4.2,
      smoothTannic: 3.8,
      drySweet: 4.0,
      softAcidic: 3.9,
    },
  };

  return (
    <div className='flex flex-col gap-6'>
      <MonthlyCard wine={mockWine} />
      <WineCard wine={mockWine} />
      <DetailCard wine={mockWine} />
      <ReviewCard review={mockWine.recentReview} />
      <ReviewCard review={mockWine.recentReview} />
    </div>
  );
};
export default CardPage;

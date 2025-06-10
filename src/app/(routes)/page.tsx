'use client';
import StarRating from '@/shared/components/common/star-rating';
import { useState } from 'react';

const LandingPage = () => {
  const [rating, setRating] = useState(3);
  return (
    <div>
      <StarRating value={rating} onChange={setRating} readOnly={false} />
    </div>
  );
};
export default LandingPage;
 
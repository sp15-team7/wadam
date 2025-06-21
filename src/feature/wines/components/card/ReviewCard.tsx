'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import WineTasteSlider from '@/feature/reviews/components/wine-taste-slider';
import { formatRelativeTime } from '@/feature/reviews/utils/formatRelativeTime';
import CardDropdownMenu from '@/feature/wines/components/button/CardDropdownMenu';
import LikeButton from '@/feature/wines/components/button/LikeButton';
import { WineDetailReview } from '@/feature/wines/schema/wine.schema';
import { formatAromaType } from '@/feature/wines/utils/formatWineType';
import UserAvatar from '@/shared/components/common/user-avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';

const ReviewCard = ({
  review,
  currentUser,
  wineId,
}: {
  review: WineDetailReview;
  currentUser: number;
  wineId: number;
}) => {
  const [open, setOpen] = useState(false);
  const {
    id: reviewId,
    aroma,
    content,
    createdAt,
    rating,
    user,
    isLiked,
    lightBold,
    smoothTannic,
    drySweet,
    softAcidic,
  } = review;
  const taste = {
    바디감: lightBold,
    타닌: smoothTannic,
    당도: drySweet,
    산미: softAcidic,
  };

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className='border-secondary rounded-4xl border bg-white p-8 md:p-12'
    >
      {/* 요약 정보 */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <UserAvatar className='size-[4.2rem] md:size-[6.4rem]' />
          <div>
            <div className='text-[1.6rem] font-semibold md:text-[1.8rem]'>
              {user.nickname}
            </div>
            <div className='text-secondary text-[1.4rem] md:text-[1.6rem]'>
              {formatRelativeTime(createdAt)}
            </div>
          </div>
        </div>

        {/* 평점, 좋아요, 메뉴 */}
        <div className='flex items-center gap-10'>
          <LikeButton isLiked={isLiked} reviewId={reviewId} wineId={wineId} />
          {currentUser === user.id && <CardDropdownMenu />}
        </div>
      </div>

      {/* 태그 */}
      <div className='mt-6 flex justify-between'>
        <div className='flex flex-1 flex-wrap gap-2'>
          {aroma.map((tag) => (
            <span
              key={tag}
              className='flex-center border-secondary w-fit rounded-full border px-4 py-2 text-[1.4rem] font-semibold md:px-5 md:py-3 md:text-[1.6rem]'
            >
              {formatAromaType(tag)}
            </span>
          ))}
        </div>
        <div className='flex-center bg-secondary text-primary w-[6rem] self-start rounded-full px-4 py-2 text-[1.4rem] font-semibold md:w-[7.2rem] md:px-5 md:py-3 md:text-[1.6rem]'>
          ★ {rating.toFixed(1)}
        </div>
      </div>

      {/* 펼쳐진 내용 */}
      <CollapsibleContent className='space-y-4 pt-4 text-[1.4rem] md:space-y-8 md:pt-8 md:text-[1.6rem]'>
        <p>{content}</p>
        <WineTasteSlider values={taste} />
      </CollapsibleContent>
      {/* 펼치기 버튼 */}
      <CollapsibleTrigger asChild>
        <button className='flex-center text-gray mt-4 w-full text-center'>
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </CollapsibleTrigger>
    </Collapsible>
  );
};

export default ReviewCard;

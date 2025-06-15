'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import CardDropdownMenu from '@/feature/wines/components/button/CardDropdownMenu';
import LikeButton from '@/feature/wines/components/button/LikeButton';
import { ReviewDetail } from '@/feature/wines/schema/wine.schema';
import UserAvatar from '@/shared/components/common/user-avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';

export function ReviewCard({ review }: { review: ReviewDetail }) {
  const [open, setOpen] = useState(false);
  const { aroma, content, createdAt, rating, user, isLiked } = review;

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className='border-secondary w-[34.3rem] rounded-4xl border p-8 md:w-[70.4rem] md:p-12 lg:w-[80rem]'
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
              {createdAt}
            </div>
          </div>
        </div>

        {/* 평점, 좋아요, 메뉴 */}
        <div className='flex items-center gap-10'>
          <LikeButton isLiked={isLiked} />
          <CardDropdownMenu />
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
              {tag}
            </span>
          ))}
        </div>
        <div className='flex-center bg-secondary text-primary w-[6rem] self-start rounded-full px-4 py-2 text-[1.4rem] font-semibold md:w-[7.2rem] md:px-5 md:py-3 md:text-[1.6rem]'>
          ★ {rating}
        </div>
      </div>

      {/* 펼쳐진 내용 */}
      <CollapsibleContent className='space-y-4 pt-4 text-[1.4rem] md:space-y-8 md:pt-8 md:text-[1.6rem]'>
        <p>{content}</p>

        {/* 슬라이더 UI (예시용, 실제 구현은 range input 또는 UI 라이브러리 사용) */}
        <div className='space-y-2'></div>
      </CollapsibleContent>
      {/* 펼치기 버튼 */}
      <CollapsibleTrigger asChild>
        <button className='flex-center text-gray mt-4 w-full text-center'>
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </CollapsibleTrigger>
    </Collapsible>
  );
}

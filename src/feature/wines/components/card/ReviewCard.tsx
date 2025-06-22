'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import DeleteForm from '@/feature/reviews/components/form/DeleteForm';
import EditReviewForm from '@/feature/reviews/components/review-form/EditReviewForm';
import WineTasteSlider from '@/feature/reviews/components/wine-taste-slider';
import { MyReviewWithWine } from '@/feature/reviews/schemas/reviews.schema';
import { formatRelativeTime } from '@/feature/reviews/utils/formatRelativeTime';
import CardDropdownMenu from '@/feature/wines/components/button/CardDropdownMenu';
import LikeButton from '@/feature/wines/components/button/LikeButton';
import {
  GetWineDetailResponse,
  WineDetailReview,
} from '@/feature/wines/schema/wine.schema';
import { formatAromaType } from '@/feature/wines/utils/formatWineType';
import UserAvatar from '@/shared/components/common/user-avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';
import { useModalStore } from '@/shared/stores/useModalStore';

const ReviewCard = ({
  review,
  currentUser,
  wineId,
  wineDetail,
  onReviewUpdate,
}: {
  review: WineDetailReview;
  currentUser: number;
  wineId: number;
  wineDetail?: GetWineDetailResponse;
  onReviewUpdate?: () => void;
}) => {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { open, isOpen } = useModalStore();

  const deleteModalId = `delete-review-${review.id}`;

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

  // 리뷰 수정 핸들러
  const handleEditClick = () => {
    setShowEditModal(true);
  };

  // 리뷰 수정 모달 닫기
  const handleEditClose = () => {
    setShowEditModal(false);
  };

  // 리뷰 수정 성공 핸들러
  const handleEditSuccess = () => {
    setShowEditModal(false);
    toast.success('리뷰가 수정되었습니다.');
    // 부모 컴포넌트에 리뷰 업데이트 알림
    onReviewUpdate?.();
  };

  // 리뷰 삭제 핸들러
  const handleDeleteClick = () => {
    open(deleteModalId);
  };

  // 리뷰 삭제 모달 닫기
  const handleDeleteClose = () => {
    // 모달은 DeleteForm에서 닫힘
  };

  // WineDetailReview를 MyReviewWithWine 형태로 변환
  const reviewForEdit: MyReviewWithWine = {
    id: reviewId,
    content,
    rating,
    aroma,
    createdAt,
    updatedAt: review.updatedAt,
    user,
    lightBold,
    smoothTannic,
    drySweet,
    softAcidic,
    wine: {
      id: wineId,
      name: wineDetail?.name || '',
      region: wineDetail?.region || '',
      image: wineDetail?.image || '',
      price: wineDetail?.price || 0,
      avgRating: wineDetail?.avgRating || 0,
      type: wineDetail?.type || 'RED',
    },
  };

  return (
    <>
      <Collapsible
        open={collapsibleOpen}
        onOpenChange={setCollapsibleOpen}
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
            {currentUser === user.id ? (
              <CardDropdownMenu
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
              />
            ) : (
              <LikeButton
                isLiked={isLiked}
                reviewId={reviewId}
                wineId={wineId}
              />
            )}
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
          <button
            type='button'
            className='flex-center text-gray mt-4 w-full text-center'
          >
            {collapsibleOpen ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
        </CollapsibleTrigger>
      </Collapsible>

      {/* 리뷰 수정 모달 */}
      {showEditModal && (
        <EditReviewForm
          review={reviewForEdit}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* 리뷰 삭제 모달 */}
      {isOpen(deleteModalId) && (
        <DeleteForm
          reviewId={reviewId}
          onReviewUpdate={onReviewUpdate || (() => {})}
          onClose={handleDeleteClose}
          type='review'
          modalId={deleteModalId}
        />
      )}
    </>
  );
};

export default ReviewCard;

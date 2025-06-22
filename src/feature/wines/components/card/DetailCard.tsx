'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import DeleteForm from '@/feature/reviews/components/form/DeleteForm';
import CardDropdownMenu from '@/feature/wines/components/button/CardDropdownMenu';
import { GetWineDetailResponse } from '@/feature/wines/schema/wine.schema';
import { Card, CardContent } from '@/shared/components/ui/card';
import { useModalStore } from '@/shared/stores/useModalStore';

const DetailCard = ({
  wine,
  currentUser,
  onEditClick,
  onDeleteSuccess,
}: {
  wine: GetWineDetailResponse;
  currentUser?: number | null;
  onEditClick?: () => void;
  onDeleteSuccess?: () => void;
}) => {
  const { open, isOpen } = useModalStore();
  const { name, region, image, price } = wine;
  const pathname = usePathname();
  const isWineDetailPage = pathname.startsWith('/wines/');

  const deleteModalId = `delete-wine-${wine.id}`;

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = () => {
    open(deleteModalId);
  };

  // 삭제 모달 닫기
  const handleDeleteClose = () => {
    // 모달은 DeleteForm에서 닫힘
  };

  return (
    <>
      <Card className='h-[19rem] md:h-[26rem]'>
        <CardContent className='flex h-full items-end gap-[2rem] px-[2rem] md:gap-[6rem] md:px-[6rem] lg:gap-[8rem] lg:px-[8rem]'>
          <figure
            className='relative h-[20.9rem] w-[5.8rem] flex-shrink-0 overflow-hidden md:h-[30.6rem] md:w-[10rem]'
            aria-label='와인 이미지'
          >
            <Image
              src={image}
              alt='와인 이미지'
              fill
              className='!top-auto !bottom-[-1rem] w-full object-contain object-bottom'
            />
          </figure>

          <article className='relative flex h-full w-full flex-col justify-center gap-[2rem]'>
            <header className='flex justify-between gap-4'>
              <h2 className='max-w-[19rem] text-[2rem] leading-tight font-semibold md:max-w-[30rem] md:text-[3rem]'>
                {name}
              </h2>
              <div className='flex items-center'>
                {!isWineDetailPage &&
                  currentUser &&
                  currentUser === wine.userId && (
                    <CardDropdownMenu
                      onEditClick={onEditClick}
                      onDeleteClick={handleDeleteClick}
                    />
                  )}
              </div>
            </header>

            <p className='text-[1.6rem] text-gray-800'>{region}</p>

            <footer>
              <strong className='bg-secondary text-primary w-fit rounded-full px-4 py-1.5 text-[1.4rem] font-bold md:text-[1.8rem]'>
                ₩ {price.toLocaleString()}
              </strong>
            </footer>
          </article>
        </CardContent>
      </Card>

      {/* 와인 삭제 모달 */}
      {isOpen(deleteModalId) && (
        <DeleteForm
          wineId={wine.id}
          onReviewUpdate={onDeleteSuccess || (() => {})}
          onClose={handleDeleteClose}
          type='wine'
          modalId={deleteModalId}
        />
      )}
    </>
  );
};

export default DetailCard;

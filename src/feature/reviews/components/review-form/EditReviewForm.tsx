'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { updateReview } from '@/feature/myprofile/services/user.service';
import WineTasteSlider from '@/feature/reviews/components/wine-taste-slider';
import {
  MyReviewWithWine,
  UpdateReviewRequest,
  updateReviewRequestSchema,
  UpdateReviewResponse,
} from '@/feature/reviews/schemas/reviews.schema';
import WineFlavors from '@/feature/wines/components/wine-flavors';
import { AromaType } from '@/feature/wines/schema/wine.schema';
import {
  Modal,
  ModalContent,
  ModalFooter,
} from '@/shared/components/common/modal';
import StarRating from '@/shared/components/common/star-rating';
import { Button } from '@/shared/components/ui/button';
import { useModalStore } from '@/shared/stores/useModalStore';

interface EditReviewFormProps {
  review: MyReviewWithWine;
  onClose: () => void;
  onSuccess?: (updatedReview: UpdateReviewResponse) => void;
}

const EditReviewForm = ({
  review,
  onClose,
  onSuccess,
}: EditReviewFormProps) => {
  const { open, close } = useModalStore();
  const [selectedAromas, setSelectedAromas] = useState<string[]>(
    review.aroma || [],
  );

  // 컴포넌트가 마운트될 때 모달 열기
  useEffect(() => {
    open('EditReviewForm');
    return () => {
      close('EditReviewForm');
    };
  }, [open, close]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateReviewRequest>({
    resolver: zodResolver(updateReviewRequestSchema),
    defaultValues: {
      content: review.content,
      rating: review.rating,
      aroma: review.aroma || [],
      lightBold: review.lightBold,
      smoothTannic: review.smoothTannic,
      drySweet: review.drySweet,
      softAcidic: review.softAcidic,
    },
  });

  // 컴포넌트가 마운트될 때 폼 값들을 다시 설정
  useEffect(() => {
    reset({
      content: review.content,
      rating: review.rating,
      aroma: review.aroma || [],
      lightBold: review.lightBold,
      smoothTannic: review.smoothTannic,
      drySweet: review.drySweet,
      softAcidic: review.softAcidic,
    });
    setSelectedAromas(review.aroma || []);
  }, [review, reset]);

  const onSubmit = async (data: UpdateReviewRequest) => {
    try {
      const updatedReview = await updateReview(review.id, data);

      if (onSuccess) {
        onSuccess(updatedReview);
      }

      toast.success('리뷰가 수정되었습니다.');
      onClose(); // 모달 닫기
    } catch (error) {
      console.error('리뷰 수정 실패:', error);
      // toast.error('리뷰 수정에 실패했습니다.');
    }
  };

  // WineFlavors 컴포넌트에서 선택된 향을 처리
  const handleAromaChange = (aromas: string[]) => {
    setSelectedAromas(aromas);
    setValue('aroma', aromas as AromaType[], { shouldValidate: true });
  };

  return (
    <Modal
      modalId='EditReviewForm'
      title='수정하기'
      showCloseButton
      onClose={onClose}
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-5 flex items-center gap-4'>
            <Image
              src={review.wine.image ?? '/icons/ui/icon-default-wine.svg'}
              alt='와인 이미지'
              width={32}
              height={32}
              className='mr-2'
            />
            <div className='flex flex-col'>
              <p className='txt-md-bold md:txt-lg-bold mb-2.5'>
                {review.wine.name}
              </p>
              <StarRating
                value={watch('rating')}
                onChange={(val) =>
                  setValue('rating', val, { shouldValidate: true })
                }
                readOnly={false}
                size='md'
              />
              {errors.rating && (
                <span className='text-primary text-xs'>
                  {errors.rating.message}
                </span>
              )}
            </div>
          </div>

          <textarea
            {...register('content')}
            className='border-secondary placeholder:txt-sm-regular txt-sm-regular md:txt-md-regular h-[10rem] w-full resize-none rounded-2xl border p-4 md:h-[12rem]'
            placeholder='후기를 작성해주세요.'
          />
          {errors.content && (
            <span className='text-primary text-xs'>
              {errors.content.message}
            </span>
          )}

          <p className='txt-lg-bold md:txt-2lg-bold mt-10 mb-7'>
            와인의 맛은 어땠나요?
          </p>
          <WineTasteSlider
            values={{
              바디감: watch('lightBold'),
              타닌: watch('smoothTannic'),
              당도: watch('drySweet'),
              산미: watch('softAcidic'),
            }}
            onChange={(values) => {
              setValue('lightBold', values['바디감'], { shouldValidate: true });
              setValue('smoothTannic', values['타닌'], {
                shouldValidate: true,
              });
              setValue('drySweet', values['당도'], { shouldValidate: true });
              setValue('softAcidic', values['산미'], { shouldValidate: true });
            }}
          />

          <p className='txt-lg-bold md:txt-2lg-bold mt-10 mb-7'>
            기억에 남는 향이 있나요?
          </p>
          <WineFlavors
            selectedAromas={selectedAromas} // 선택된 향을 props로 전달
            onChange={handleAromaChange}
          />

          <ModalFooter>
            <Button
              size='full'
              className='bg-primary txt-md-bold text-white'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? '리뷰 수정 중...' : '리뷰 수정하기'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditReviewForm;

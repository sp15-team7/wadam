'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createReview } from '@/feature/libs/api/userApi';
import WineTasteSlider from '@/feature/reviews/components/wine-taste-slider';
import {
  CreateReviewRequest,
  createReviewRequestSchema,
} from '@/feature/reviews/schemas/reviews.schema';
import WineFlavors from '@/feature/wines/components/wine-flavors';
import { useWineDetail } from '@/feature/wines/hooks/useWineDetailsQuery';
import { AromaType } from '@/feature/wines/schema/wine.schema';
import {
  Modal,
  ModalContent,
  ModalFooter,
} from '@/shared/components/common/modal';
import StarRating from '@/shared/components/common/star-rating';
import { Button } from '@/shared/components/ui/button';
import { useModalStore } from '@/shared/stores/useModalStore';

interface ReviewFormProps {
  wineId: number;
}

const ReviewForm = ({ wineId }: ReviewFormProps) => {
  const { data: wineDetail, isError } = useWineDetail({
    wineId,
    enabled: !!wineId,
  });

  const { open, close } = useModalStore();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateReviewRequest>({
    resolver: zodResolver(createReviewRequestSchema),
    defaultValues: {
      content: '',
      rating: 0,
      aroma: [],
      lightBold: 5,
      smoothTannic: 5,
      drySweet: 5,
      softAcidic: 5,
      wineId,
    },
  });

  if (isError) return null;

  const onSubmit = async (data: CreateReviewRequest) => {
    try {
      await createReview(data);
      close('ReviewForm');
      toast.success('리뷰가 성공적으로 등록되었습니다.');

      // 와인 리뷰 목록 및 상세 정보 쿼리 무효화
      await queryClient.invalidateQueries({
        queryKey: ['wine', 'reviews', wineId],
      });
      await queryClient.invalidateQueries({
        queryKey: ['wine', 'detail', wineId],
      });
      await queryClient.invalidateQueries({ queryKey: ['wines', 'infinite'] });
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
      toast.error('리뷰 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <Button
        className='h-[4.2rem] w-[11.3rem] px-[2rem] text-[1.6rem] font-bold whitespace-nowrap'
        onClick={() => open('ReviewForm')}
      >
        리뷰 남기기
      </Button>
      <Modal modalId='ReviewForm' title='리뷰 등록' showCloseButton>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-3 flex items-center gap-3 md:mb-5 md:gap-4'>
              <div className='flex-shrink-0'>
                <Image
                  src={wineDetail?.image ?? '/icons/ui/icon-default-wine.svg'}
                  alt='와인 이미지'
                  width={32}
                  height={32}
                  className='h-12 w-12 object-contain md:h-16 md:w-16 lg:h-20 lg:w-20'
                />
              </div>
              <div className='flex flex-col justify-center'>
                <p className='txt-md-bold md:txt-lg-bold mb-1.5 md:mb-2.5'>
                  {wineDetail?.name}
                </p>
                <StarRating
                  value={watch('rating')}
                  onChange={(val) => setValue('rating', val)}
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
              className='border-secondary placeholder:txt-md-regular txt-md-regular md:txt-lg-regular h-[8rem] w-full resize-none rounded-2xl border p-3 md:h-[12rem] md:p-4'
              placeholder='후기를 작성해주세요.'
            />
            {errors.content && (
              <span className='text-primary text-xs'>
                {errors.content.message}
              </span>
            )}
            <p className='txt-md-bold md:txt-2lg-bold mt-6 mb-4 md:mt-10 md:mb-7'>
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
                setValue('lightBold', values['바디감']);
                setValue('smoothTannic', values['타닌']);
                setValue('drySweet', values['당도']);
                setValue('softAcidic', values['산미']);
              }}
            />

            <p className='txt-md-bold md:txt-2lg-bold mt-6 mb-4 md:mt-10 md:mb-7'>
              기억에 남는 향이 있나요?
            </p>
            <WineFlavors
              onChange={(aromas) => setValue('aroma', aromas as AromaType[])}
            />

            <ModalFooter>
              <Button
                size='full'
                className='bg-primary txt-md-bold text-white'
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? '리뷰 등록 중...' : '리뷰 남기기'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewForm;

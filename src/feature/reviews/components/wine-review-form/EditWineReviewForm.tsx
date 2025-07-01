'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { DropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu';
import { CameraIcon, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Wine } from '@/feature/myprofile/services/user.service';
import {
  CreateWineRequest,
  createWineRequestSchema,
  UpdateWineResponse,
  WineTypeEnum,
  WineTypeEnumSchema,
} from '@/feature/wines/schema/wine.schema';
import {
  updateWine,
  uploadWineImage,
} from '@/feature/wines/services/wine.service';
import {
  Modal,
  ModalContent,
  ModalFooter,
} from '@/shared/components/common/modal';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

interface EditWineReviewFormProps {
  wine: Wine;
  onClose: () => void;
  onSuccess?: (updatedWine?: UpdateWineResponse) => void;
}

// 와인 타입 옵션들
const WINE_TYPE = WineTypeEnumSchema.options;

const EditWineReviewForm = ({
  wine,
  onClose,
  onSuccess,
}: EditWineReviewFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    '/icons/ui/icon-default-wine.svg',
  );
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateWineRequest>({
    resolver: zodResolver(createWineRequestSchema),
  });

  useEffect(() => {
    reset({
      name: wine.name,
      region: wine.region,
      image: wine.image,
      price: wine.price,
      type: wine.type,
    });
  }, [wine, reset]);

  // 컴포넌트 언마운트 시 미리보기 URL 정리
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이전 미리보기 URL 정리
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setIsUploading(true);
    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);
    setImagePreview(newPreviewUrl);

    try {
      const serverImageUrl = await uploadWineImage(file);
      setValue('image', serverImageUrl, { shouldValidate: true });
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      setValue('image', wine.image); // 원래 이미지로 롤백
      setImagePreview('/icons/ui/icon-default-wine.svg');
      toast.error('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: CreateWineRequest) => {
    try {
      const updatedWine = await updateWine(wine.id, data);

      if (onSuccess) {
        onSuccess(updatedWine);
      }
      onClose();
    } catch (error) {
      console.error('와인 수정 실패:', error);
      toast.error('와인 수정에 실패했습니다.');
    }
  };

  const selectedType = watch('type');

  return (
    <Modal
      modalId='EditWineReviewForm'
      title='내가 등록한 와인'
      showCloseButton
      onClose={onClose}
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-6'>
            {/* 와인 이름 */}
            <div className='space-y-2'>
              <Label htmlFor='name' className='txt-md-bold'>
                와인 이름
              </Label>
              <Input
                id='name'
                {...register('name')}
                placeholder='와인 이름을 입력하세요'
                className='w-full'
              />
              {errors.name && (
                <p className='text-sm text-red-500'>{errors.name.message}</p>
              )}
            </div>

            {/* 가격 */}
            <div className='space-y-2'>
              <Label htmlFor='price' className='txt-md-bold'>
                가격
              </Label>
              <Input
                id='price'
                type='number'
                {...register('price', { valueAsNumber: true })}
                placeholder='가격을 입력하세요'
                className='w-full'
              />
              {errors.price && (
                <p className='text-sm text-red-500'>{errors.price.message}</p>
              )}
            </div>

            {/* 원산지 */}
            <div className='space-y-2'>
              <Label htmlFor='region' className='txt-md-bold'>
                원산지
              </Label>
              <Input
                id='region'
                {...register('region')}
                placeholder='원산지를 입력하세요'
                className='w-full'
              />
              {errors.region && (
                <p className='text-sm text-red-500'>{errors.region.message}</p>
              )}
            </div>

            {/* 와인 타입 */}
            <div className='space-y-2'>
              <Label className='txt-md-bold'>타입</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type='button'
                    id='wine-type-dropdown'
                    variant='secondary'
                    size='full'
                    className='flex-center !text-gray !justify-between !rounded-full !border !bg-white !px-8 !py-4 text-[1.5rem] !font-normal hover:!bg-gray-50'
                  >
                    <span>{selectedType}</span>
                    <ChevronDown className='text-gray h-8 w-8' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='txt-2xl-semibold z-50 w-[calc(var(--radix-dropdown-menu-trigger-width))] rounded-3xl border bg-white shadow-lg'>
                  <DropdownMenuRadioGroup
                    value={selectedType}
                    onValueChange={(value) =>
                      setValue('type', value as WineTypeEnum)
                    }
                  >
                    {WINE_TYPE.map((wineType) => (
                      <DropdownMenuRadioItem
                        key={wineType}
                        value={wineType}
                        className='hover:text-primary hover:bg-secondary cursor-pointer rounded-2xl px-6 py-2 text-[1.6rem] text-gray-800'
                      >
                        {wineType}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              {errors.type && (
                <p className='text-sm text-red-500'>{errors.type.message}</p>
              )}
            </div>

            {/* 이미지 업로드 */}
            <div className='space-y-2'>
              <Label htmlFor='image' className='txt-md-bold'>
                이미지
              </Label>
              <div className='flex items-center gap-4'>
                <Button
                  type='button'
                  aria-label='와인 사진 업로드'
                  variant='secondary'
                  className='group relative !h-24 !w-24 flex-shrink-0 !rounded-xl !border !bg-white !p-0 transition-colors hover:!bg-gray-50'
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt='미리보기'
                      fill
                      className='rounded-xl object-contain transition-opacity duration-300 group-hover:opacity-60'
                      onError={() => {
                        setImagePreview('/icons/ui/icon-default-wine.svg');
                      }}
                    />
                  ) : (
                    <CameraIcon
                      className='text-gray h-6 w-6'
                      aria-label='카메라 아이콘'
                    />
                  )}
                  {isUploading && (
                    <div className='flex-center absolute inset-0 rounded-lg bg-black/50'>
                      <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
                    </div>
                  )}
                </Button>
                <div className='text-sm text-gray-600'>
                  <p>대표 이미지를 등록해주세요.</p>
                  <p className='text-xs'>
                    5MB 이하의 파일만 업로드 가능합니다.
                  </p>
                </div>
              </div>

              <input
                type='file'
                id='image'
                className='hidden'
                ref={fileInputRef}
                accept='image/*'
                onChange={handleImageChange}
              />
              {errors.image && (
                <p className='mt-2 text-sm text-red-500'>
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>

          <ModalFooter>
            <Button
              type='submit'
              size='full'
              className='bg-primary txt-md-bold text-white'
              disabled={isSubmitting || isUploading}
            >
              {isSubmitting || isUploading ? '수정 중...' : '수정하기'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditWineReviewForm;

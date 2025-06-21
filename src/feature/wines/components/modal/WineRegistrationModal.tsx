'use client';

import { HTTPError } from 'ky';
import { CameraIcon, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

// Zod 스키마 및 관련 타입 임포트
import {
  createWineRequestSchema, // 와인 생성 요청 스키마
  createWineResponseSchema, // 와인 생성 응답 스키마
  WineTypeEnum, // WineTypeEnumSchema로부터 추론된 타입 (RED, WHITE, SPARKLING)
  WineTypeEnumSchema,
} from '@/feature/wines/schema/wine.schema'; // Zod 스키마 파일 경로 (가정)
// API 호출 관련 컴포넌트 임포트
import { createWine } from '@/feature/wines/services/wine.service';
// 공통 컴포넌트 임포트
import Modal from '@/shared/components/common/modal/Modal';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Input } from '@/shared/components/ui/input';
import { apiClient } from '@/shared/libs/api/apiClient'; // 설정된 apiClient 인스턴스 임포트
import { useModalStore } from '@/shared/stores/useModalStore';

const MODAL_ID = 'wineRegistrationModal';
const WINE_TYPES = WineTypeEnumSchema.options;

// 이미지 업로드 응답 스키마
const imageUploadResponseSchema = z.object({
  url: z.string().url(),
});

// API 에러 응답 스키마
const apiErrorResponseSchema = z.object({
  message: z.string(),
});

type FieldErrors = {
  name?: string;
  region?: string;
  price?: string;
  image?: string; // 이미지 파일 관련 에러
  type?: string;
};

const WineRegistrationModal = () => {
  const router = useRouter();
  const { close } = useModalStore();

  // 폼 상태 관리
  const [name, setName] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [price, setPrice] = useState<string>(''); // string으로 받아서 parseFloat로 변환
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [type, setType] = useState<WineTypeEnum>('RED'); // WineTypeEnum 사용
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({}); // 에러 상태 관리

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setErrors((prev) => ({ ...prev, image: undefined }));
    if (file) {
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        const message = '이미지 파일은 최대 5MB까지 업로드할 수 있습니다.';
        toast.error(
          `이미지 파일은 최대 5MB까지 업로드할 수 있습니다. (현재 파일 크기: ${(file.size / (1024 * 1024)).toFixed(2)}MB)`,
        );
        setImageFile(null);
        setImagePreviewUrl(null);
        setErrors((prev) => ({ ...prev, image: message }));
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreviewUrl(null);
      // 파일이 선택되지 않았을 때 에러를 필드 옆에 표시
      setErrors((prev) => ({ ...prev, image: '와인 사진을 선택해주세요.' }));
    }
  };

  const handleSubmissionError = async (
    error: unknown,
    contextMessage: string,
  ) => {
    let errorMessage = contextMessage;
    const fieldErrors: FieldErrors = {}; // 필드별 에러를 저장할 객체

    if (error instanceof z.ZodError) {
      // Zod 유효성 검사 실패 (클라이언트 측에서 발생)
      // Zod 에러를 필드별로 분리하여 `errors` 상태에 저장
      error.errors.forEach((err) => {
        if (err.path.length > 0 && typeof err.path[0] === 'string') {
          // err.path[0]가 FieldErrors의 키에 해당하는지 확인
          const fieldName = err.path[0] as keyof FieldErrors;
          fieldErrors[fieldName] = err.message;
        }
      });
      setErrors(fieldErrors); // 필드별 에러 업데이트
      return;
    } else if (error instanceof HTTPError) {
      try {
        const errorJson = await error.response.json();
        const parsedError = apiErrorResponseSchema.safeParse(errorJson);
        if (parsedError.success && parsedError.data.message) {
          errorMessage = parsedError.data.message;
        } else {
          errorMessage = `HTTP 오류 (${error.response.status}): ${error.response.statusText}`;
        }
      } catch (jsonParseError) {
        console.error('Failed to parse error response JSON:', jsonParseError);
        errorMessage = `API 응답 처리 오류 (${error.response.status}): ${error.response.statusText}`;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.';
    }
    // Zod 에러가 아닌, API 통신 에러 등은 sonner로 전역 알림
    toast.error(errorMessage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 제출 시 초기 에러 상태 초기화
    setErrors({});

    // 클라이언트 측 유효성 검사 (Zod 스키마를 사용하여 수동 검증)
    const currentFormData = {
      name,
      region,
      image: imageFile ? 'placeholder_url' : '', // imageFile 유무만 확인하고 실제 URL은 나중에 채움
      price: Number.parseFloat(price),
      type,
    };

    try {
      createWineRequestSchema.parse(currentFormData);

      //  이미지 파일 선택 여부 수동 검사
      if (!imageFile) {
        setErrors((prev) => ({ ...prev, image: '와인 사진을 선택해주세요.' }));
        return; // 에러 발생 시 제출 중단
      }
    } catch (validationError) {
      // Zod 유효성 검사 실패 시  필드 옆에 에러 표시
      await handleSubmissionError(
        validationError,
        '입력 데이터 유효성 검사 실패',
      );
      return; // 유효성 검사 실패 시 제출 중단
    }

    const session = await getSession();
    if (!session || !session.accessToken) {
      toast.error('로그인이 필요합니다. 먼저 로그인해주세요.');
      return;
    }

    let finalImageUrl = '';

    try {
      const formDataForImage = new FormData();
      formDataForImage.append('image', imageFile as File);

      const uploadResponse = await apiClient
        .post('images/upload', {
          body: formDataForImage,
          headers: {
            'Content-Type': undefined,
          },
        })
        .json();

      const parsedImageResult = imageUploadResponseSchema.parse(uploadResponse);
      finalImageUrl = parsedImageResult.url;
    } catch (uploadError) {
      await handleSubmissionError(uploadError, '이미지 업로드에 실패했습니다.');
      return;
    }

    const formData = {
      name,
      region,
      image: finalImageUrl,
      price: Number.parseFloat(price),
      type,
    };

    try {
      const validatedData = createWineRequestSchema.parse(formData);
      const response = await createWine(validatedData);
      const newWine = createWineResponseSchema.parse(response);
      const newWineId = newWine.id;

      toast.success('와인이 성공적으로 등록되었습니다!');
      close(MODAL_ID);
      router.push(`/wines/${newWineId}`);
    } catch (error) {
      await handleSubmissionError(error, '와인 등록에 실패했습니다.');
    }
  };

  // '취소' 버튼 클릭 시 모달 닫기
  const handleCancel = () => {
    close(MODAL_ID);
  };

  // 필드별 에러 메시지를 렌더링하는 컴포넌트
  const FieldError = ({ fieldName }: { fieldName: keyof FieldErrors }) => {
    if (errors[fieldName]) {
      return (
        <p className='text-primary mt-1 text-[1.2rem]'>{errors[fieldName]}</p>
      );
    }
    return null;
  };

  return (
    <Modal modalId={MODAL_ID} title='와인 등록'>
      <form
        onSubmit={handleSubmit}
        className='flex w-full max-w-full flex-col gap-8 p-0 pt-10'
        noValidate
      >
        {/* 와인 이름 */}
        <div className='flex flex-col justify-between'>
          <div className='flex items-center'>
            <label
              htmlFor='wine-name'
              className='mb-4 block text-[1.6rem] font-bold text-gray-800'
            >
              와인 이름
            </label>
            <FieldError fieldName='name' />
          </div>
          <Input
            id='wine-name'
            placeholder='와인 이름 입력'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            variant='default' // Input 컴포넌트의 기본 variant
            size='md' // Input 컴포넌트의 md size
            className='!text-gray-800'
          />
        </div>
        {/* 가격 */}
        <div className='flex flex-col justify-between'>
          <div className='flex items-center'>
            <label
              htmlFor='wine-price'
              className='mb-4 block text-[1.6rem] font-bold text-gray-800'
            >
              가격
            </label>
            <FieldError fieldName='price' />
          </div>
          <Input
            id='wine-price'
            type='number' // type을 number로 지정
            placeholder='가격 입력'
            value={price}
            onChange={(e) => {
              setPrice(e.target.value.replace(/[^0-9.]/g, ''));
              setErrors((prev) => ({ ...prev, price: undefined }));
            }}
            required
            inputMode='numeric'
            variant='default'
            size='md'
            className='!text-gray-800'
          />
        </div>
        {/* 원산지 */}
        <div className='flex flex-col justify-between'>
          <div className='flex items-center'>
            <label
              htmlFor='wine-region'
              className='mb-4 block text-[1.6rem] font-bold text-gray-800'
            >
              원산지
            </label>
            <FieldError fieldName='region' />
          </div>
          <Input
            id='wine-region'
            placeholder='원산지 입력'
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              setErrors((prev) => ({ ...prev, region: undefined }));
            }}
            required
            variant='default'
            size='md'
            className='!text-gray-800'
          />
        </div>
        {/* 타입 */}
        <div className='flex flex-col justify-between'>
          <div className='flex items-center'>
            <label
              htmlFor='wine-type-dropdown'
              className='mb-4 block text-[1.6rem] font-bold text-gray-800'
            >
              타입
            </label>
            <FieldError fieldName='type' />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type='button'
                id='wine-type-dropdown'
                variant='secondary'
                size='full'
                className='flex-center !text-gray !justify-between !rounded-full !border !bg-white !px-8 !py-4 text-[1.5rem] !font-normal hover:!bg-gray-50'
              >
                <span>{type}</span>
                <ChevronDown className='text-gray h-8 w-8' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='txt-2xl-semibold z-50 w-[calc(var(--radix-dropdown-menu-trigger-width))] rounded-3xl border bg-white shadow-lg'>
              <DropdownMenuRadioGroup
                value={type}
                onValueChange={(value) => {
                  setType(value as WineTypeEnum);
                  setErrors((prev) => ({ ...prev, type: undefined }));
                }}
              >
                {WINE_TYPES.map((wineType) => (
                  <DropdownMenuRadioItem
                    key={wineType}
                    value={wineType}
                    showIndicator={false}
                    className='hover:text-primary hover:bg-secondary cursor-pointer rounded-2xl px-6 py-2 text-[1.6rem]'
                  >
                    {wineType}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* 와인 사진 */}
        <div className='flex flex-col justify-between'>
          <div className='flex items-center'>
            <label
              htmlFor='wine-image'
              className='mb-6 block text-[1.6rem] font-bold text-gray-800'
            >
              와인 사진
            </label>
            <FieldError fieldName='image' />
          </div>
          {/* Button 컴포넌트를 사용 업로드 박스 구현 */}
          <Button
            type='button'
            aria-label='와인 사진 업로드'
            variant='secondary'
            className='group !h-[140px] !w-[140px] !rounded-[1.2rem] !border !bg-white !p-0 transition-colors hover:!bg-gray-50'
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreviewUrl ? (
              <Image
                src={imagePreviewUrl}
                alt='미리보기'
                width={140}
                height={140}
                className='h-full w-full rounded-[1.2rem] object-cover transition-opacity duration-300 group-hover:opacity-60'
              />
            ) : (
              <CameraIcon
                className='text-gray h-8 w-8'
                aria-label='카메라 아이콘'
              />
            )}
            <input
              id='wine-image'
              ref={fileInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImageChange}
            />
          </Button>
        </div>
        {/* 버튼 섹션 */}
        <div className='mt-10 flex w-full gap-4'>
          <Button
            type='button'
            onClick={handleCancel}
            variant='secondary'
            size='full'
            className='!text-primary w-[108px] !bg-[#ECE9DD] py-4 text-[1.6rem] font-semibold hover:!bg-[#DEDCCA]'
          >
            취소
          </Button>
          <Button
            type='submit'
            variant='primary'
            size='full'
            className='py-4 text-[1.6rem] font-semibold text-white'
          >
            와인 등록하기
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default WineRegistrationModal;

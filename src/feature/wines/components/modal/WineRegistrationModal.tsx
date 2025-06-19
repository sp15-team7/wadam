'use client';

import { HTTPError } from 'ky';
import { ChevronDown,UploadIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import React, { useState } from 'react';
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(
          '이미지 파일은 최대 5MB까지 업로드할 수 있습니다. (현재 파일 크기: ' +
            (file.size / (1024 * 1024)).toFixed(2) +
            'MB)',
        );
        setImageFile(null);
        setImagePreviewUrl(null);
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
    }
  };

  const handleSubmissionError = async (
    error: unknown,
    contextMessage: string,
  ) => {
    let errorMessage = contextMessage;

    if (error instanceof z.ZodError) {
      // Zod 유효성 검사 실패 (클라이언트 측에서 발생)
      const zodErrorMessages = error.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join(', ');
      errorMessage = `입력 데이터 유효성 검사 실패: ${zodErrorMessages}`;
    } else if (error instanceof HTTPError) {
      // API 호출 중 HTTP 에러 발생 (서버 응답 에러)
      try {
        const errorJson = await error.response.json();
        const parsedError = apiErrorResponseSchema.safeParse(errorJson);
        if (parsedError.success && parsedError.data.message) {
          errorMessage = parsedError.data.message;
        } else {
          // 서버 응답이 스키마와 맞지 않는 경우 HTTP 상태 코드와 메시지 사용
          errorMessage = `HTTP 오류 (${error.response.status}): ${error.response.statusText}`;
        }
      } catch (jsonParseError) {
        // 서버 응답 JSON 파싱 실패
        console.error('Failed to parse error response JSON:', jsonParseError);
        errorMessage = `API 응답 처리 오류 (${error.response.status}): ${error.response.statusText}`;
      }
    } else if (error instanceof Error) {
      // 기타 일반 JavaScript 에러 (네트워크, 타입 에러 등)
      errorMessage = error.message;
    } else {
      // 알 수 없는 에러 타입
      errorMessage = '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.';
    }
    toast.error(errorMessage); // sonner를 통해 사용자에게 에러 알림
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalImageUrl = '';

    const session = await getSession();
    if (!session || !session.accessToken) {
      toast.error('로그인이 필요합니다. 먼저 로그인해주세요.');
      // router.push('/signin'); // 필요하다면 로그인 페이지로 리다이렉트
      return;
    }

    if (!imageFile) {
      toast.error('와인 사진을 선택해주세요.');
      return;
    }

    try {
      // 1. 이미지 파일 업로드
      const formDataForImage = new FormData();
      formDataForImage.append('image', imageFile);

      const uploadResponse = await apiClient
        .post('images/upload', {
          body: formDataForImage,
          headers: {
            'Content-Type': undefined, // ky가 자동으로 multipart/form-data를 설정하도록 함
          },
        })
        .json();

      const parsedImageResult = imageUploadResponseSchema.parse(uploadResponse);
      finalImageUrl = parsedImageResult.url;
    } catch (uploadError) {
      // 이미지 업로드 실패 시 handleSubmissionError 호출
      await handleSubmissionError(uploadError, '이미지 업로드에 실패했습니다.');
      return; // 에러 발생 시 이후 로직 실행 중단
    }

    // 2. 폼 데이터 준비
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast.error('가격은 0보다 큰 숫자로 입력해주세요.');
      return;
    }

    const formData = {
      name,
      region,
      image: finalImageUrl,
      price: priceValue,
      type,
    };

    try {
      // 클라이언트 측 데이터 유효성 검사 (Zod 스키마)
      const validatedData = createWineRequestSchema.parse(formData);

      // 3. 와인 등록 API 호출
      const response = await createWine(validatedData);

      // 서버 응답 데이터 유효성 검사
      const newWine = createWineResponseSchema.parse(response);
      const newWineId = newWine.id;

      toast.success('와인이 성공적으로 등록되었습니다!');
      close(MODAL_ID);
      router.push(`/wines/${newWineId}`);
    } catch (error) {
      // 와인 등록 실패 시 handleSubmissionError 호출
      await handleSubmissionError(error, '와인 등록에 실패했습니다.');
      // 추가적인 UI 업데이트나 상태 초기화 등이 필요하다면 여기에 추가
    }
  };

  return (
    <Modal modalId={MODAL_ID} title='와인 등록' showCloseButton>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* 와인 이름 */}
        <div>
          <label
            htmlFor='wine-name'
            className='txt-sub-bold mb-1 block text-gray-700'
          >
            와인 이름
          </label>
          <Input
            id='wine-name'
            placeholder='와인 이름을 입력하세요'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* 가격 */}
        <div>
          <label
            htmlFor='wine-price'
            className='txt-sub-bold mb-1 block text-gray-700'
          >
            가격
          </label>
          <Input
            id='wine-price'
            type='number'
            placeholder='가격을 입력하세요 (예: 76000)'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* 원산지 */}
        <div>
          <label
            htmlFor='wine-region'
            className='txt-sub-bold mb-1 block text-gray-700'
          >
            원산지
          </label>
          <Input
            id='wine-region'
            placeholder='원산지를 입력하세요 (예: 칠레)'
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>

        {/* 와인 타입 */}
        <div>
          <label className='txt-sub-bold mb-1 block text-gray-700'>타입</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type='button'
                variant='secondary'
                size='full'
                className='justify-between px-[2.0rem]'
              >
                {type}
                <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[calc(var(--radix-dropdown-menu-trigger-width) + 0.8rem)]'>
              <DropdownMenuRadioGroup
                value={type}
                onValueChange={(value) => setType(value as WineTypeEnum)}
              >
                {WINE_TYPES.map((wineType) => (
                  <DropdownMenuRadioItem key={wineType} value={wineType}>
                    {wineType}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 와인 사진 */}
        <div>
          <label
            htmlFor='wine-image'
            className='txt-sub-bold mb-1 block text-gray-700'
          >
            와인 사진
          </label>
          <div className='flex items-center space-x-2'>
            <input
              id='wine-image'
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='hidden'
            />
            <label
              htmlFor='wine-image'
              className='flex-center border-secondary h-[5rem] w-full cursor-pointer rounded-full border bg-white text-xl font-medium text-gray-700 transition-colors hover:bg-gray-50'
            >
              <UploadIcon className='mr-2 h-5 w-5' />
              {imageFile ? imageFile.name : '사진 업로드'}
            </label>
          </div>
          {imagePreviewUrl && (
            <div className='mt-4 flex justify-center'>
              <Image
                src={imagePreviewUrl}
                alt='와인 사진 미리보기'
                className='max-h-48 rounded-lg object-contain'
                width={200}
                height={200}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                style={{ height: 'auto' }}
              />
            </div>
          )}
        </div>

        {/* 버튼 섹션 */}
        <div className='mt-6 flex justify-center gap-2'>
          <Button
            type='button'
            variant='secondary'
            size='md'
            onClick={() => close(MODAL_ID)}
          >
            취소
          </Button>
          <Button type='submit' variant='primary' size='md'>
            와인 등록하기
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default WineRegistrationModal;

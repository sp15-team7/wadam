'use client';

import { HTTPError } from 'ky';
import { CameraIcon,ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import React, { useRef,useState } from 'react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // '취소' 버튼 클릭 시 모달 닫기
  const handleCancel = () => {
    close(MODAL_ID);
  };

  return (
    <Modal modalId={MODAL_ID} title='와인 등록'>
      <form
        onSubmit={handleSubmit}
        className='flex w-[480px] max-w-full flex-col gap-8 p-0 pt-10'
      >
        {/* 와인 이름 */}
        <div>
          <label
            htmlFor='wine-name'
            className='mb-4 block text-[1.6rem] font-bold text-gray-800'
          >
            와인 이름
          </label>
          <Input
            id='wine-name'
            placeholder='와인 이름 입력'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            variant='default' // Input 컴포넌트의 기본 variant
            size='md' // Input 컴포넌트의 md size
            className='!text-gray-800'
          />
        </div>
        {/* 가격 */}
        <div>
          <label
            htmlFor='wine-price'
            className='mb-4 block text-[1.6rem] font-bold text-gray-800'
          >
            가격
          </label>
          <Input
            id='wine-price'
            type='number' // type을 number로 지정
            placeholder='가격 입력'
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))}
            required
            inputMode='numeric'
            variant='default'
            size='md'
            className='!text-gray-800'
          />
        </div>
        {/* 원산지 */}
        <div>
          <label
            htmlFor='wine-region'
            className='mb-4 block text-[1.6rem] font-bold text-gray-800'
          >
            원산지
          </label>
          <Input
            id='wine-region'
            placeholder='원산지 입력'
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
            variant='default'
            size='md'
            className='!text-gray-800'
          />
        </div>
        {/* 타입 */}
        <div>
          <label
            htmlFor='wine-type-dropdown'
            className='mb-4 block text-[1.6rem] font-bold text-gray-800'
          >
            타입
          </label>
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
                onValueChange={(value) => setType(value as WineTypeEnum)}
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
        <div>
          <label
            htmlFor='wine-image'
            className='mb-6 block text-[1.6rem] font-bold text-gray-800'
          >
            와인 사진
          </label>
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
            className='w-[108px] !bg-[#ECE9DD] py-4 text-[1.6rem] !font-bold !text-[#B03A2E] hover:!bg-[#DEDCCA]'
          >
            취소
          </Button>
          <Button
            type='submit'
            variant='primary'
            size='full'
            className='!bg-[#B03A2E] py-4 text-[1.6rem] !font-bold !text-white hover:!bg-[#9B2F25]'
          ></Button>
        </div>
      </form>
    </Modal>
  );
};

export default WineRegistrationModal;

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import ImageInput from '@/feature/wines/components/ui/ImageInput';
import { useUploadImageMutation } from '@/feature/wines/hooks/useUploadImageMutation';
import {
  CreateWineRequest,
  createWineRequestSchema,
  WineTypeEnumSchema,
} from '@/feature/wines/schema/wine.schema';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

interface WineCreateFormProps {
  id: string;
  onSubmit: (data: CreateWineRequest) => void;
}

const formMessageStyle = 'text-[1.2rem] md:text-[1.4rem] text-primary';
const dropDownMenuItemStyle =
  'data-[state=checked]:bg-secondary data-[state=checked]:text-primary focus:text-primary h-[4.8rem] cursor-pointer rounded-4xl text-[1.4rem] font-semibold md:text-[1.6rem]';
const numberInputStyle =
  'w-full [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';

const WineCreateForm = ({ id, onSubmit }: WineCreateFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileReaderRef = useRef<FileReader | null>(null);
  const uploadImageMutation = useUploadImageMutation();

  useEffect(() => {
    return () => {
      if (fileReaderRef.current) {
        fileReaderRef.current.abort();
      }
    };
  }, []);

  const form = useForm<CreateWineRequest>({
    resolver: zodResolver(createWineRequestSchema),
    defaultValues: {
      name: '',
      region: '',
      image: '',
      price: undefined,
      type: WineTypeEnumSchema.options[0],
    },
  });

  const { control, handleSubmit, setValue } = form;

  const handleImageSelect = (file: File | null) => {
    if (file) {
      setValue('image', '');
      // 미리보기용 Data URL 생성
      fileReaderRef.current = new FileReader();
      const reader = fileReaderRef.current;
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewUrl(reader.result);
        }
      };

      // 이미지 업로드
      uploadImageMutation.mutate(file, {
        onSuccess: (imageUrl) => {
          setValue('image', imageUrl);
        },
        onError: () => {
          setPreviewUrl(null);
          setValue('image', '');
        },
      });
    } else {
      setPreviewUrl(null);
      setValue('image', '');
    }
  };

  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 px-2 md:gap-6'
      >
        <FormField
          control={control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <div className='flex items-center justify-between'>
                <FormLabel>와인 이름</FormLabel>
                <FormMessage className={formMessageStyle} />
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder='와인 이름을 입력하세요'
                  className='w-full'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='price'
          render={({ field }) => {
            const formatPrice = (value: number | undefined): string => {
              if (!value) return '';
              return value.toLocaleString('ko-KR');
            };

            const handlePriceChange = (
              e: React.ChangeEvent<HTMLInputElement>,
            ) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              field.onChange(value === '' ? undefined : Number(value));
            };

            return (
              <FormItem className='flex flex-col'>
                <div className='flex items-center justify-between'>
                  <FormLabel>가격</FormLabel>
                  <FormMessage className={formMessageStyle} />
                </div>
                <FormControl>
                  <div className='relative'>
                    <Input
                      value={formatPrice(field.value)}
                      type='text'
                      placeholder='가격을 입력하세요 (원)'
                      className={`${numberInputStyle} pr-8`}
                      onChange={handlePriceChange}
                    />
                    <span className='text-gray pointer-events-none absolute top-1/2 right-10 -translate-y-1/2 text-[1.4rem]'>
                      ￦
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          control={control}
          name='region'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <div className='flex items-center justify-between'>
                <FormLabel>와인 원산지</FormLabel>
                <FormMessage className={formMessageStyle} />
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder='와인 원산지를 입력하세요'
                  className='w-full'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='type'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <div className='flex items-center justify-between'>
                <FormLabel>와인 타입</FormLabel>
                <FormMessage className={formMessageStyle} />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <FormControl>
                    <Input
                      value={field.value}
                      placeholder='와인 타입 선택'
                      className='w-full cursor-pointer text-left'
                      readOnly
                    />
                  </FormControl>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] rounded-4xl p-2'>
                  <DropdownMenuRadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className='flex flex-col'
                  >
                    <DropdownMenuRadioItem
                      value='RED'
                      className={dropDownMenuItemStyle}
                      showIndicator={false}
                    >
                      RED
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value='WHITE'
                      className={dropDownMenuItemStyle}
                      showIndicator={false}
                    >
                      WHITE
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value='SPARKLING'
                      className={dropDownMenuItemStyle}
                      showIndicator={false}
                    >
                      SPARKLING
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='image'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <div className='flex items-center justify-between'>
                <FormLabel>와인 이미지</FormLabel>
                <FormMessage className={formMessageStyle} />
              </div>
              <FormControl>
                <ImageInput
                  onChange={handleImageSelect}
                  value={field.value}
                  previewUrl={previewUrl}
                  isUploading={uploadImageMutation.isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default WineCreateForm;

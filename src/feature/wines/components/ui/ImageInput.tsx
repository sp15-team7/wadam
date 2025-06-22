'use client';

import { Wine } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useId } from 'react';

interface ImageInputProps {
  onChange: (file: File | null) => void;
  value: string | null;
  previewUrl?: string | null;
  isUploading?: boolean;
}

const ImageInput = ({
  onChange,
  value,
  previewUrl,
  isUploading = false,
}: ImageInputProps) => {
  const id = useId();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onChange(file || null);
  };

  const displayImageUrl = value || previewUrl;
  const isSvgPreview = displayImageUrl?.startsWith('data:image/svg+xml');

  return (
    <label
      htmlFor={id}
      className={`border-secondary relative flex h-56 w-56 cursor-pointer items-center justify-center rounded-2xl border ${
        isUploading ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      <input
        id={id}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleImageChange}
        disabled={isUploading}
      />
      {displayImageUrl ? (
        isSvgPreview ? (
          <img
            src={displayImageUrl}
            alt='preview'
            className='h-full w-full rounded-2xl object-cover'
          />
        ) : (
          <Image
            src={displayImageUrl}
            alt='preview'
            fill
            sizes='14rem'
            className='rounded-2xl object-cover'
          />
        )
      ) : (
        <div className='text-gray flex flex-col items-center justify-center gap-2'>
          <Wine size={40} />
          <span>{isUploading ? '업로드 중...' : '이미지 추가'}</span>
        </div>
      )}
      {isUploading && (
        <div className='bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-2xl bg-black'>
          <div className='text-sm text-white'>업로드 중...</div>
        </div>
      )}
    </label>
  );
};

export default ImageInput;

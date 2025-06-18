'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { createWine } from '@/feature/wines/services/wine.service';

const wineTypes = [
  { value: 'RED', label: 'Red' },
  { value: 'WHITE', label: 'White' },
  { value: 'SPARKLING', label: 'Sparkling' },
];

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [region, setRegion] = useState('');
  const [type, setType] = useState('RED');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageUrl = image
        ? preview || ''
        : 'https://dummyimage.com/200x200/eee/aaa&text=No+Image';
      const priceNumber = Number(price);
      const res = await createWine({
        name,
        region,
        image: imageUrl,
        price: priceNumber,
        type: type as 'RED' | 'WHITE' | 'SPARKLING',
      });
      router.push(`/wines/${res.id}`);
    } catch {
      alert('와인 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-[#F8F7F3] p-0'>
      <form onSubmit={handleSubmit} className='w-full max-w-[430px]'>
        <div className='rounded-[2.4rem] border-none bg-[#F8F7F3] p-0 shadow-none'>
          <div className='flex flex-col gap-8 p-8'>
            <div className='mb-2 text-[2.2rem] font-extrabold'>필터</div>
            <div className='flex flex-col gap-6'>
              <div>
                <label
                  htmlFor='wine-name'
                  className='mb-2 block text-[1.6rem] font-bold'
                >
                  와인 이름
                </label>
                <input
                  id='wine-name'
                  className='w-full rounded-full border border-[#ECE9DD] bg-transparent px-6 py-4 text-[1.5rem] outline-none placeholder:text-[#ECE9DD]'
                  placeholder='와인 이름 입력'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='wine-price'
                  className='mb-2 block text-[1.6rem] font-bold'
                >
                  가격
                </label>
                <input
                  id='wine-price'
                  className='w-full rounded-full border border-[#ECE9DD] bg-transparent px-6 py-4 text-[1.5rem] outline-none placeholder:text-[#ECE9DD]'
                  placeholder='가격 입력'
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value.replace(/[^0-9]/g, ''))
                  }
                  required
                  inputMode='numeric'
                />
              </div>
              <div>
                <label
                  htmlFor='wine-region'
                  className='mb-2 block text-[1.6rem] font-bold'
                >
                  원산지
                </label>
                <input
                  id='wine-region'
                  className='w-full rounded-full border border-[#ECE9DD] bg-transparent px-6 py-4 text-[1.5rem] outline-none placeholder:text-[#ECE9DD]'
                  placeholder='원산지 입력'
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='wine-type'
                  className='mb-2 block text-[1.6rem] font-bold'
                >
                  타입
                </label>
                <select
                  id='wine-type'
                  className='w-full appearance-none rounded-full border border-[#ECE9DD] bg-transparent px-6 py-4 text-[1.5rem] text-[#222] outline-none'
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  {wineTypes.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor='wine-image'
                  className='mb-2 block text-[1.6rem] font-bold'
                >
                  와인 사진
                </label>
                <div
                  role='button'
                  tabIndex={0}
                  aria-label='와인 사진 업로드'
                  className='mb-2 flex h-[96px] w-[96px] cursor-pointer items-center justify-center rounded-[1.2rem] border border-[#ECE9DD] bg-transparent'
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ')
                      fileInputRef.current?.click();
                  }}
                >
                  {preview ? (
                    <Image
                      src={preview}
                      alt='미리보기'
                      width={96}
                      height={96}
                      className='h-full w-full rounded-[1.2rem] object-cover'
                    />
                  ) : (
                    <svg
                      width='32'
                      height='32'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='#ECE9DD'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 16.5c1.933 0 3.5-1.567 3.5-3.5s-1.567-3.5-3.5-3.5-3.5 1.567-3.5 3.5 1.567 3.5 3.5 3.5z'
                      ></path>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M4.75 19.25v-14.5a.75.75 0 01.75-.75h13a.75.75 0 01.75.75v14.5a.75.75 0 01-.75.75h-13a.75.75 0 01-.75-.75z'
                      ></path>
                    </svg>
                  )}
                  <input
                    id='wine-image'
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            <div className='mt-8 flex gap-4'>
              <button
                type='button'
                onClick={handleCancel}
                className='flex-1 rounded-full bg-[#ECE9DD] py-4 text-[1.6rem] font-bold text-[#B03A2E]'
                disabled={loading}
              >
                취소
              </button>
              <button
                type='submit'
                className='flex-1 rounded-full bg-[#B03A2E] py-4 text-[1.6rem] font-bold text-white'
                disabled={loading}
              >
                {loading ? '등록 중...' : '와인 등록하기'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

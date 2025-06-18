'use client';

/**
 * @author Sumin
 * @since 2025-06-10
 * @description 유저 아바타 컴포넌트
 */

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { cn } from '@/shared/libs/utils/cn';

/**
 * 유저의 프로필 이미지를 표시하는 아바타 컴포넌트
 * @param {UserAvatarProps} props - 컴포넌트 props
 * @returns {JSX.Element} 유저 아바타 컴포넌트
 */

interface UserAvatarProps {
  src?: string;
  className?: string;
  alt?: string;
}

const UserAvatar = ({
  src = '/icons/ui/icon-default-user.svg',
  className = '',
  alt = 'user-avatar',
}: UserAvatarProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  // 이미지 로드 실패 시 기본 이미지로 fallback
  const handleImageError = () => {
    setImgSrc('/icons/ui/icon-default-user.svg');
  };

  // src가 변경되면 imgSrc도 업데이트
  // if (src !== imgSrc && src) {
  //   setImgSrc(src);
  // }
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div
      className={cn(
        'after:border-secondary focus-visible:outline-primary relative block h-[3.2rem] w-[3.2rem] overflow-hidden rounded-full after:absolute after:inset-[0.1rem] after:z-10 after:rounded-full after:border-1 after:content-[""] focus-visible:outline-2 md:h-[4.7rem] md:w-[4.7rem]',
        className,
      )}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className='object-cover object-center'
        sizes='(min-width: 768px) 4.7rem, 3.2rem'
        onError={handleImageError}
        priority={false}
      />
    </div>
  );
};

export default UserAvatar;

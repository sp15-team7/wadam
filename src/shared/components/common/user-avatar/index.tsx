/**
 * @author Sumin
 * @since 2025-06-10
 * @description 유저 아바타 컴포넌트
 */

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/libs/utils/cn';

/**
 * 유저의 프로필 이미지를 표시하는 아바타 컴포넌트
 * @param {UserAvatarProps} props - 컴포넌트 props
 * @returns {JSX.Element} 유저 아바타 컴포넌트
 */
const UserAvatar = ({
  src = '/icons/ui/icon-default-user.svg',
  className = '',
}: {
  src?: string;
  className?: string;
}) => {
  return (
    <Link
      href='/myprofile'
      aria-label='내 프로필로 이동'
      className={cn(
        'after:border-secondary focus-visible:outline-primary relative block h-[3.2rem] w-[3.2rem] overflow-hidden rounded-full after:absolute after:inset-[0.1rem] after:z-10 after:rounded-full after:border-1 after:content-[""] focus-visible:outline-2 md:h-[4.7rem] md:w-[4.7rem]',
        className,
      )}
    >
      <Image
        src={src}
        alt='user-avatar'
        fill
        className='object-cover object-center'
        sizes='(min-width: 768px) 4.7rem, 3.2rem'
      />
    </Link>
  );
};

export default UserAvatar;

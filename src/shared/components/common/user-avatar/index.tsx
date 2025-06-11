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
      className={cn(
        'after:border-secondary relative h-[4.7rem] w-[4.7rem] overflow-hidden rounded-full after:absolute after:inset-[0.1rem] after:z-10 after:rounded-full after:border-1 after:content-[""]',
        className,
      )}
    >
      <Image
        src={src}
        alt='user-avatar'
        className='h-full w-full object-cover object-center'
        width={47}
        height={47}
      />
    </Link>
  );
};

export default UserAvatar;

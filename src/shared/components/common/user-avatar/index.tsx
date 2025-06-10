import Link from 'next/link';
import Image from 'next/image';

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
      className={`after:border-secondary relative h-[4.7rem] w-[4.7rem] overflow-hidden rounded-full after:absolute after:inset-[0.1rem] after:z-10 after:rounded-full after:border-1 after:content-[""] ${className}`}
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
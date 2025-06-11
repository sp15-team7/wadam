import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/libs/utils/cn';

const Logo = ({
  color = 'red',
  className = '',
}: {
  color?: 'red' | 'ivory';
  className?: string;
}) => {
  const logoSrc =
    color === 'red' ? '/logos/logo-red.svg' : '/logos/logo-ivory.svg';

  return (
    <Link href='/wines'>
      <Image
        src={logoSrc}
        alt='logo'
        width={100}
        height={20}
        priority
        className={cn('h-14 w-auto md:h-16', className)}
      />
    </Link>
  );
};

export default Logo;

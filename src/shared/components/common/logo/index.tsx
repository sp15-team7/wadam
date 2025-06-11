import Image from 'next/image';
import Link from 'next/link';

const Logo = ({ color = 'red' }: { color?: 'red' | 'ivory' }) => {
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
        className='h-12 w-auto md:h-16'
      />
    </Link>
  );
};

export default Logo;

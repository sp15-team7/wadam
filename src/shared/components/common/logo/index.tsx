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
        width={150}
        height={27.8}
        priority
        className='h-[2.78rem] w-[15rem] md:h-[5.57rem] md:w-[30rem]'
      />
    </Link>
  );
};

export default Logo;

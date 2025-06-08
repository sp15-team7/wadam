'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useDeviceSize } from '@/shared/hooks/useDeviceSize'; // 실제 경로에 맞게 조정

const HeaderLogo = () => {
  // useDeviceSize 훅에서 isDesktop 상태를 받아옴
  const { isDesktop } = useDeviceSize();

  // 초기 렌더링 시 isDesktop이 undefined일 수 있으니 nullish 병합 연산자 사용
  const desktop = isDesktop ?? false;

  const logoSrc = desktop ? '/logos/logo-red-lg.png' : '/logos/logo-red-sm.png';
  const logoWidth = desktop ? 300 : 150;
  const logoHeight = desktop ? 54 : 28;

  return (
    <Link href='/wines'>
      <Image
        src={logoSrc}
        alt='logo'
        width={logoWidth}
        height={logoHeight}
        priority={true} // 로고라서 우선 로딩 고려
      />
    </Link>
  );
};

export default HeaderLogo;

import { useEffect, useState } from 'react';

/**
 * 현재 뷰포트 크기에 따라 디바이스 유형을 판단하는 커스텀 훅
 *
 * @description
 * - `window.matchMedia`를 이용하여 브라우저의 뷰포트 크기를 감지
 * - `resize` 이벤트 없이 성능적으로 최적화됨
 * - Tailwind CSS 기본 브레이크포인트 기준을 따름 (mobile-first)
 *
 * @returns {{
 *   isMobile: boolean,
 *   isTablet: boolean,
 *   isDesktop: boolean
 * }} 현재 디바이스 크기에 대한 boolean 값들
 *
 * @example
 * ```tsx
 * const { isMobile, isTablet, isDesktop } = useDeviceSize();
 *
 * if (isTablet) {
 *   // 태블릿 전용 UI 렌더링
 * }
 * ```
 *
 * @note
 * 브레이크포인트 기준:
 * - mobile: 0px ~ 767px
 * - tablet: 768px ~ 1023px
 * - desktop: 1024px 이상
 */
export const useDeviceSize = () => {
  const getDeviceState = () => {
    const width = window.innerWidth;

    return {
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
    };
  };

  const [device, setDevice] = useState(() =>
    typeof window !== 'undefined'
      ? getDeviceState()
      : {
          isMobile: true,
          isTablet: false,
          isDesktop: false,
        },
  );

  useEffect(() => {
    const handleChange = () => {
      setDevice(getDeviceState());
    };

    const mediaQueryList = [
      window.matchMedia('(max-width: 767px)'),
      window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
      window.matchMedia('(min-width: 1024px)'),
    ];

    mediaQueryList.forEach((mq) => {
      mq.addEventListener('change', handleChange);
    });

    return () => {
      mediaQueryList.forEach((mq) => {
        mq.removeEventListener('change', handleChange);
      });
    };
  }, []);

  return device;
};

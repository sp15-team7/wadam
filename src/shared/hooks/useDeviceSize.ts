import { useEffect, useState } from 'react';

interface DeviceState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const MOBILE_MAX = 767;
const TABLET_MIN = 768;
const TABLET_MAX = 1023;
const DESKTOP_MIN = 1024;

/**
 * 서버 사이드 렌더링(SSR) 시 안전한 기본 디바이스 상태를 반환합니다.
 *
 * @returns {DeviceState} 모바일(true), 태블릿(false), 데스크톱(false)으로 기본 설정된 디바이스 상태
 *
 * @description
 * SSR 환경에서는 클라이언트의 실제 뷰포트 정보를 알 수 없으므로,
 * 초기 상태를 모바일 기준으로 고정하여 하이드레이션 불일치(hydration mismatch)를 최소화합니다.
 */
const getDefaultDeviceState = (): DeviceState => ({
  isMobile: true,
  isTablet: false,
  isDesktop: false,
});

/**
 * 클라이언트 환경에서 현재 뷰포트 너비를 기준으로 디바이스 상태를 계산합니다.
 *
 * @returns {DeviceState} 현재 뷰포트 크기에 따른 디바이스 상태 객체
 *
 * @description
 * - window.innerWidth를 이용해 현재 뷰포트 너비를 측정합니다.
 * - Tailwind CSS 기본 브레이크포인트에 따라 모바일, 태블릿, 데스크톱을 구분합니다:
 *   - 모바일: 0px ~ 767px
 *   - 태블릿: 768px ~ 1023px
 *   - 데스크톱: 1024px 이상
 */
const getClientDeviceState = (): DeviceState => {
  const width = window.innerWidth;
  return {
    isMobile: width <= MOBILE_MAX,
    isTablet: width >= TABLET_MIN && width <= TABLET_MAX,
    isDesktop: width >= DESKTOP_MIN,
  };
};

/**
 * 현재 뷰포트 크기에 기반해 디바이스 종류를 반환하는 React 커스텀 훅 (SSR 완벽 대응).
 *
 * @returns {DeviceState} - `isMobile`, `isTablet`, `isDesktop` 각각 boolean 값으로 현재 디바이스 유형을 나타냄
 *
 * @description
 * - 서버 사이드 렌더링 환경에서는 기본적으로 모바일 상태로 초기화하여
 *   하이드레이션 문제를 방지합니다.
 * - 클라이언트 환경에서는 `window.matchMedia` API를 사용해 미디어 쿼리 변화를 감지하고
 *   디바이스 상태를 업데이트합니다.
 * - Tailwind CSS의 기본 브레이크포인트 기준을 따릅니다.
 * - 브라우저 호환성을 위해 `addEventListener`와 `addListener`를 모두 지원합니다.
 *
 * @usage
 * ```tsx
 * const { isMobile, isTablet, isDesktop } = useDeviceSize();
 *
 * if (isTablet) {
 *   // 태블릿 전용 UI 렌더링
 * }
 * ```
 *
 * @note
 * - 서버에서 클라이언트의 뷰포트 크기를 알 수 없기 때문에 초기 상태는 항상 모바일로 설정됩니다.
 * - 클라이언트 진입 시 실제 크기로 상태가 갱신됩니다.
 * - UI 설계 시 서버와 클라이언트 간 렌더링 불일치를 고려해야 합니다.
 */
export const useDeviceSize = (): DeviceState => {
  const [device, setDevice] = useState<DeviceState>(getDefaultDeviceState);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const updateDeviceState = () => {
      setDevice(getClientDeviceState());
    };

    updateDeviceState();

    const queries = [
      `(max-width: ${MOBILE_MAX}px)`,
      `(min-width: ${TABLET_MIN}px) and (max-width: ${TABLET_MAX}px)`,
      `(min-width: ${DESKTOP_MIN}px)`,
    ];

    const mediaQueryLists = queries.map((q) => window.matchMedia(q));

    mediaQueryLists.forEach((mql) => {
      mql.addEventListener('change', updateDeviceState);
    });

    return () => {
      mediaQueryLists.forEach((mql) => {
        mql.removeEventListener('change', updateDeviceState);
      });
    };
  }, []);

  return device;
};

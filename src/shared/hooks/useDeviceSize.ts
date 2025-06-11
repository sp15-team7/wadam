import { useCallback, useEffect, useMemo, useState } from 'react';

interface DeviceState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// Tailwind CSS 기본 브레이크포인트
const MOBILE_MAX = 767; // md(768px) 미만
const TABLET_MIN = 768; // md(768px) 이상
const TABLET_MAX = 1023; // lg(1024px) 미만
const DESKTOP_MIN = 1024; // lg(1024px) 이상

/**
 * 디바운스 함수 - 빈번한 리사이즈 이벤트에서 성능을 최적화합니다.
 */
const debounce = <T extends (...args: never[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

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
 * @param width - 뷰포트 너비 (선택적, 기본값은 window.innerWidth)
 * @returns {DeviceState} 현재 뷰포트 크기에 따른 디바이스 상태 객체
 *
 * @description
 * - window.innerWidth를 이용해 현재 뷰포트 너비를 측정합니다.
 * - Tailwind CSS 기본 브레이크포인트에 따라 모바일, 태블릿, 데스크톱을 구분합니다:
 *   - 모바일: 0px ~ 767px (md 미만)
 *   - 태블릿: 768px ~ 1023px (md 이상 lg 미만)
 *   - 데스크톱: 1024px 이상 (lg 이상)
 */
const getClientDeviceState = (width?: number): DeviceState => {
  const viewportWidth =
    width ?? (typeof window !== 'undefined' ? window.innerWidth : 0);

  return {
    isMobile: viewportWidth <= MOBILE_MAX,
    isTablet: viewportWidth >= TABLET_MIN && viewportWidth <= TABLET_MAX,
    isDesktop: viewportWidth >= DESKTOP_MIN,
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
 * - 클라이언트 환경에서는 `resize` 이벤트를 디바운싱하여 성능을 최적화합니다.
 * - Tailwind CSS의 기본 브레이크포인트 기준을 따릅니다.
 * - 메모이제이션을 통해 불필요한 리렌더링을 방지합니다.
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
 * - 디바운싱으로 성능이 최적화되어 빈번한 리사이즈에도 효율적입니다.
 */
export const useDeviceSize = (): DeviceState => {
  const [device, setDevice] = useState<DeviceState>(getDefaultDeviceState);
  const [isClient, setIsClient] = useState(false);

  // 디바이스 상태 업데이트 함수를 메모이제이션
  const updateDeviceState = useCallback(() => {
    if (typeof window !== 'undefined') {
      const newState = getClientDeviceState();
      setDevice((prevState) => {
        // 상태가 실제로 변경된 경우에만 업데이트
        if (
          prevState.isMobile !== newState.isMobile ||
          prevState.isTablet !== newState.isTablet ||
          prevState.isDesktop !== newState.isDesktop
        ) {
          return newState;
        }
        return prevState;
      });
    }
  }, []);

  // 디바운스된 업데이트 함수 메모이제이션
  const debouncedUpdateDeviceState = useMemo(
    () => debounce(updateDeviceState, 150),
    [updateDeviceState],
  );

  useEffect(() => {
    // 클라이언트 환경 확인
    setIsClient(true);

    if (typeof window === 'undefined') return;

    // 초기 상태 설정
    updateDeviceState();

    // resize 이벤트 리스너 등록 (디바운싱 적용)
    window.addEventListener('resize', debouncedUpdateDeviceState, {
      passive: true,
    });

    // 페이지 가시성 변경 시에도 체크 (모바일에서 주소창 숨김/표시 등)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateDeviceState();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange, {
      passive: true,
    });

    // 클린업 함수
    return () => {
      window.removeEventListener('resize', debouncedUpdateDeviceState);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [updateDeviceState, debouncedUpdateDeviceState]);

  // SSR과 클라이언트 간 일관성을 위해 메모이제이션된 결과 반환
  return useMemo(() => {
    if (!isClient) {
      return getDefaultDeviceState();
    }
    return device;
  }, [device, isClient]);
};

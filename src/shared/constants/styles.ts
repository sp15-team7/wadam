/**
 * @author Sumin
 * @since 2025-06-17
 * @description 공통 페이지 스타일 상수
 * 여러 페이지에서 재사용되는 스타일을 중앙 집중 관리
 */

export const PAGE_STYLES = {
  /**
   * 페이지 배경 오버레이 스타일
   * - 상단에서 -17.4rem 위치부터 시작
   * - 전체 화면 높이 + 17.4rem 높이
   * - 흰색 배경으로 오버레이
   * - z-index를 이용한 레이어 관리
   */
  backgroundOverlay:
    'after:content-[""] after:fixed after:top-[-17.4rem] after:left-0 after:w-full after:h-[calc(100dvh+17.4rem)] after:bg-[#ffffff] after:z-[-1] relative z-[2]',
} as const;

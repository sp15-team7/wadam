/**
 * @author: Hyun
 * @since: 2025-06-14
 * @description: 와인 맛 타입 정의 (바디감, 타닌, 당도, 산미) 및 기본값 정의
 */

// 타입 안정성을 위해 명시적으로 타입 정의
export type TasteType = '바디감' | '타닌' | '당도' | '산미';

// API post 시 와인 맛 타입을 영어로 변환하기 위해 사용
export const tasteTypeToEnglish: Record<TasteType, string> = {
  바디감: 'lightBold',
  타닌: 'smoothTannic',
  당도: 'drySweet',
  산미: 'softAcidic',
};

// 용도: 슬라이더 ui에서 각 맛의 양끝에 표시할 라벨
export const tasteLabels: Record<TasteType, { left: string; right: string }> = {
  바디감: { left: '가벼워요', right: '진해요' },
  타닌: { left: '부드러워요', right: '떫어요' },
  당도: { left: '드라이해요', right: '달아요' },
  산미: { left: '안셔요', right: '많이셔요' },
};

// 모든 맛 속성 배열 (반복문에서 순서대로 맛 속성 사용할 때 사용)
export const tasteList: TasteType[] = ['바디감', '타닌', '당도', '산미'];

// 0 ~ 100 사이의 값으로 표현 50은 중간값(default)
export const defaultTasteValues: Record<TasteType, number> = {
  바디감: 5,
  타닌: 5,
  당도: 5,
  산미: 5,
};

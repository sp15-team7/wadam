/**
 * AromaType에 해당하는 영문 키워드를 한국어로 포맷팅합니다.
 * 예: "CHERRY" → "체리"
 */

export const formatAromaType = (aroma: string): string => {
  const aromaMap: Record<string, string> = {
    CHERRY: '체리',
    BERRY: '베리',
    OAK: '오크',
    VANILLA: '바닐라',
    PEPPER: '후추',
    BAKING: '베이킹 향',
    GRASS: '풀',
    APPLE: '사과',
    PEACH: '복숭아',
    CITRUS: '감귤',
    TROPICAL: '트로피컬',
    MINERAL: '미네랄',
    FLOWER: '꽃',
    TOBACCO: '담배',
    EARTH: '흙',
    CHOCOLATE: '초콜릿',
    SPICE: '향신료',
    CARAMEL: '카라멜',
    LEATHER: '가죽',
  };

  return aromaMap[aroma] ?? aroma;
};

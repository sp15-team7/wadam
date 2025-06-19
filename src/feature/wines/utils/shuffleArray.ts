/**
 * @author Sumin
 * @since 2025-06-19
 * @description 배열을 랜덤하게 섞는 함수
 * @returns {T[]} 섞인 배열
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

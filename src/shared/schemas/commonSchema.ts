import { z } from 'zod';

// Zod Enum으로 와인 타입 정의
export const wineTypeSchema = z.enum([
  'RED',
  'WHITE',
  'SPARKLING',
  'ROSE',
  'ETC',
]);

// 사용자 정보 스키마
export const userSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  image: z.string(),
});

// 공통적인 Date 문자열 스키마 (ISO 8601 형식)
export const dateStringSchema = z
  .string()
  .datetime({ message: '유효한 날짜 및 시간 형식이어야 합니다.' });

// Zod 스키마로부터 TypeScript 타입 추론
export type User = z.infer<typeof userSchema>;

import { z } from 'zod';

const urlSchema = z.string().url();
export const nonNegativeNumberSchema = z.number().nonnegative();
const positiveNumberSchema = z.number().positive();
export const nonEmptyStringSchema = z.string().min(1);

/**
 * 와인의 종류를 나타내는 Enum
 * - RED: 레드 와인
 * - WHITE: 화이트 와인
 * - SPARKLING: 스파클링 와인
 */
export const WineTypeEnumSchema = z.enum(['RED', 'WHITE', 'SPARKLING']);

/**
 * 와인 향(아로마)을 나타내는 Enum
 * 여러 개 조합으로 선택 가능
 */
export const AromaTypeEnumSchema = z.enum([
  'CHERRY',
  'BERRY',
  'OAK',
  'VANILLA',
  'PEPPER',
  'BAKING',
  'GRASS',
  'APPLE',
  'PEACH',
  'CITRUS',
  'TROPICAL',
  'MINERAL',
  'FLOWER',
  'TOBACCO',
  'EARTH',
  'CHOCOLATE',
  'SPICE',
  'CARAMEL',
  'LEATHER',
]);

export const createWineRequestSchema = z.object({
  name: z.string(),
  region: z.string(),
  image: z.string(),
  price: z.number(),
  type: z.string(),
});

const recentReviewUserResponseSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  image: urlSchema,
});

const recentReviewResponseSchema = z.object({
  user: recentReviewUserResponseSchema,
  updatedAt: z.date(),
  createdAt: z.date(),
  content: z.string(),
  aroma: AromaTypeEnumSchema,
  rating: positiveNumberSchema,
  userId: z.number(),
});

export const createWineResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  region: z.string(),
  image: urlSchema,
  price: positiveNumberSchema,
  type: z.string(),
  avgRating: z.number(),
  reviewCount: z.number(),
  recentReview: recentReviewResponseSchema,
});

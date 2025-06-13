import { z } from 'zod';

// Aroma enum 스키마
export const AromaSchema = z.enum([
  'CHERRY',
  'BERRY',
  'CITRUS',
  'FLORAL',
  'HERBAL',
  'SPICY',
  'WOODY',
  'EARTHY',
  'VANILLA',
  'CHOCOLATE',
  'TOBACCO',
  'LEATHER',
  'MINERAL',
  'FRUITY',
  'NUTTY',
]);

// 사용자 스키마
export const UserSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  image: z.string().nullable(),
});

// 리뷰 스키마
export const RecentReviewSchema = z.object({
  id: z.number(),
  rating: z.number(),
  lightBold: z.number(),
  smoothTannic: z.number(),
  drySweet: z.number(),
  softAcidic: z.number(),
  aroma: z.array(AromaSchema),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  user: UserSchema,
  likes: z.array(z.unknown()), // likes 배열의 구체적인 타입이 명시되지 않았으므로 unknown으로 설정
});

// 와인 스키마
export const WineSchema = z.object({
  id: z.number(),
  name: z.string(),
  region: z.string(),
  image: z.string(),
  price: z.number(),
  type: z.string(),
  avgRating: z.number(),
  reviewCount: z.number(),
  recentReview: RecentReviewSchema,
  userId: z.number().optional(), // userId를 optional로 변경
});

// 와인 목록 스키마
export const WineListSchema = z.array(WineSchema);

// 타입 추출
export type Aroma = z.infer<typeof AromaSchema>;
export type User = z.infer<typeof UserSchema>;
export type RecentReview = z.infer<typeof RecentReviewSchema>;
export type Wine = z.infer<typeof WineSchema>;
export type WineList = z.infer<typeof WineListSchema>;

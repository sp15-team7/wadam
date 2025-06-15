import { z } from 'zod';

import {
  nonNegativeNumberSchema,
  positiveNumberSchema,
  urlSchema,
} from '@/shared/schemas/common.schema';

/**
 * 와인의 종류를 나타내는 Enum
 * - RED: 레드 와인
 * - WHITE: 화이트 와인
 * - SPARKLING: 스파클링 와인
 */
export const WineType = z.enum(['RED', 'WHITE', 'SPARKLING']);

/**
 * 와인 향(아로마)을 나타내는 Enum
 * 여러 개 조합으로 선택 가능
 */
export const AromaType = z.enum([
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

/**
 * 리뷰 등에 포함되는 요약 사용자 정보 스키마
 */
export const UserSummarySchema = z.object({
  id: z.number(),
  nickname: z.string(),
  image: z.string().nullable(),
});

/**
 * 개별 리뷰 상세 정보 응답 스키마
 * GET /wines/{id} 시 포함
 */
export const ReviewDetailSchema = z.object({
  id: z.number(),
  rating: z.number(),
  lightBold: z.number(),
  smoothTannic: z.number(),
  drySweet: z.number(),
  softAcidic: z.number(),
  aroma: z.array(AromaType),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  user: UserSummarySchema,
  isLiked: z.boolean(),
  wineId: z.number(),
  teamId: z.string(),
});

/**
 * 최근 리뷰 응답 스키마
 * 와인 요약 정보 내 nested 형태로 사용
 */
export const RecentReviewSchema = z.object({
  id: z.number(),
  rating: z.number(),
  aroma: z.array(AromaType),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  user: UserSummarySchema,
});

/**
 * 와인 생성 요청 Body 스키마
 * POST /{teamId}/wines
 */
export const CreateWineRequestSchema = z.object({
  name: z.string(),
  region: z.string(),
  image: urlSchema,
  price: nonNegativeNumberSchema,
  type: WineType,
});

/**
 * 와인 수정 요청 Body 스키마
 * PATCH /{teamId}/wines/{id}
 */
export const UpdateWineRequestSchema = z.object({
  name: z.string(),
  region: z.string(),
  image: urlSchema,
  price: nonNegativeNumberSchema,
  avgRating: positiveNumberSchema,
  type: WineType,
});

/**
 * 와인 목록에서 사용되는 단일 와인 요약 정보 스키마
 */
export const WineSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  region: z.string(),
  image: urlSchema,
  price: nonNegativeNumberSchema,
  type: z.string(), // NOTE: 서버 응답 시 enum 아님
  avgRating: positiveNumberSchema,
  reviewCount: z.number(),
  recentReview: RecentReviewSchema,
  userId: z.number(),
});

/**
 * 단일 와인 상세 조회 응답 스키마
 * GET /wines/{id}
 */
export const WineDetailResponseSchema = WineSummarySchema.extend({
  reviews: z.array(ReviewDetailSchema),
  avgRatings: z.record(z.string(), z.number()), // 예: lightBold: 4.2
});

/**
 * 와인 목록 조회 응답 스키마
 * GET /{teamId}/wines
 */
export const WineListResponseSchema = z.object({
  totalCount: z.number(),
  nextCursor: z.number().nullable().optional(),
  list: z.array(WineSummarySchema),
});

/**
 * 추천 와인 목록 조회 응답 스키마
 * GET /{teamId}/wines/recommended
 */
export const RecommendedWineListSchema = z.array(WineSummarySchema);

/**
 * 와인 목록 조회 쿼리 파라미터 유효성 스키마
 * limit, cursor, type, 가격 범위, 평점, 이름 검색 포함
 */
export const WineListQueryParamsSchema = z.object({
  limit: z.coerce.number().int().positive(),
  cursor: z.coerce.number().optional(),
  type: WineType.optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  name: z.string().optional(),
});

/**
 * 와인 삭제 응답 스키마
 * DELETE /{teamId}/wines/{id}
 */
export const DeleteWineResponseSchema = z.object({
  id: z.number(),
});

/**
 * 서버 공통 에러 응답 스키마
 */
export const ErrorResponseSchema = z.object({
  message: z.string(),
});

// Enum Types
export type WineType = z.infer<typeof WineType>;
export type AromaType = z.infer<typeof AromaType>;

// User
export type UserSummary = z.infer<typeof UserSummarySchema>;

// Review
export type ReviewDetail = z.infer<typeof ReviewDetailSchema>;
export type RecentReview = z.infer<typeof RecentReviewSchema>;

// Wine - Request
export type CreateWineRequest = z.infer<typeof CreateWineRequestSchema>;
export type UpdateWineRequest = z.infer<typeof UpdateWineRequestSchema>;

// Wine - Response
export type WineSummary = z.infer<typeof WineSummarySchema>;
export type WineDetailResponse = z.infer<typeof WineDetailResponseSchema>;
export type WineListResponse = z.infer<typeof WineListResponseSchema>;
export type RecommendedWineList = z.infer<typeof RecommendedWineListSchema>;

// Query
export type WineListQueryParams = z.infer<typeof WineListQueryParamsSchema>;

// Delete
export type DeleteWineResponse = z.infer<typeof DeleteWineResponseSchema>;

// Error
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

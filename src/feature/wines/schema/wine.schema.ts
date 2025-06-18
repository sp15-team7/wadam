import { z } from 'zod';

/*
 * =================================================================================
 * I. 기초 및 공통 컴포넌트 스키마 (Primitives & Reusable Components)
 * =================================================================================
 * 다른 스키마들을 조합하기 위해 사용되는 기본적인 빌딩 블록입니다.
 */

// --- A. 기본 타입 및 열거형 스키마 (Primitives & Enums) ---

const urlSchema = z.string().url().or(z.literal(''));
const nonNegativeNumberSchema = z.number().nonnegative();
const positiveNumberSchema = z.number().positive();
const nonEmptyStringSchema = z.string().min(1);

/** 와인의 종류 (RED, WHITE, SPARKLING) */
export const WineTypeEnumSchema = z.enum(['RED', 'WHITE', 'SPARKLING']);

/** 와인의 향(아로마) */
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

// --- B. 재사용 가능한 공통 객체 스키마 (Reusable Common Objects) ---

/** API 응답에 포함되는 공통 유저 정보 객체 */
export const userResponseSchema = z.object({
  id: positiveNumberSchema,
  nickname: nonEmptyStringSchema,
  image: urlSchema.nullable(),
});

/** API 응답에 포함되는 상세 리뷰 정보 객체 (유저 정보 포함) */
export const reviewResponseSchema = z.object({
  id: positiveNumberSchema,
  user: userResponseSchema,
  updatedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  content: z.string(),
  aroma: z.array(AromaTypeEnumSchema),
  rating: positiveNumberSchema.min(1).max(5),
});

/** 와인 상세 정보에 포함되는 개별 리뷰 객체 (선호도, 맛 표현 포함) */
export const wineDetailReviewSchema = reviewResponseSchema.extend({
  lightBold: positiveNumberSchema.min(1).max(100),
  smoothTannic: positiveNumberSchema.min(1).max(100),
  drySweet: positiveNumberSchema.min(1).max(100),
  softAcidic: positiveNumberSchema.min(1).max(100),
  isLiked: z.boolean(),
});

/** 모든 와인 정보의 기본이 되는 핵심 필드를 정의한 객체 */
const wineBaseSchema = z.object({
  id: positiveNumberSchema,
  name: nonEmptyStringSchema,
  region: nonEmptyStringSchema,
  image: urlSchema,
  price: positiveNumberSchema,
  type: WineTypeEnumSchema,
  avgRating: nonNegativeNumberSchema,
  reviewCount: nonNegativeNumberSchema,
  userId: positiveNumberSchema,
});

/** 와인 목록에 표시되는 개별 와인 아이템 객체 (간략한 최근 리뷰 포함) */
export const wineListItemSchema = wineBaseSchema.extend({
  recentReview: z
    .object({
      id: positiveNumberSchema,
      content: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    })
    .nullable(),
});

/*
 * =================================================================================
 * II. API별 요청/응답 스키마 (API-Specific Schemas)
 * =================================================================================
 * 실제 API 엔드포인트의 요청(Request)과 응답(Response)에 직접 사용되는 스키마입니다.
 */

// --- 1. 와인 생성: POST /{teamId}/wines ---

/**
 * @description [요청] 와인 생성을 요청할 때 Request Body를 검증합니다.
 */
export const createWineRequestSchema = z.object({
  name: nonEmptyStringSchema,
  region: nonEmptyStringSchema,
  image: urlSchema,
  price: positiveNumberSchema,
  type: WineTypeEnumSchema,
});

// 응답 스키마는 상단의 `wineListItemSchema`를 사용합니다.
/**
 * @description [응답] 와인 생성 API의 응답 객체를 검증합니다.
 */
export const createWineResponseSchema = wineListItemSchema;

// --- 2. 와인 목록 조회: GET /{teamId}/wines ---

/**
 * @description [응답] 와인 목록 조회 API의 전체 응답 객체를 검증합니다.
 */
export const getWinesResponseSchema = z.object({
  list: z.array(wineListItemSchema),
  totalCount: nonNegativeNumberSchema,
  nextCursor: positiveNumberSchema.nullable(),
});

// --- 3. 와인 상세 조회: GET /{teamId}/wines/{id} ---

/**
 * @description [응답] 와인 상세 조회 API의 전체 응답 객체를 검증합니다.
 */
export const getWineDetailResponseSchema = wineBaseSchema.extend({
  recentReview: reviewResponseSchema.nullable(),
  reviews: z.array(wineDetailReviewSchema),
  avgRatings: z.record(
    z.enum(['1', '2', '3', '4', '5']),
    nonNegativeNumberSchema,
  ),
});

// --- 4. 와인 수정: PATCH /{teamId}/wines/{id} ---

/**
 * @description [요청] 와인 수정을 요청할 때 Request Body를 검증합니다.
 * (`.partial()`을 사용하여 모든 필드를 선택적으로 만듭니다)
 */
export const updateWineRequestSchema = createWineRequestSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: '최소 하나의 필드를 수정해야 합니다.',
  });

// 응답 스키마는 상단의 `wineListItemSchema`를 사용합니다.
export const updateWineResponseSchema = wineListItemSchema;

// --- 5. 와인 삭제: DELETE /{teamId}/wines/{id} ---

/**
 * @description [응답] 와인 삭제 API의 응답 객체를 검증합니다.
 */
export const deleteWineResponseSchema = z.object({
  id: positiveNumberSchema,
});

export type WineTypeEnum = z.infer<typeof WineTypeEnumSchema>;
export type AromaTypeEnum = z.infer<typeof AromaTypeEnumSchema>;

// 기존 타입들과의 호환성을 위한 alias 추가
export type AromaType = AromaTypeEnum;
export type WineSummary = z.infer<typeof wineBaseSchema>;
export type ReviewDetail = z.infer<typeof wineDetailReviewSchema>;

export type CreateWineRequest = z.infer<typeof createWineRequestSchema>;
export type CreateWineResponse = z.infer<typeof createWineResponseSchema>;
export type GetWinesResponse = z.infer<typeof getWinesResponseSchema>;
export type GetWineDetailResponse = z.infer<typeof getWineDetailResponseSchema>;
export type UpdateWineRequest = z.infer<typeof updateWineRequestSchema>;
export type UpdateWineResponse = z.infer<typeof updateWineResponseSchema>;
export type DeleteWineResponse = z.infer<typeof deleteWineResponseSchema>;

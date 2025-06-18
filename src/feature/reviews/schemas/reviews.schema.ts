import { z } from 'zod';

import {
  wineDetailReviewSchema,
  WineTypeEnumSchema,
} from '@/feature/wines/schema/wine.schema';
import {
  nonEmptyStringSchema,
  nonNegativeNumberSchema,
  positiveNumberSchema,
  urlSchema,
} from '@/shared/schemas/common.schema';

// --- 6. 내 리뷰 목록 조회: GET /{teamId}/users/me/reviews ---

/**
 * @description 내 리뷰 목록에서 사용되는 개별 리뷰 스키마입니다.
 * isLiked 필드가 제외된 버전입니다.
 */
export const myReviewItemSchema = wineDetailReviewSchema.omit({
  isLiked: true,
});

/**
 * @description 와인 정보가 포함된 내 리뷰 아이템 스키마입니다.
 * 클라이언트에서 데이터를 조합한 후 사용됩니다.
 */
export const myReviewWithWineSchema = myReviewItemSchema.extend({
  wine: z.object({
    id: positiveNumberSchema,
    name: nonEmptyStringSchema,
    region: nonEmptyStringSchema,
    image: urlSchema,
    price: positiveNumberSchema,
    avgRating: positiveNumberSchema,
    type: WineTypeEnumSchema,
  }),
});

/**
 * @description [응답] 내 리뷰 목록 조회 API의 전체 응답 객체를 검증합니다.
 */
export const getMyReviewResponseSchema = z.object({
  list: z.array(myReviewWithWineSchema),
  totalCount: nonNegativeNumberSchema,
  nextCursor: positiveNumberSchema.nullable(),
});

export type GetMyReviewResponse = z.infer<typeof getMyReviewResponseSchema>;
export type MyReviewWithWine = z.infer<typeof myReviewWithWineSchema>;
export type MyReviewItem = z.infer<typeof myReviewItemSchema>;

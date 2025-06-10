import { z } from 'zod';

import {
  dateStringSchema,
  userSchema,
  wineTypeSchema,
} from '@/shared/schemas/commonSchema';
import type { CreateWineRequestBody } from '@/shared/types/api'; // Zod 추론과 일치하는지 확인용

// 와인 생성 요청 Body 스키마
export const createWineRequestBodySchema = z.object({
  name: z.string().min(1, '와인 이름은 필수입니다.'),
  region: z.string().min(1, '원산지는 필수입니다.'),
  image: z.string().url('유효한 이미지 URL이 필요합니다.'),
  price: z.number().min(0, '가격은 0 이상이어야 합니다.'),
  type: wineTypeSchema,
  alcohol: z.number().min(0, '도수는 0 이상이어야 합니다.'),
  sweetness: z.number().min(0).max(5, '당도는 0에서 5 사이여야 합니다.'),
  acidity: z.number().min(0).max(5, '산도는 0에서 5 사이여야 합니다.'),
  body: z.number().min(0).max(5, '바디감은 0에서 5 사이여야 합니다.'),
  tannin: z.number().min(0).max(5, '탄닌은 0에서 5 사이여야 합니다.'),
  aroma: z.array(z.string()).min(1, '아로마는 하나 이상 선택해야 합니다.'),
});

// Zod 스키마로부터 TypeScript 타입 추론
export type CreateWineRequestBodySchema = z.infer<
  typeof createWineRequestBodySchema
>;
// 이 타입이 types/api.ts의 CreateWineRequestBody와 일치하는지 확인
const _typeCheck: CreateWineRequestBody = {} as CreateWineRequestBodySchema;
void _typeCheck; // 읽히지 않음 오류를 해결하기 위한 코드

// 최근 리뷰 정보 스키마 (와인 상세에 포함)
export const recentReviewSchema = z
  .object({
    user: userSchema,
    updatedAt: dateStringSchema,
    createdAt: dateStringSchema,
    content: z.string(),
    aroma: z.array(z.string()),
    rating: z.number(),
    id: z.number(),
  })
  .nullable();

// 와인 상세 정보 응답 Body 스키마
export const wineDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  region: z.string(),
  image: z.string().url(),
  price: z.number(),
  type: wineTypeSchema,
  avgRating: z.number(),
  reviewCount: z.number(),
  recentReview: recentReviewSchema,
  userId: z.number(),
  alcohol: z.number(),
  sweetness: z.number(),
  acidity: z.number(),
  body: z.number(),
  tannin: z.number(),
  aroma: z.array(z.string()),
  reviews: z.array(z.any()).optional(),
  avgRatings: z.record(wineTypeSchema, z.number()).optional(),
});

export type WineDetailSchema = z.infer<typeof wineDetailSchema>;

/**
 * @author: Hyun
 * @since: 2025-06-18
 * @description: 유저 관련 API 함수 모음 (프로필 조회, 후기 개수 조회, 와인 개수 조회, 프로필 이미지 업로드, 프로필 정보 수정, 사용자 리뷰 목록 조회, 사용자 와인 목록 조회)
 * 추후 wine.service.ts에 추가될 예정 및 user.service.ts 만들 예정 (우선적으로 개발 후 추후 리팩토링 예정)
 */

import ky from 'ky';

import {
  CreateReviewRequest,
  MyReviewWithWine,
  UpdateReviewRequest,
  UpdateReviewResponse,
  updateReviewResponseSchema,
} from '@/feature/reviews/schemas/reviews.schema';
import { WineDetailReview } from '@/feature/wines/schema/wine.schema';
import { apiClient } from '@/shared/libs/api/apiClient';

export interface UserInfo {
  nickname: string;
  image: string;
}

// 와인 타입 (wine.schema.ts에 wineSummary를 가져와도 될 거같음)
export interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: 'RED' | 'WHITE' | 'SPARKLING'; // 디폴트 타입 3개
  avgRating: number;
  reviewCount: number;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
  recentReview?: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
});

// 유저 정보 조회
export async function getUserInfo(accessToken: string): Promise<UserInfo> {
  return api
    .get('users/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .json<UserInfo>();
}

// 후기 개수 조회
export async function getUserReviewCount(accessToken: string): Promise<number> {
  const data = await api
    .get('users/me/reviews?limit=1000', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .json<{
      list: WineDetailReview[];
      totalCount: number;
      nextCursor: number | null;
    }>();
  return data.totalCount;
}

// 와인 개수 조회
export async function getUserWineCount(accessToken: string): Promise<number> {
  const data = await api
    .get('users/me/wines?limit=1000', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .json<{ list: Wine[]; totalCount: number; nextCursor: number | null }>();
  return data.totalCount;
}

// 프로필 이미지 업로드
export async function uploadUserImage(
  accessToken: string,
  file: File,
): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const data = await apiClient
      .post('images/upload', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': undefined, // FormData 사용 시 Content-Type을 undefined로 설정
        },
        body: formData,
        timeout: false,
        throwHttpErrors: true, // HTTP 에러를 강제로 던지도록 설정
      })
      .json<{ url: string }>();

    if (!data.url) throw new Error('이미지 업로드 실패');
    return data.url;
  } catch (error: unknown) {
    // ky가 던진 에러를 다시 던지기
    if (error && typeof error === 'object' && 'response' in error) {
      const kyError = error as {
        response: { status: number; statusText: string };
      };
      throw new Error(
        `이미지 업로드 실패: ${kyError.response.status} ${kyError.response.statusText}`,
      );
    }
    throw error;
  }
}

// 프로필 정보 수정
export async function updateUserProfile(
  accessToken: string,
  data: { nickname: string; image?: string },
): Promise<UserInfo> {
  return api
    .patch('users/me', {
      json: data,
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .json();
}

//--- 사용자 리뷰 목록 조회 (ReviewCardList.tsx 사용)
export async function getUserReviews(
  accessToken: string,
  limit = 100,
): Promise<{
  list: MyReviewWithWine[];
  totalCount: number;
  nextCursor: number | null;
}> {
  return api
    .get(`users/me/reviews?limit=${limit}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .json<{
      list: MyReviewWithWine[];
      totalCount: number;
      nextCursor: number | null;
    }>();
}

// --- 사용자 와인 목록 조회 (WineCardList.tsx 사용)
export async function getUserWines(
  accessToken: string,
): Promise<{ list: Wine[]; totalCount: number; nextCursor: number | null }> {
  return api
    .get(`users/me/wines?limit=1000`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .json<{ list: Wine[]; totalCount: number; nextCursor: number | null }>();
}

// 와인 리뷰 작성 (ReviewForm.tsx 사용) - apiClient 사용
export const createReview = async (reviewData: CreateReviewRequest) => {
  return apiClient.post('reviews', { json: reviewData }).json();
};

// 와인 리뷰 수정 (EditReviewForm.tsx 사용) - apiClient 사용
export const updateReview = async (
  reviewId: number,
  reviewData: UpdateReviewRequest,
): Promise<UpdateReviewResponse> => {
  const response = await apiClient
    .patch(`reviews/${reviewId}`, { json: reviewData })
    .json();
  return updateReviewResponseSchema.parse(response);
};

// 와인 리뷰 삭제 (MyReviewCard.tsx 사용) - apiClient 사용
export const deleteReview = async (reviewId: number) => {
  return apiClient.delete(`reviews/${reviewId}`).json();
};

// 와인 삭제 (WineCardList.tsx 사용) - apiClient 사용
export const deleteWine = async (wineId: number) => {
  return apiClient.delete(`wines/${wineId}`).json();
};

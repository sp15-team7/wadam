import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  GetWineDetailResponse,
  WineDetailReview,
} from '@/feature/wines/schema/wine.schema';
import { likeReview, unlikeReview } from '../services/review.service';

export const useLikeReviewMutation = (wineId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      isLiked,
    }: {
      reviewId: number;
      isLiked: boolean;
    }) => (isLiked ? unlikeReview(reviewId) : likeReview(reviewId)),

    onMutate: async ({ reviewId, isLiked }) => {
      await queryClient.cancelQueries({ queryKey: ['wine', wineId] });

      const previousWineDetail =
        queryClient.getQueryData<GetWineDetailResponse>(['wine', wineId]);

      if (previousWineDetail) {
        queryClient.setQueryData<GetWineDetailResponse>(
          ['wine', wineId],
          (oldWine) => {
            if (!oldWine) {
              return undefined;
            }

            const newReviews = oldWine.reviews.map(
              (review: WineDetailReview) => {
                if (review.id === reviewId) {
                  return {
                    ...review,
                    isLiked: !isLiked,
                  };
                }
                return review;
              },
            );

            return {
              ...oldWine,
              reviews: newReviews,
            };
          },
        );
      }

      return { previousWineDetail };
    },

    onError: (context?: { previousWineDetail?: GetWineDetailResponse }) => {
      if (context?.previousWineDetail) {
        queryClient.setQueryData<GetWineDetailResponse>(
          ['wine', wineId],
          context.previousWineDetail,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wine', wineId] });
    },
  });
};

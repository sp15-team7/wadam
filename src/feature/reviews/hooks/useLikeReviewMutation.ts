import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { WineDetailReview } from '@/feature/wines/schema/wine.schema';

import { likeReview, unlikeReview } from '../services/review.service';

interface PaginatedReviews {
  list: WineDetailReview[];
  totalCount: number;
  nextCursor: number | null;
}

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
      const queryKey = ['wine', 'reviews', wineId];

      await queryClient.cancelQueries({ queryKey });

      const previousReviews =
        queryClient.getQueryData<InfiniteData<PaginatedReviews>>(queryKey);

      if (previousReviews) {
        queryClient.setQueryData<InfiniteData<PaginatedReviews>>(
          queryKey,
          (oldData) => {
            if (!oldData) {
              return undefined;
            }

            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                list: page.list.map((review) =>
                  review.id === reviewId
                    ? { ...review, isLiked: !isLiked }
                    : review,
                ),
              })),
            };
          },
        );
      }

      return { previousReviews };
    },

    onError: (err, variables, context) => {
      console.error('An error occurred:', err);
      const queryKey = ['wine', 'reviews', wineId];
      if (context?.previousReviews) {
        queryClient.setQueryData(queryKey, context.previousReviews);
      }
    },

    onSettled: () => {
      const queryKey = ['wine', 'reviews', wineId];
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

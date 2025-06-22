import { MyReviewWithWine } from '@/feature/reviews/schemas/reviews.schema';
import { formatRelativeTime } from '@/feature/reviews/utils/formatRelativeTime';
import CardDropdownMenu from '@/feature/wines/components/button/CardDropdownMenu';
import { Card, CardContent } from '@/shared/components/ui/card';

interface MyReviewCardProps {
  review: MyReviewWithWine;
  onEdit?: (review: MyReviewWithWine) => void;
  onDelete?: (reviewId: number) => void;
}

const MyReviewCard = ({ review, onEdit, onDelete }: MyReviewCardProps) => {
  const { wine, rating, updatedAt, content } = review;
  const { name } = wine;

  return (
    <Card className='px-[1rem] py-[1.6rem] md:px-[4rem] md:py-[2.4rem]'>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <p className='bg-secondary text-primary rounded-full px-[1rem] py-[0.6rem] text-[1.4rem] font-semibold md:px-[1.5rem] md:text-[1.8rem]'>
              ★ {rating.toFixed(1)}
            </p>
            <p className='text-[1.4rem] font-medium md:text-[1.6rem]'>
              {formatRelativeTime(updatedAt)}
            </p>
          </div>
          <div className='flex items-center'>
            <CardDropdownMenu
              onEditClick={onEdit ? () => onEdit(review) : undefined}
              onDeleteClick={onDelete ? () => onDelete(review.id) : undefined}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-[1.8rem] font-semibold md:text-[2rem]'>{name}</h2>
          <p className='text-[1.4rem] font-normal md:text-[1.6rem]'>
            {content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
export default MyReviewCard;

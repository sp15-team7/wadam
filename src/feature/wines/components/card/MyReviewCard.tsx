import CardDropdownMenu from '@/feature/wines/components/button/CardDropdownMenu';
// import { WineDetailReview } from '@/feature/wines/schema/wine.schema';
import { Card, CardContent } from '@/shared/components/ui/card';

const MyReviewCard = () => {
  return (
    <Card className='w-[34.3rem] px-[1rem] py-[1.6rem] md:w-[70.4rem] md:px-[4rem] md:py-[2.4rem] lg:w-[80rem]'>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <p className='bg-secondary text-primary rounded-full px-[1rem] py-[0.6rem] text-[1.4rem] font-semibold md:px-[1.5rem] md:text-[1.8rem]'>
              ★ 5.0
            </p>
            <p className='text-[1.4rem] font-medium md:text-[1.6rem]'>작성일</p>
          </div>
          <div className='flex items-center'>
            <CardDropdownMenu />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-[1.4rem] font-semibold md:text-[1.6rem]'>
            Sentinal Carbernet Sauvignon 2016
          </h2>
          <p className='text-[1.4rem] font-normal md:text-[1.6rem]'>
            Deep maroon color, tasting notes of blackberry, dark chocolate,
            plum. Super jammy and bold with some smoky after notes. Big flavor.
            Amazing value (would pay three times the price for it), well
            balanced flavor. Could drink all day everyday with or without food.
            I need more immediately.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
export default MyReviewCard;

import { Card, CardContent, CardFooter } from '@/shared/components/ui/card';

const WineCard = () => {
  return (
    <Card className='h-[36rem] w-[34.3rem] gap-0 rounded-4xl p-0 md:h-[37.5rem] md:w-[70.4rem] lg:w-[80rem]'>
      <CardContent className='flex h-full p-0'>
        <div className='flex flex-1 items-end justify-center bg-red-300'>
          <p>sadfasdf</p>
        </div>
        <div className='flex flex-2 flex-col justify-center bg-amber-200'>
          <h1 className=''>Sentinel Cabernet soap 2016</h1>
        </div>
        <div className='flex flex-1 bg-green-300'>asdfads</div>
      </CardContent>
      <CardFooter className='border-primary border-t-2 py-20'>
        asdlfkjasdlfkj
      </CardFooter>
    </Card>
  );
};
export default WineCard;

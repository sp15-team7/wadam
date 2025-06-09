import StarRating from '@/shared/components/ui/StarRating';

const LandingPage = () => {
  return (
    <div className='text-4xl-bold md:text-2xl-bold'>
      <StarRating value={3} />
    </div>
  );
};

export default LandingPage;

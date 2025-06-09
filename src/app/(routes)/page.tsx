import StarRating from '@/shared/components/common/star-rating';
import UserAvatar from '@/shared/components/common/user-avatar';

const LandingPage = () => {
  return (
    <div className='text-4xl-bold md:text-2xl-bold'>
      <StarRating />
      <StarRating readOnly />
      <UserAvatar
        src='/images/images-sample-user.png'
        isLoggedIn
      />
      <UserAvatar
        src='/icons/ui/icon-default-user.svg'
        alt='user-avatar'
        isLoggedIn
      />
      <UserAvatar
        isLoggedIn={false}
      />
    </div>
  );
};

export default LandingPage;

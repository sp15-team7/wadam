

const UserAvatar = ({
  src = '/icons/ui/icon-default-user.svg',
  alt = 'user-avatar',
  isLoggedIn = true,
}: {
  src?: string;
  alt?: string;
  isLoggedIn?: boolean;
}) => {
  return (
    <>
      {isLoggedIn ? (
        <button className='w-[4.7rem] h-[4.7rem] rounded-full overflow-hidden'>
          <img
            src={src}
            alt={alt}
            className='object-cover object-center w-full h-full'
          />
        </button>
      ) : (
        <img
          src={'/images/icons/ui/icon-burst.svg'}
          alt='login'
          className='w-[4.7rem] h-[4.7rem]'
        />
      )}
    </>
  );
};

export default UserAvatar;
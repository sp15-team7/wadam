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
        <button className='w-[4.7rem] h-[4.7rem] rounded-full relative overflow-hidden after:content-[""] after:absolute after:inset-[0.1rem] after:rounded-full after:z-10 after:border-1 after:border-secondary'>
          <img
            src={src}
            alt={alt}
            className='object-cover object-center w-full h-full'
          />
        </button>
      ) : (
        <img
          src={'/icons/ui/icon-burst.svg'}
          alt='login'
          className='w-[4.7rem] h-[4.7rem]'
        />
      )}
    </>
  );
};

export default UserAvatar;
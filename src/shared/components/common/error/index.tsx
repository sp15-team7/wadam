import Image from 'next/image';

const Error = ({
  message,
  children,
}: {
  message: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='flex-center flex flex-col text-center'>
      <div className='relative mb-[2.4rem] h-[13.6rem] w-[13.6rem]'>
        <Image
          src='/icons/ui/icon-error.png'
          alt='error'
          fill
          className='object-contain'
        />
      </div>
      <p className='txt-2lg-regular text-gray'>{message}</p>
      {children}
    </div>
  );
};

export default Error;

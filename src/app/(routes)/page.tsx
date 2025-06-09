import Link from 'next/link';
import Image from 'next/image';

const LandingPage = () => {
  return (
    <div className='mx-auto max-w-[34.3rem] px-[1.6rem]'>
      <section>
        <div className='h-full w-[34.3rem] pt-[5.6rem]'>
          <Image
            src='/logos/logo-red-landing.png'
            alt='logo'
            width={343}
            height={200}
          />
        </div>
        <p className='text-primary mt-[2rem] text-center text-[2.4rem] font-light'>
          와인의 미학과 담론
        </p>
        <Link
          href='/wines'
          className='border-primary mx-auto mt-[1.4rem] flex h-[3.9rem] w-[3.9rem] cursor-pointer items-center justify-center rounded-full border-2'
        >
          <img
            src='/icons/ui/icon-arrow-landing.svg'
            alt='arrow'
            className='h-[2.15rem] w-[1.266rem]'
          />
        </Link>
        <div className='mt-[2.6rem] flex items-center justify-between'>
          <div></div>
          <ul>
            <li>JAEHYUN</li>
            <li>SUMIN</li>
            <li>YUNGHYUN</li>
            <li>JINHYUNG</li>
            <li>SARANG</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
export default LandingPage;

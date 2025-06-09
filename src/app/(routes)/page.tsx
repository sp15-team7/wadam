import Link from 'next/link';
import Image from 'next/image';

const LandingPage = () => {
  const listItemClass =
    'border-primary text-primary text-medium flex h-[3.1rem] w-[7.4rem] items-center justify-center rounded-[50%] border-1 text-[1.3rem] font-medium tracking-[-0.065rem]';
  const sectionTitleClass =
    'text-primary text-[4.8rem] font-extrabold leading-[4rem]';
  const sectionSubTitleClass =
    'text-primary text-[1.4rem] font-light mt-[0.4rem] leading-[1.8rem]';
  return (
    <div className='mx-auto min-w-[34.3rem] px-[1.6rem]'>
      <section>
        <div className='mx-auto h-full w-[34.3rem] pt-[5.6rem]'>
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
          <div>
            <ul className='mb-[0.7rem] flex items-center gap-[1.3rem]'>
              <li>
                <img src='/icons/ui/icon-oak.svg' alt='oak' />
              </li>
              <li>
                <img src='/icons/ui/icon-grape.svg' alt='grape' />
              </li>
              <li>
                <img src='/icons/ui/icon-wine.svg' alt='wine' />
              </li>
            </ul>
            <p className='text-primary mb-[1.5rem] text-[1.1rem] font-light'>
              CODEIT SPRINT FRONTEND <br />
              PART3 TEAM7
            </p>
            <p className='text-primary text-[1.1rem] font-light'>
              This is a rebranding of ‘WHYNE’ <br />
              from the intermediate project theme. <br />
              The vintage beige colour is <br />
              used to complement <br />
              the warm red colour of wine, <br />
              and we want to give users a <br />
              warm wine <br />
              research experience.
            </p>
          </div>
          <ul className='relative pt-[1.5rem] after:absolute after:top-0 after:right-[50%] after:h-[1.5rem] after:w-[2.1rem] after:bg-[url("/icons/ui/icon-grape-top.svg")] after:bg-center after:bg-no-repeat after:content-[""]'>
            <li className={listItemClass}>JAEHYUN</li>
            <li className={listItemClass}>SUMIN</li>
            <li className={listItemClass}>YUNGHYUN</li>
            <li className={listItemClass}>JINHYUNG</li>
            <li className={listItemClass}>SARANG</li>
          </ul>
        </div>
      </section>
      <section className='relative mx-auto mt-[5rem] flex h-[50.8rem] max-w-[34.3rem] justify-center pt-[13rem]'>
        <Image
          src='/images/landing/image-wine-red-landing.png'
          alt='wine'
          width={207}
          height={367}
          className='absolute top-0 left-0 z-[-1]'
        />
        <Image
          src='/images/landing/image-wine-white-landing.png'
          alt='wine'
          width={375}
          height={364}
          className='absolute bottom-0 left-[-2.3rem] z-[-2] max-w-none'
        />
        <div>
          <h2 className={sectionTitleClass}>
            TODAY <br />
            WINE
          </h2>
          <p className={sectionSubTitleClass}>
            매달 새롭게 추천되는 <br />
            다양한 인기 와인을 <br />
            만나보세요.
          </p>
        </div>
      </section>
      <section className='relative mt-[5rem] h-[38.2rem] pt-[8rem]'>
        <div className='text-center'>
          <h2 className={sectionTitleClass}>
            FILTER <br />
            MY WINE
          </h2>
          <p className={sectionSubTitleClass}>
            와인의 종류만 수 만가지가 넘죠. <br />
            타입, 가격대, 평점 등의 필터로 <br />
            나를 더 기쁘게 할 와인을 찾아보세요.
          </p>
        </div>
        <ul className='mx-auto grid max-w-[34.3rem] grid-cols-4'>
          <li>
            <Image
              src='/images/landing/image-cherry.png'
              alt='cherry'
              width={85}
              height={85}
            />
          </li>
          <li>
            <Image
              src='/images/landing/image-peach.png'
              alt='peach'
              width={85}
              height={85}
            />
          </li>
          <li>
            <Image
              src='/images/landing/image-oak.png'
              alt='oak'
              width={85}
              height={85}
            />
          </li>
          <li>
            <Image
              src='/images/landing/image-star-anise.png'
              alt='star-anise'
              width={85}
              height={85}
            />
          </li>
          <li>
            <Image
              src='/images/landing/image-tobacco.png'
              alt='tobacco'
              width={85}
              height={85}
            />
          </li>
          <li>
            <Image
              src='/images/landing/image-herb.png'
              alt='herb'
              width={85}
              height={85}
            />
          </li>
          <li>
            <Image
              src='/images/landing/image-vanilla.png'
              alt='vanilla'
              width={85}
              height={85}
            />
          </li>
          <li>
            <Image
              src='/images/landing/image-apple.png'
              alt='apple'
              width={85}
              height={85}
            />
          </li>
        </ul>
      </section>
      <section className='relative h-[49.6rem]'>
        <Image
          src='/images/landing/image-folder.png'
          alt='wine'
          width={375}
          height={498}
          className='absolute top-0 left-0 z-[-1]'
        />
        <div className='pt-[21rem] text-center'>
          <h2 className={sectionTitleClass}>
            WINE <br /> REVIEWS
          </h2>
          <p className={sectionSubTitleClass}>
            와인의 종류만 수 만가지가 넘죠. <br />
            타입, 가격대, 평점 등의 필터로 <br />
            나를 더 기쁘게 할 와인을 찾아보세요.
          </p>
        </div>
      </section>
    </div>
  );
};
export default LandingPage;

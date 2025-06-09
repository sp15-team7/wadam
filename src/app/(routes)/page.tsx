import Link from 'next/link';
import Image from 'next/image';
import { useScroll, useTransform } from 'motion/react';
import * as motion from 'motion/react-client';

const LandingPage = () => {
  const listItemClass =
    'border-primary text-primary text-medium flex h-[3.1rem] w-[7.4rem] items-center justify-center rounded-[50%] border-1 text-[1.3rem] font-medium tracking-[-0.065rem]';
  const sectionTitleClass =
    'text-primary text-[4.8rem] font-extrabold leading-[4rem]';
  const sectionSubTitleClass =
    'text-primary text-[1.4rem] font-light mt-[0.4rem] leading-[1.8rem]';
  const iconVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };

  const iconsVariants = {
    hidden: {},
    visible: {
      transition: {
        delay: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const grapesVariants = {
    hidden: {},
    visible: {
      transition: {
        delay: 1,
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const grapeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };
  const grapeTopVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: [0, -10, 50, -3, 43, 0],
      transition: {
        y: { type: 'spring', stiffness: 300, damping: 20 },
        rotate: { duration: 1.2, ease: 'easeInOut' },
        opacity: { duration: 0.3 },
        delay: 1,
      },
    },
  };
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const sentenceVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };
  const textLines = ['CODEIT SPRINT FRONTEND', 'PART3 TEAM7'];

  const paragraphLines = [
    'This is a rebranding of ‘WHYNE’',
    'from the intermediate project theme.',
    'The vintage beige colour is',
    'used to complement',
    'the warm red colour of wine,',
    'and we want to give users a',
    'warm wine',
    'research experience.',
  ];
  return (
    <div className='mx-auto min-w-[34.3rem] px-[1.6rem]'>
      <section>
        <div className='mx-auto h-full w-[34.3rem] pt-[5.6rem]'>
          <motion.img
            src='/logos/logo-red-landing.png'
            alt='logo'
            width={343}
            height={200}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <motion.p
          className='text-primary mt-[2rem] text-center text-[2.4rem] font-light'
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          와인의 미학과 담론
        </motion.p>
        <motion.div
          className='mt-[1.4rem] flex items-center'
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: 0.3,
              },
            },
          }}
          initial='hidden'
          animate='visible'
        >
          <Link
            href='/wines'
            className='border-primary mx-auto flex h-[3.9rem] w-[3.9rem] cursor-pointer items-center justify-center rounded-full border-2'
          >
            <img
              src='/icons/ui/icon-arrow-right.svg'
              alt='arrow'
              className='h-[2.3rem] w-[2.3rem]'
            />
          </Link>
        </motion.div>
        <div className='mt-[2.6rem] flex items-center justify-between'>
          <div>
            <motion.ul
              className='mb-[0.7rem] flex items-center gap-[1.3rem]'
              variants={iconsVariants}
              initial='hidden'
              animate='visible'
            >
              <motion.li variants={iconVariants}>
                <img src='/icons/ui/icon-oak.svg' alt='oak' />
              </motion.li>
              <motion.li variants={iconVariants}>
                <img src='/icons/ui/icon-grape.svg' alt='grape' />
              </motion.li>
              <motion.li variants={iconVariants}>
                <img src='/icons/ui/icon-wine.svg' alt='wine' />
              </motion.li>
            </motion.ul>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={containerVariants}
            >
              <motion.p className='text-primary mb-[1.5rem] text-[1.1rem] font-light'>
                {textLines.map((line, i) => (
                  <motion.span
                    key={i}
                    variants={sentenceVariants}
                    className='block'
                  >
                    {line}
                  </motion.span>
                ))}
              </motion.p>

              <motion.p className='text-primary text-[1.1rem] font-light'>
                {paragraphLines.map((line, i) => (
                  <motion.span
                    key={i}
                    variants={sentenceVariants}
                    className='block'
                  >
                    {line}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </div>
          <motion.div
            className='relative pt-[1.5rem]'
            variants={grapesVariants}
            initial='hidden'
            animate='visible'
          >
            <motion.div
              className='absolute top-0 right-[50%] h-[1.5rem] w-[2.1rem] bg-[url("/icons/ui/icon-grape-top.svg")] bg-center bg-no-repeat'
              variants={grapeTopVariants}
              initial='hidden'
              animate='visible'
            />
            <motion.div className={listItemClass} variants={grapeVariants}>
              JAEHYUN
            </motion.div>
            <motion.div className={listItemClass} variants={grapeVariants}>
              SUMIN
            </motion.div>
            <motion.div className={listItemClass} variants={grapeVariants}>
              YUNGHYUN
            </motion.div>
            <motion.div className={listItemClass} variants={grapeVariants}>
              JINHYUNG
            </motion.div>
            <motion.div className={listItemClass} variants={grapeVariants}>
              SARANG
            </motion.div>
          </motion.div>
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

'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useScroll, useTransform, useInView } from 'motion/react';
import * as motion from 'motion/react-client';
import { useRef } from 'react';

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
  const section2Ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: section2Ref,
    offset: ['start end', 'end start'],
  });

  const redWineRotate = useTransform(scrollYProgress, [0, 1], [-10, 5]);
  const whiteWineRotate = useTransform(scrollYProgress, [0, 1], [-30, 5]);
  const isInView2 = useInView(section2Ref, {
    once: true,
    margin: '0px 0px -30% 0px',
  });

  const section2TitleVariants = {
    hidden: { opacity: 0, x: '-100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  };
  const section2SubTitleVariants = {
    hidden: { opacity: 0, x: '-100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.7,
      },
    },
  };

  const section3TitleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const section3SubTitleVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  const section3ItemVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: i % 2 === 0 ? -30 : 30,
      scale: 0.8,
      filter: 'blur(6px)',
    }),
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const section3Ref = useRef(null);
  const isInView3 = useInView(section3Ref, {
    once: true,
    margin: '0px 0px -50% 0px',
  });

  const noteImages = [
    'cherry',
    'peach',
    'oak',
    'star-anise',
    'tobacco',
    'herb',
    'vanilla',
    'apple',
  ];

  const section4ImageVariants = {
    hidden: {
      rotateX: 18,
      rotateY: -18,
      scale: 1.3,
      opacity: 0,
    },
    visible: {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const section4Ref = useRef(null);
  const isInView4 = useInView(section4Ref, {
    once: true,
    margin: '0px 0px -50% 0px',
  });

  const section4SubTitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  function splitText(text: string) {
    return text.split('').map((char, index) => ({
      char,
      key: `${char}-${index}`,
    }));
  }
  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05, // 순차적으로 등장
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
  };

  const section4Title = 'WINE\nREVIEWS';
  const section4Characters = splitText(section4Title);

  return (
    <div className='mx-auto min-w-[34.3rem] overflow-hidden px-[1.6rem] pb-[4.5rem]'>
      {/* section 1 */}
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
                delay: 0.5,
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
      {/* section 2 */}
      <section
        ref={section2Ref}
        className='relative mx-auto mt-[10rem] flex h-[50.8rem] max-w-[34.3rem] justify-center pt-[13rem]'
      >
        <motion.div
          style={{ rotate: redWineRotate }}
          className='absolute top-0 left-0 z-[-1] origin-bottom'
        >
          <Image
            src='/images/landing/image-wine-red-landing.png'
            alt='wine-red'
            width={207}
            height={367}
          />
        </motion.div>

        <motion.div
          style={{ rotate: whiteWineRotate }}
          className='absolute bottom-0 left-[-2.3rem] z-[-2] max-w-none origin-top'
        >
          <Image
            src='/images/landing/image-wine-white-landing.png'
            alt='wine-white'
            width={375}
            height={364}
          />
        </motion.div>

        <div className='w-[16.5rem] overflow-hidden'>
          <motion.h2
            className={sectionTitleClass}
            variants={section2TitleVariants}
            initial='hidden'
            animate={isInView2 ? 'visible' : 'hidden'}
          >
            TODAY <br /> WINE
          </motion.h2>
          <motion.p
            className={sectionSubTitleClass}
            variants={section2SubTitleVariants}
            initial='hidden'
            animate={isInView2 ? 'visible' : 'hidden'}
          >
            매달 새롭게 추천되는 <br />
            다양한 인기 와인을 <br />
            만나보세요.
          </motion.p>
        </div>
      </section>
      {/* section 3 */}
      <section ref={section3Ref} className='relative mt-[10rem] h-[38.2rem]'>
        <div className='text-center'>
          <motion.h2
            className={sectionTitleClass}
            variants={section3TitleVariants}
            initial='hidden'
            animate={isInView3 ? 'visible' : 'hidden'}
          >
            FILTER <br />
            MY WINE
          </motion.h2>
          <motion.p
            className={sectionSubTitleClass}
            variants={section3SubTitleVariants}
            initial='hidden'
            animate={isInView3 ? 'visible' : 'hidden'}
          >
            와인의 종류만 수 만가지가 넘죠. <br />
            타입, 가격대, 평점 등의 필터로 <br />
            나를 더 기쁘게 할 와인을 찾아보세요.
          </motion.p>
        </div>

        <ul className='mx-auto mt-[0.5rem] grid max-w-[34.3rem] grid-cols-4 gap-2'>
          {noteImages.map((name, i) => (
            <motion.li
              key={name}
              custom={i}
              variants={section3ItemVariants}
              initial='hidden'
              animate={isInView3 ? 'visible' : 'hidden'}
            >
              <Image
                src={`/images/landing/image-${name}.png`}
                alt={name}
                width={85}
                height={85}
              />
            </motion.li>
          ))}
        </ul>
      </section>
      {/* section 4 */}
      <section ref={section4Ref} className='relative mt-[5rem]'>
        <motion.div
          variants={section4ImageVariants}
          initial='hidden'
          animate={isInView4 ? 'visible' : 'hidden'}
          className='absolute top-0 left-0 z-[-1]'
          style={{ perspective: 800 }}
        >
          <Image
            src='/images/landing/image-folder.png'
            alt='wine'
            width={375}
            height={498}
          />
        </motion.div>

        <div className='pt-[21rem] text-center'>
          <motion.h2 className={sectionTitleClass}>
            {section4Characters.map(({ char, key }, i) =>
              char === '\n' ? (
                <br key={key} />
              ) : (
                <motion.span
                  key={key}
                  custom={i}
                  variants={charVariants}
                  initial='hidden'
                  animate={isInView4 ? 'visible' : 'hidden'}
                  className='inline-block'
                >
                  {char}
                </motion.span>
              ),
            )}
          </motion.h2>

          <motion.p
            variants={section4SubTitleVariants}
            initial='hidden'
            animate={isInView4 ? 'visible' : 'hidden'}
            className={sectionSubTitleClass}
          >
            와인의 종류만 수 만가지가 넘죠. <br />
            타입, 가격대, 평점 등의 필터로 <br />
            나를 더 기쁘게 할 와인을 찾아보세요.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={
            isInView4
              ? { opacity: 1, filter: 'blur(0px)' }
              : { opacity: 0, filter: 'blur(10px)' }
          }
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href='/wines'
            className='bg-primary mt-[25.3rem] flex h-[4.8rem] items-center justify-center rounded-full text-[1.4rem] font-bold text-white'
          >
            시작하기
          </Link>
        </motion.div>
      </section>
    </div>
  );
};
export default LandingPage;

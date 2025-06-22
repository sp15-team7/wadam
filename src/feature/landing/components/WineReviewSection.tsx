'use client';

import { useInView } from 'motion/react';
import * as motion from 'motion/react-client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { Button } from '@/shared/components/ui/button';

import { STYLES } from '../constants/styles';
import { sectionVariants } from '../utils/animations';
import { splitText } from '../utils/text';

const WineReviewSection = () => {
  const section4Ref = useRef(null);
  const isInView4 = useInView(section4Ref, {
    once: true,
    margin: '0px 0px -50% 0px',
  });

  const section4Title = 'WINE\nREVIEWS';
  const section4Characters = splitText(section4Title);

  const router = useRouter();
  const handleClick = () => {
    router.push('/wines');
  };

  return (
    <section
      ref={section4Ref}
      className='relative z-[10] mt-[15rem] md:mt-[20dvh] lg:mt-[30dvh] xl:mt-[40dvh]'
    >
      <motion.div
        variants={sectionVariants.wineReview.image}
        initial='hidden'
        animate={isInView4 ? 'visible' : 'hidden'}
        className='absolute top-0 left-0 z-[-1] md:top-[30%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%]'
        style={{ perspective: 800 }}
      >
        <Image
          src='/images/landing/image-folder.png'
          alt='wine'
          width={375}
          height={498}
          draggable='false'
          className='select-none md:h-[auto] md:w-[60rem]'
        />
      </motion.div>

      <div className='pt-[21rem] text-center'>
        <motion.h2 className={STYLES.sectionTitle}>
          {section4Characters.map(({ char, key }, i) =>
            char === '\n' ? (
              <br key={key} />
            ) : (
              <motion.span
                key={key}
                custom={i}
                variants={sectionVariants.wineReview.title}
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
          variants={sectionVariants.wineReview.subTitle}
          initial='hidden'
          animate={isInView4 ? 'visible' : 'hidden'}
          className={STYLES.sectionSubTitle}
        >
          와인은 취향의 언어죠. <br />
          다른 사람들의 솔직한 한 잔의 이야기에서 <br />내 취향을 발견해보세요.
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
        <Button
          size='full'
          onClick={handleClick}
          className='mx-auto mt-[20rem] text-[1.4rem] md:mt-[40rem] md:max-w-[57.6rem] md:text-[1.8rem] xl:max-w-[76.8rem]'
        >
          시작하기
        </Button>
      </motion.div>
    </section>
  );
};

export default WineReviewSection;

'use client';
import { useInView } from 'motion/react';
import * as motion from 'motion/react-client';
import Image from 'next/image';
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

  return (
    <section ref={section4Ref} className='relative mt-[5rem] md:mt-[20dvh]'>
      <motion.div
        variants={sectionVariants.wineReview.image}
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
        {/* <Link
          href='/wines'
          className='bg-primary mt-[20rem] flex h-[4.8rem] items-center justify-center rounded-full text-[1.4rem] font-bold text-white'
        >
          시작하기
        </Link> */}
        <Button
          size='full'
          className='mt-[20rem] text-[1.4rem] md:mt-[40rem] md:text-[1.8rem]'
        >
          시작하기
        </Button>
      </motion.div>
    </section>
  );
};

export default WineReviewSection;

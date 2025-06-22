'use client';
import { useInView, useScroll, useTransform } from 'motion/react';
import * as motion from 'motion/react-client';
import Image from 'next/image';
import { useRef } from 'react';

import { STYLES } from '../constants/styles';
import { sectionVariants } from '../utils/animations';

const TodayWineSection = () => {
  const section2Ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: section2Ref,
    offset: ['start end', 'end start'],
  });

  const redWineRotate = useTransform(scrollYProgress, [0, 1], [-10, 5]);
  const whiteWineRotate = useTransform(scrollYProgress, [0, 1], [-30, 5]);
  const isInView2 = useInView(section2Ref, {
    once: true,
    margin: '0px 0px -20% 0px',
  });

  return (
    <section
      ref={section2Ref}
      className='relative z-[10] mx-auto mb-[30dvh] flex h-[50.8rem] max-w-[34.3rem] justify-center pt-[13rem] md:mt-[10dvh] md:max-w-[42.5rem] md:pt-[15.8rem]'
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
          draggable='false'
          className='select-none md:h-auto md:w-[26.9rem]'
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
          draggable='false'
          className='select-none md:h-auto md:w-[60rem]'
        />
      </motion.div>

      <div className='w-[16.5rem] overflow-hidden md:w-[20.3rem]'>
        <motion.h2
          className={STYLES.sectionTitle}
          variants={sectionVariants.todayWine.title}
          initial='hidden'
          animate={isInView2 ? 'visible' : 'hidden'}
        >
          TODAY <br /> WINE
        </motion.h2>
        <motion.p
          className={STYLES.sectionSubTitle}
          variants={sectionVariants.todayWine.subTitle}
          initial='hidden'
          animate={isInView2 ? 'visible' : 'hidden'}
        >
          매달 새롭게 추천되는 <br />
          다양한 인기 와인을 <br />
          만나보세요.
        </motion.p>
      </div>
    </section>
  );
};

export default TodayWineSection;

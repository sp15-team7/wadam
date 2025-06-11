'use client';
import Image from 'next/image';
import { useInView } from 'motion/react';
import * as motion from 'motion/react-client';
import { useRef } from 'react';
import { sectionVariants } from '../utils/animations';
import { NOTE_IMAGES } from '../constants/content';
import { STYLES } from '../constants/styles';

const FilterMyWineSection = () => {
  const filterWineRef = useRef(null);
  const isInViewFilterWine = useInView(filterWineRef, {
    once: true,
    margin: '0px 0px -50% 0px',
  });

  return (
    <section ref={filterWineRef} className='relative mt-[10rem] h-[38.2rem]'>
      <div className='text-center'>
        <motion.h2
          className={STYLES.sectionTitle}
          variants={sectionVariants.filterWine.title}
          initial='hidden'
          animate={isInViewFilterWine ? 'visible' : 'hidden'}
        >
          FILTER <br />
          MY WINE
        </motion.h2>
        <motion.p
          className={STYLES.sectionSubTitle}
          variants={sectionVariants.filterWine.subTitle}
          initial='hidden'
          animate={isInViewFilterWine ? 'visible' : 'hidden'}
        >
          와인의 종류만 수 만가지가 넘죠. <br />
          타입, 가격대, 평점 등의 필터로 <br />
          나를 더 기쁘게 할 와인을 찾아보세요.
        </motion.p>
      </div>

      <ul className='mx-auto mt-[0.5rem] grid max-w-[34.3rem] grid-cols-4 gap-2'>
        {NOTE_IMAGES.map((name, i) => (
          <motion.li
            key={name}
            custom={i}
            variants={sectionVariants.filterWine.item}
            initial='hidden'
            animate={isInViewFilterWine ? 'visible' : 'hidden'}
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
  );
};

export default FilterMyWineSection;

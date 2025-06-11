'use client';
import * as motion from 'motion/react-client';
import Image from 'next/image';
import Link from 'next/link';

import {
  HERO_PARAGRAPH_LINES,
  HERO_TEXT_LINES,
  TEAM_MEMBERS,
} from '../constants/content';
import { STYLES } from '../constants/styles';
import { HeroVariants } from '../utils/animations';

const Hero = () => {
  return (
    <section className='flex min-h-[100dvh] flex-col justify-center md:min-h-auto md:pt-[20rem] md:pb-[20rem]'>
      <div className='h-full w-full'>
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src='/logos/logo-red-landing.png'
            alt='logo'
            width={343}
            height={200}
            className='mx-auto'
          />
        </motion.div>
      </div>

      <motion.p
        className='text-primary mt-[2rem] text-center text-[2.4rem] font-light md:mt-[4rem] md:text-[3rem]'
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        와인의 미학과 담론
      </motion.p>

      <motion.div
        className='mt-[2.4rem] flex items-center md:mt-[4rem]'
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
          className='border-primary mx-auto flex h-[3.9rem] w-[3.9rem] cursor-pointer items-center justify-center rounded-full border-2 md:h-[5.6rem] md:w-[5.6rem]'
        >
          <Image
            src='/icons/ui/icon-arrow-right.svg'
            alt='arrow'
            className='h-[2.3rem] w-[2.3rem] md:h-[3.2rem] md:w-[3.2rem]'
            width={23}
            height={23}
          />
        </Link>
      </motion.div>

      <div className='mt-[5rem] flex items-center justify-between md:mt-[10rem]'>
        <div>
          <motion.ul
            className='mb-[0.7rem] flex items-center gap-[1.3rem] md:mb-[3rem] md:gap-[2rem]'
            variants={HeroVariants.icons}
            initial='hidden'
            animate='visible'
          >
            <motion.li variants={HeroVariants.icon}>
              <Image
                src='/icons/ui/icon-oak.svg'
                alt='oak'
                width={24}
                height={24}
                className='w-auto md:h-[4rem]'
              />
            </motion.li>
            <motion.li variants={HeroVariants.icon}>
              <Image
                src='/icons/ui/icon-grape.svg'
                alt='grape'
                width={24}
                height={24}
                className='w-auto md:h-[4rem]'
              />
            </motion.li>
            <motion.li variants={HeroVariants.icon}>
              <Image
                src='/icons/ui/icon-wine.svg'
                alt='wine'
                width={24}
                height={24}
                className='w-auto md:h-[4rem]'
              />
            </motion.li>
          </motion.ul>

          <motion.div
            initial='hidden'
            animate='visible'
            variants={HeroVariants.container}
          >
            <motion.p className='text-primary mb-[1.5rem] text-[1.3rem] font-light md:text-[1.6rem]'>
              {HERO_TEXT_LINES.map((line, i) => (
                <motion.span
                  key={i}
                  variants={HeroVariants.sentence}
                  className='block'
                >
                  {line}
                </motion.span>
              ))}
            </motion.p>

            <motion.p className='text-primary text-[1.3rem] font-light md:text-[1.6rem]'>
              {HERO_PARAGRAPH_LINES.map((line, i) => (
                <motion.span
                  key={i}
                  variants={HeroVariants.sentence}
                  className='block'
                >
                  {line}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className='relative pt-[1.5rem] md:pt-[2.4rem]'
          variants={HeroVariants.grapes}
          initial='hidden'
          animate='visible'
        >
          <motion.div
            className='absolute top-0 right-[50%] h-[1.5rem] w-[2.1rem] bg-[url("/icons/ui/icon-grape-top.svg")] bg-contain bg-center bg-no-repeat md:h-[2.4rem] md:w-[3.2rem]'
            variants={HeroVariants.grape}
          />
          {TEAM_MEMBERS.map((member) => (
            <motion.div
              key={member}
              className={STYLES.listItem}
              variants={HeroVariants.grape}
            >
              {member}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

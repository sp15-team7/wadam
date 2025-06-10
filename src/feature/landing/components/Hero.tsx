'use client';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import {
  iconVariants,
  iconsVariants,
  containerVariants,
  sentenceVariants,
  grapesVariants,
  grapeVariants,
  grapeTopVariants,
} from '../utils/animations';
import {
  HERO_TEXT_LINES,
  HERO_PARAGRAPH_LINES,
  TEAM_MEMBERS,
} from '../constants/content';
import { STYLES } from '../constants/styles';

const Hero = () => {
  return (
    <section className='pt-[5.6rem]'>
      <div className='mx-auto h-full w-[34.3rem]'>
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

      <div className='mt-[3.6rem] flex items-center justify-between'>
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
              {HERO_TEXT_LINES.map((line, i) => (
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
              {HERO_PARAGRAPH_LINES.map((line, i) => (
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
          {TEAM_MEMBERS.map((member) => (
            <motion.div
              key={member}
              className={STYLES.listItem}
              variants={grapeVariants}
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

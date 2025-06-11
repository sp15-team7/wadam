export const HeroVariants = {
  icon: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  icons: {
    hidden: {},
    visible: {
      transition: {
        delay: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  grape: {
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
  },
  grapes: {
    hidden: {},
    visible: {
      transition: {
        delay: 1,
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  },
  grapeTop: {
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
  },
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  sentence: {
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
  },
};

export const sectionVariants = {
  todayWine: {
    title: {
      hidden: { opacity: 0, x: '-100%' },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          delay: 0.5,
          ease: 'easeOut',
        },
      },
    },
    subTitle: {
      hidden: { opacity: 0, x: '-100%' },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          delay: 0.7,
          ease: 'easeOut',
        },
      },
    },
    item: '...',
  },
  filterWine: {
    title: {
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6 },
      },
    },
    subTitle: {
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, delay: 0.2 },
      },
    },
    item: {
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
    },
  },
  wineReview: {
    image: {
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
    },
    title: {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.05,
          duration: 0.4,
          ease: 'easeOut',
        },
      }),
    },
    subTitle: {
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
    },
  },
};

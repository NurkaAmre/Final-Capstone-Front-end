export const pageAnimation = {
  hidden: {
    opacity: 0,
    y: 300,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      when: 'beforeChildren',
      staggerChildren: 0.25,
    },
  },
  exit: {
    opacity: 1,
    y: 300,
    transition: {
      duration: 1,
    },
  },
};

export const sliderContainer = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, ease: 'easeOut' } },
};

export const slider = {
  hidden: { x: '-130%', skew: '45deg' },
  show: {
    x: '100%',
    skwe: '0deg',
    transition: { ease: 'easeOut', duration: 1 },
  },
};

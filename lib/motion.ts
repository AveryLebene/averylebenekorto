import type { Variants } from "framer-motion";

/** Subtle easing and durations — minimal editorial-style motion. */
export const motionSoftEase = [0.22, 1, 0.36, 1] as const;

export const motionPageDuration = 0.59;

export const motionMediaDuration = 0.42;

const blockTransition = {
  duration: 0.62,
  ease: motionSoftEase,
} as const;

/**
 * Slow, staggered text / block reveals (portfolio-style, e.g. joeatteen.com/projects).
 * Respects reduced motion.
 */
export function pageContentStagger(reducedMotion: boolean | null): {
  section: Variants;
  block: Variants;
  grid: Variants;
  card: Variants;
} {
  if (reducedMotion) {
    const still: Variants = {
      hidden: { opacity: 1, y: 0 },
      show: { opacity: 1, y: 0 },
    };
    return {
      section: { hidden: {}, show: {} },
      block: still,
      grid: { hidden: {}, show: {} },
      card: still,
    };
  }

  return {
    section: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.14,
          delayChildren: 0.1,
        },
      },
    },
    block: {
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: blockTransition,
      },
    },
    grid: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.06,
        },
      },
    },
    card: {
      hidden: { opacity: 0, y: 24 },
      show: {
        opacity: 1,
        y: 0,
        transition: blockTransition,
      },
    },
  };
}

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { Variants, Variant } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  variants?: Variants;
  customVariant?: string;
  threshold?: number;
  delay?: number;
  className?: string;
}

const defaultVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

const ScrollReveal = ({
  children,
  variants = defaultVariants,
  customVariant = '',
  threshold = 0.1,
  delay = 0,
  className = ''
}: ScrollRevealProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start(customVariant || 'visible');
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, threshold, customVariant]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal; 
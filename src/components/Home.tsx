import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// 3D Makeup icons using SVG
const MakeupIcon = ({ icon, className, style }: { icon: string; className?: string; style?: React.CSSProperties }) => {
  return (
    <motion.div 
      className={`makeup-icon makeup-icon-3d ${className}`} 
      style={style}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {icon === 'lipstick' && (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28 16V42C28 44.2091 26.2091 46 24 46H19C16.7909 46 15 44.2091 15 42V16" fill="#FF6B9D"/>
          <path d="M15 16H28V12C28 9.79086 26.2091 8 24 8H19C16.7909 8 15 9.79086 15 12V16Z" fill="#FFD1DC"/>
          <path d="M28 16V42C28 44.2091 26.2091 46 24 46H19C16.7909 46 15 44.2091 15 42V16H28Z" stroke="#333" strokeWidth="2"/>
          <path d="M15 16H28V12C28 9.79086 26.2091 8 24 8H19C16.7909 8 15 9.79086 15 12V16Z" stroke="#333" strokeWidth="2"/>
        </svg>
      )}
      {icon === 'brush' && (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44 12L20 36L16 48L28 44L52 20L44 12Z" fill="#FFD1DC" stroke="#333" strokeWidth="2"/>
          <path d="M36 20L44 28" stroke="#333" strokeWidth="2"/>
        </svg>
      )}
      {icon === 'powder' && (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="20" fill="#FFD1DC" stroke="#333" strokeWidth="2"/>
          <circle cx="32" cy="32" r="16" fill="#FF90BC" stroke="#333" strokeWidth="2"/>
          <path d="M24 24L40 40" stroke="#333" strokeWidth="2"/>
          <path d="M40 24L24 40" stroke="#333" strokeWidth="2"/>
        </svg>
      )}
      {icon === 'mascara' && (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="12" width="10" height="30" rx="2" fill="#333" stroke="#333" strokeWidth="2"/>
          <path d="M25 42V52" stroke="#333" strokeWidth="2"/>
          <path d="M22 52H28" stroke="#333" strokeWidth="2"/>
          <rect x="24" y="16" width="2" height="20" fill="#FF90BC"/>
          <path d="M30 12H38C39.1046 12 40 12.8954 40 14V18C40 19.1046 39.1046 20 38 20H30V12Z" fill="#FF6B9D" stroke="#333" strokeWidth="2"/>
        </svg>
      )}
      {icon === 'eyeshadow' && (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="20" width="40" height="24" rx="4" fill="#333" stroke="#333" strokeWidth="2"/>
          <rect x="16" y="24" width="8" height="8" rx="2" fill="#FFD1DC" stroke="#333"/>
          <rect x="26" y="24" width="8" height="8" rx="2" fill="#FF90BC" stroke="#333"/>
          <rect x="36" y="24" width="8" height="8" rx="2" fill="#FF6B9D" stroke="#333"/>
          <rect x="16" y="34" width="28" height="6" rx="2" fill="#FFD1DC" stroke="#333"/>
        </svg>
      )}
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax and rotation values for each icon
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const rotate4 = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const rotate5 = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const translateY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const translateY2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const translateY3 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const translateY4 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const translateY5 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-light-pink/30 dark:from-gray-900 dark:to-dark-pink/30">
      {/* Background makeup icons */}
      <motion.div className="absolute w-full h-full overflow-hidden">
        <motion.div style={{ rotate: rotate1, y: translateY1, x: '-5vw' }} className="absolute top-[10%] left-[10%]">
          <MakeupIcon icon="lipstick" />
        </motion.div>
        <motion.div style={{ rotate: rotate2, y: translateY2, x: '5vw' }} className="absolute top-[15%] right-[15%]">
          <MakeupIcon icon="brush" />
        </motion.div>
        <motion.div style={{ rotate: rotate3, y: translateY3, x: '-10vw' }} className="absolute top-[40%] left-[20%]">
          <MakeupIcon icon="powder" />
        </motion.div>
        <motion.div style={{ rotate: rotate4, y: translateY4, x: '8vw' }} className="absolute bottom-[25%] right-[20%]">
          <MakeupIcon icon="mascara" />
        </motion.div>
        <motion.div style={{ rotate: rotate5, y: translateY5, x: '-3vw' }} className="absolute bottom-[15%] left-[15%]">
          <MakeupIcon icon="eyeshadow" />
        </motion.div>
      </motion.div>

      {/* Hero Content */}
      <div className="container-section h-screen flex flex-col justify-center items-center text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-dark-pink to-light-pink dark:from-light-pink dark:to-dark-pink"
        >
          Beauty Redefined
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl mb-8 max-w-2xl"
        >
          Professional makeup artistry that enhances your natural beauty and brings your vision to life.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#portfolio"
            className="rounded-rounded bg-dark-pink dark:bg-light-pink text-white dark:text-gray-900 font-bold py-3 px-8 shadow-lg"
          >
            View Portfolio
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="rounded-rounded border-2 border-dark-pink dark:border-light-pink text-dark-pink dark:text-light-pink font-bold py-3 px-8"
          >
            Book Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 
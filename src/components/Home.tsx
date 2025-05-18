import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import AnimatedButton from './AnimatedButton';

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

  // Transform values for 3D animation based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  
  // Animation for sequential fade-in of icons
  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Add a subtle cursor-following effect to the hero background
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      
      // Apply a subtle transform to create a parallax/3D effect
      containerRef.current.style.transform = `perspective(1000px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  if (!mounted) return null;

  return (
    <section id="home" ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background with a subtle gradient and animated effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-light-pink/20 dark:from-gray-900 dark:to-dark-pink/20 z-0"></div>
      
      {/* Abstract decorative elements */}
      <motion.div 
        className="absolute top-20 left-20 w-64 h-64 bg-light-pink dark:bg-dark-pink rounded-full opacity-20 blur-3xl"
        animate={{
          x: [0, 10, 0],
          y: [0, 15, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-20 w-96 h-96 bg-light-pink dark:bg-dark-pink rounded-full opacity-20 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container-section relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          {/* Main heading - not using whileInView to ensure immediate display */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-dark-pink to-light-pink bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Lashes By Sarah
          </motion.h1>
          
          <ScrollReveal delay={0.2}>
            <p className="text-xl mb-8">
              Enhancing your natural beauty with professional lash extensions, eyebrow styling, and makeup artistry.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton 
                text="Book Now"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                glowing={true}
                gradient={true}
                className="font-bold py-3 px-8"
              />
              
              <AnimatedButton 
                text="Explore Services"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="font-bold py-3 px-8"
              />
            </div>
          </ScrollReveal>
        </div>
        
        <motion.div 
          style={{ rotateX, rotateY, scale, opacity }}
          className="relative h-[400px] w-[400px] hidden lg:block"
        >
          {/* 3D makeup icons floating in a circle */}
          {[
            { icon: "💄", x: "50%", y: "10%", size: "text-6xl", delay: 0 },
            { icon: "💋", x: "85%", y: "50%", size: "text-5xl", delay: 0.2 },
            { icon: "👁️", x: "15%", y: "45%", size: "text-5xl", delay: 0.4 },
            { icon: "💅", x: "70%", y: "85%", size: "text-6xl", delay: 0.6 },
            { icon: "✨", x: "20%", y: "80%", size: "text-5xl", delay: 0.8 },
          ].map((item, index) => (
            <motion.div 
              key={index}
              className={`absolute makeup-icon makeup-icon-3d ${item.size}`}
              style={{ left: item.x, top: item.y }}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={iconVariants}
              whileHover={{ scale: 1.2, rotate: 5 }}
              drag
              dragConstraints={{
                top: -50,
                left: -50,
                right: 50,
                bottom: 50,
              }}
            >
              {item.icon}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a 
          href="#services" 
          className="flex flex-col items-center text-gray-400 dark:text-gray-500"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </a>
      </motion.div>
    </section>
  );
} 
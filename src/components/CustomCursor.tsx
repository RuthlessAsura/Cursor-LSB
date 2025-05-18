import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return (
    <>
      {/* Main cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-dark-pink opacity-70 pointer-events-none z-50"
        animate={{ x: mousePosition.x - 10, y: mousePosition.y - 10 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      
      {/* Outer glow cursor with delay */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-light-pink pointer-events-none z-40"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.03 }}
      />
    </>
  );
};

export default CustomCursor; 
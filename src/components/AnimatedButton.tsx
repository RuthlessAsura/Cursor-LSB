import { motion } from 'framer-motion';
import { useState } from 'react';

interface AnimatedButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  glowing?: boolean;
  gradient?: boolean;
}

const AnimatedButton = ({
  text,
  onClick,
  className = '',
  variant = 'primary',
  glowing = false,
  gradient = false
}: AnimatedButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Base classes for different variants
  const variantClasses = {
    primary: 'bg-dark-pink text-white',
    secondary: 'bg-light-pink text-gray-800',
    outline: 'bg-transparent border border-dark-pink text-dark-pink'
  };

  // Gradient styles
  const gradientStyle = gradient
    ? {
        backgroundImage: 'linear-gradient(45deg, var(--dark-pink) 0%, var(--light-pink) 100%)',
        backgroundSize: '200% 100%',
        backgroundPosition: isHovered ? '100% 0' : '0% 0'
      }
    : {};
  
  // Animation variants - faster and smoother
  const buttonVariants = {
    initial: {
      scale: 1,
      y: 0,
      boxShadow: glowing
        ? '0 0 10px rgba(255, 144, 188, 0.5)'
        : '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    hover: {
      scale: 1.03,
      y: -2,
      boxShadow: glowing
        ? '0 0 15px rgba(255, 144, 188, 0.7), 0 0 30px rgba(255, 144, 188, 0.4)'
        : '0 6px 10px rgba(0, 0, 0, 0.15)',
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  // Pulsing glow animation
  const pulseAnimation = glowing
    ? {
        animate: {
          boxShadow: [
            '0 0 10px rgba(255, 144, 188, 0.5)',
            '0 0 20px rgba(255, 144, 188, 0.7)',
            '0 0 10px rgba(255, 144, 188, 0.5)'
          ],
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse' as const
          }
        }
      }
    : {};

  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-medium transition-all relative overflow-hidden ${variantClasses[variant]} ${className}`}
      style={gradientStyle}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      {...pulseAnimation}
    >
      <span className="relative z-10">{text}</span>
      
      {/* Modified button hover effect - more subtle gradient instead of white */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-light-pink/20 to-transparent"
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "100%" }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.button>
  );
};

export default AnimatedButton; 
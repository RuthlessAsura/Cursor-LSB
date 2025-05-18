import type { Variants } from 'framer-motion';

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
};

// Slide in animation
export const slideIn = (direction: "left" | "right" | "up" | "down"): Variants => {
  const directionMap = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 }
  };

  return {
    hidden: { opacity: 0, ...directionMap[direction] },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.5 
      } 
    }
  };
};

// Staggered animation for list items
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Scale animation for images
export const imageScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 } 
  },
  hover: { 
    scale: 1.08,
    transition: { duration: 0.3 } 
  }
};

// Text reveal with gradient animation
export const gradientText: Variants = {
  hidden: { 
    opacity: 0,
    backgroundPosition: "0% 50%"
  },
  visible: { 
    opacity: 1,
    backgroundPosition: "100% 50%",
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    } 
  }
};

// Button hover animation
export const buttonHover: Variants = {
  initial: { 
    boxShadow: "0px 4px 10px rgba(255, 144, 188, 0.3)"
  },
  hover: { 
    scale: 1.05,
    boxShadow: "0px 8px 20px rgba(255, 144, 188, 0.5)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Page transition
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

// Card hover effect
export const cardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
  },
  hover: {
    y: -6,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3 }
  }
};

// Text link underline animation
export const linkUnderline = {
  initial: { width: "0%" },
  hover: { 
    width: "100%", 
    transition: { 
      duration: 0.3,
      ease: "easeInOut" 
    } 
  }
}; 
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}

const GlassCard = ({ children, className = '', animated = true }: GlassCardProps) => {
  const cardVariants = {
    initial: { 
      y: 0, 
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)' 
    },
    hover: {
      y: -5,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      className={`backdrop-blur-md bg-white/30 dark:bg-black/20 rounded-lg border border-white/20 p-6 ${className}`}
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
      }}
      variants={animated ? cardVariants : undefined}
      initial={animated ? 'initial' : undefined}
      whileHover={animated ? 'hover' : undefined}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard; 
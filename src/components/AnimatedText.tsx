import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  type?: 'heading' | 'paragraph';
  className?: string;
  gradient?: boolean;
  staggered?: boolean;
}

const AnimatedText = ({
  text,
  type = 'heading',
  className = '',
  gradient = false,
  staggered = false
}: AnimatedTextProps) => {
  // Split text by words for staggered animation
  const words = text.split(' ');
  
  // Heading variants
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: staggered ? i * 0.05 : 0,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  // Paragraph variants
  const paragraphVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };
  
  // Gradient styles for text
  const gradientStyle = gradient 
    ? { 
        backgroundClip: 'text',
        backgroundImage: 'linear-gradient(to right, var(--dark-pink), var(--light-pink))',
        color: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundSize: '200% 100%',
      } 
    : {};

  if (staggered && type === 'heading') {
    return (
      <div className={className}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            style={gradient ? gradientStyle : {}}
            className="inline-block mr-1.5"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    );
  }
  
  return (
    <motion.div
      className={className}
      style={gradient ? gradientStyle : {}}
      variants={type === 'heading' ? headingVariants : paragraphVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {text}
    </motion.div>
  );
};

export default AnimatedText; 
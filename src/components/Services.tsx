import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import AnimatedText from './AnimatedText';
import AnimatedButton from './AnimatedButton';
import GlassCard from './GlassCard';

// Services data
const services = [
  {
    id: 1,
    title: "Lashes",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 8.5V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 7V7.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Enhance your natural beauty with classic, 2D, or 3D eyelash extensions that add volume and length to your lashes."
  },
  {
    id: 2,
    title: "Eyebrows",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Get perfectly shaped and defined eyebrows with threading, tinting, and microblading services tailored to your face shape."
  },
  {
    id: 3,
    title: "Makeup",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 9V7C2 4 4 2 7 2H17C20 2 22 4 22 7V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 15V17C2 20 4 22 7 22H17C20 22 22 20 22 17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 9.5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 14.5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Professional makeup services for special events, weddings, photoshoots, and everyday looks that enhance your natural features."
  }
];

// Animation for text link underline
const linkUnderlineVariants = {
  initial: { width: "0%" },
  hover: { 
    width: "100%", 
    transition: { duration: 0.3 }
  }
};

export default function Services() {
  return (
    <section id="services" className="container-section py-16 bg-light-pink/5 dark:bg-dark-pink/5">
      <div className="text-center mb-12">
        <AnimatedText 
          text="Services"
          gradient={true}
          className="text-3xl md:text-4xl font-bold mb-4"
        />
        
        <ScrollReveal delay={0.2}>
          <p className="max-w-2xl mx-auto text-lg">
            Professional beauty services specializing in lash extensions, eyebrow design, and makeup artistry.
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ScrollReveal key={service.id} delay={index * 0.15}>
            <GlassCard className="p-8">
              <div className="mb-4 text-dark-pink dark:text-light-pink">
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>
              </div>
              
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p>{service.description}</p>
              
              <motion.div
                className="mt-6 inline-block relative group"
                initial="initial"
                whileHover="hover"
              >
                <a 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center text-dark-pink dark:text-light-pink font-bold"
                >
                  Book Service
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-dark-pink dark:bg-light-pink"
                  variants={linkUnderlineVariants}
                />
              </motion.div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.4} className="mt-16 text-center">
        <AnimatedButton 
          text="View Pricing"
          onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          glowing={true}
          className="font-bold py-3 px-8"
        />
      </ScrollReveal>
    </section>
  );
} 
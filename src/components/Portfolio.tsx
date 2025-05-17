import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample portfolio items (in a real app, you would import actual images)
const portfolioItems = [
  {
    id: 1,
    title: "Bridal Makeup",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1532592441-e85633bf8be0?q=80&w=1000&auto=format&fit=crop",
    description: "Elegant and timeless bridal makeup for your special day."
  },
  {
    id: 2,
    title: "Bold Evening Look",
    category: "Evening",
    image: "https://images.unsplash.com/photo-1512257639414-c1c89abb7ecf?q=80&w=1000&auto=format&fit=crop",
    description: "Dramatic eyes and bold lips for a night out."
  },
  {
    id: 3,
    title: "Natural Glow",
    category: "Everyday",
    image: "https://images.unsplash.com/photo-1591487220420-f32a97fea5ee?q=80&w=1000&auto=format&fit=crop",
    description: "Light, natural makeup that enhances your features."
  },
  {
    id: 4,
    title: "Editorial Makeup",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1516195851888-6f1a981a862e?q=80&w=1000&auto=format&fit=crop",
    description: "Creative and avant-garde makeup for fashion shoots."
  },
  {
    id: 5,
    title: "Special Occasion",
    category: "Event",
    image: "https://images.unsplash.com/photo-1607362578904-c2bc1d14e2a5?q=80&w=1000&auto=format&fit=crop",
    description: "Glamorous makeup for special events and celebrations."
  }
];

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Handle carousel navigation
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolioItems.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + portfolioItems.length) % portfolioItems.length);
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!selectedImage) {
        nextSlide();
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [selectedImage]);

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
  };

  // Image zoom functionality
  const openZoomView = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeZoomView = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Carousel animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  };

  return (
    <section id="portfolio" className="container-section py-16 bg-white dark:bg-gray-900">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Portfolio
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-lg"
        >
          A showcase of my finest makeup creations and transformations.
        </motion.p>
      </div>

      {/* Carousel */}
      <div 
        className="relative overflow-hidden h-[500px] md:h-[600px] mx-auto max-w-4xl rounded-lg shadow-lg"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className="absolute w-full h-full"
          >
            <div 
              className="relative w-full h-full bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${portfolioItems[currentIndex].image})` }}
              onClick={() => openZoomView(portfolioItems[currentIndex].image)}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-6">
                <h3 className="text-xl md:text-2xl font-bold">{portfolioItems[currentIndex].title}</h3>
                <p className="text-sm md:text-base mt-2">{portfolioItems[currentIndex].description}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-light-pink text-gray-900 text-xs rounded-full font-bold">
                  {portfolioItems[currentIndex].category}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation buttons */}
        <button 
          onClick={prevSlide} 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shadow-lg z-10 hover:bg-white dark:hover:bg-gray-800"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shadow-lg z-10 hover:bg-white dark:hover:bg-gray-800"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2">
          {portfolioItems.map((_, index) => (
            <button 
              key={index}
              onClick={() => { 
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-light-pink scale-125' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Click to view message */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Click to zoom
        </div>
      </div>

      {/* Zoomed image modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={closeZoomView}
          >
            <motion.img
              src={selectedImage}
              alt="Zoomed portfolio work"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-h-[90vh] max-w-[90vw] object-contain pointer-events-none"
            />
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 w-10 h-10 rounded-full flex items-center justify-center"
              onClick={closeZoomView}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-rounded bg-dark-pink dark:bg-light-pink text-white dark:text-gray-900 font-bold py-3 px-8 shadow-lg inline-flex items-center"
        >
          View More Work
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
    </section>
  );
} 
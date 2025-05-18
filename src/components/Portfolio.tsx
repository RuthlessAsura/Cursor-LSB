import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Portfolio items using local images from the poze folder
const portfolioItems = [
  {
    id: 1,
    title: "2D Lashes",
    category: "Lashes",
    image: "/poze/2d-lashes.jpg",
    description: "Beautiful and natural 2D lash extensions."
  },
  {
    id: 2,
    title: "3D Lash Extensions",
    category: "Lashes",
    image: "/poze/3d-lashes.jpg",
    description: "Voluminous and dramatic 3D lash extensions."
  }
];

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 641);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simple navigation
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolioItems.length);
  };

  const prevSlide = () => {
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

  // Image zoom functionality
  const openZoomView = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeZoomView = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Navigation in zoom view
  const navigateZoomView = (direction: 'prev' | 'next', e: React.MouseEvent) => {
    e.stopPropagation();
    const currentImageIndex = portfolioItems.findIndex(item => item.image === selectedImage);
    
    if (direction === 'prev') {
      const prevIndex = (currentImageIndex - 1 + portfolioItems.length) % portfolioItems.length;
      setSelectedImage(portfolioItems[prevIndex].image);
    } else {
      const nextIndex = (currentImageIndex + 1) % portfolioItems.length;
      setSelectedImage(portfolioItems[nextIndex].image);
    }
  };

  return (
    <section id="portfolio" className="container-section py-16 bg-white dark:bg-gray-900">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text">Portfolio</h2>
        <p className="max-w-2xl mx-auto text-lg">
          A showcase of my finest makeup creations and transformations.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-4">
        {/* MOBILE VERSION - Basic Image Display */}
        {isMobile && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-medium">{currentIndex + 1} / {portfolioItems.length}</span>
              <button 
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg mb-4 relative" style={{height: "350px"}}>
              <img
                src={portfolioItems[currentIndex].image}
                alt={portfolioItems[currentIndex].title}
                className="w-full h-full object-cover"
                onClick={() => openZoomView(portfolioItems[currentIndex].image)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 backdrop-blur-sm">
                <h3 className="text-lg font-bold">{portfolioItems[currentIndex].title}</h3>
                <p className="text-sm mt-1">{portfolioItems[currentIndex].description}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-light-pink text-black text-xs rounded-full font-medium">
                  {portfolioItems[currentIndex].category}
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {portfolioItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-light-pink scale-110' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* DESKTOP VERSION - Animated Carousel */}
        {!isMobile && (
          <div className="flex items-center justify-center gap-2 md:gap-3">
            {/* Previous button */}
            <motion.button 
              onClick={prevSlide} 
              className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shadow-lg z-10 hover:bg-white dark:hover:bg-gray-800 ripple shrink-0"
              whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            {/* Main carousel container */}
            <motion.div 
              className="relative overflow-hidden h-[400px] md:h-[500px] lg:h-[600px] flex-1 rounded-lg shadow-lg glow-border bg-gray-100 dark:bg-gray-800 min-w-0 portfolio-carousel"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full h-full"
                >
                  <motion.div 
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => openZoomView(portfolioItems[currentIndex].image)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img 
                      src={portfolioItems[currentIndex].image}
                      alt={portfolioItems[currentIndex].title}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-6 backdrop-blur-sm">
                      <h3 className="text-xl md:text-2xl font-bold glow-text">{portfolioItems[currentIndex].title}</h3>
                      <p className="text-sm md:text-base mt-2">{portfolioItems[currentIndex].description}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-light-pink text-gray-900 text-xs rounded-full font-bold">
                        {portfolioItems[currentIndex].category}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Dots indicator */}
              <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 z-10">
                {portfolioItems.map((_, index) => (
                  <motion.button 
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                      index === currentIndex ? 'bg-light-pink scale-125' : 'bg-white/50'
                    }`}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.8 }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Click to view message */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center backdrop-blur-sm z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Click to zoom
              </div>
            </motion.div>
            
            {/* Next button */}
            <motion.button 
              onClick={nextSlide}
              className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shadow-lg z-10 hover:bg-white dark:hover:bg-gray-800 ripple shrink-0"
              whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        )}

        {/* View More Button */}
        <div className="mt-8 text-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-bold py-2 px-6 md:py-3 md:px-8 rounded-full bg-gradient-to-r from-light-pink to-pink-500 text-white shadow-lg hover:shadow-xl transition-all"
          >
            View More Work
          </motion.button>
        </div>
      </div>

      {/* Zoomed image modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeZoomView}
        >
          <img
            src={selectedImage}
            alt="Zoomed portfolio work"
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* Navigation buttons for desktop only */}
          <div className="hidden sm:flex absolute inset-x-0 top-1/2 transform -translate-y-1/2 justify-between px-4 md:px-8">
            <button 
              onClick={(e) => navigateZoomView('prev', e)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all"
              aria-label="Previous image"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={(e) => navigateZoomView('next', e)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all"
              aria-label="Next image"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Close button for desktop only */}
          <button
            onClick={closeZoomView}
            className="hidden sm:flex absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 hover:bg-black/70 text-white items-center justify-center backdrop-blur-sm transition-all"
            aria-label="Close zoom view"
          >
            <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Mobile instruction - only shown on small screens */}
          <div className="sm:hidden absolute bottom-4 left-0 right-0 text-center">
            <p className="text-white/70 text-xs">Tap anywhere to close</p>
          </div>
        </div>
      )}
    </section>
  );
} 
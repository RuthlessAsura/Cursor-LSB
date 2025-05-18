import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

// Navbar link underline animation variant
const linkUnderlineVariants = {
  initial: { width: "0%" },
  hover: { 
    width: "100%", 
    transition: { duration: 0.3 }
  }
};

export default function Layout({ children }: LayoutProps) {
  // Default to light mode
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Create a styled NavLink with animation
  const NavLink = ({ href, label }: { href: string, label: string }) => (
    <motion.div 
      className="relative"
      initial="initial"
      whileHover="hover"
    >
      <a 
        href={href} 
        className="font-bold hover:text-dark-pink transition-colors"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        {label}
      </a>
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-dark-pink dark:bg-light-pink"
        variants={linkUnderlineVariants}
      />
    </motion.div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <header className="fixed w-full top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur shadow-sm">
        <div className="container-section py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-dark-pink dark:text-light-pink">Lashes By Sarah</h1>
          <nav className="hidden md:flex gap-8">
            <NavLink href="#home" label="Home" />
            <NavLink href="#services" label="Services" />
            <NavLink href="#portfolio" label="Portfolio" />
            <NavLink href="#about" label="About" />
            <NavLink href="#contact" label="Contact" />
          </nav>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-light-pink dark:bg-dark-pink text-white"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <main className="pt-[72px]">
        {children}
      </main>

      <footer className="bg-light-pink/20 dark:bg-dark-pink/10">
        <div className="container-section py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Lashes By Sarah</h3>
              <p className="mb-4">Transforming faces, empowering beauty.</p>
              <div className="flex gap-4">
                <a href="#" className="text-dark-pink hover:text-dark-pink/80">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-dark-pink hover:text-dark-pink/80">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="text-dark-pink hover:text-dark-pink/80">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
              <ul>
                <li className="mb-2">Monday - Friday: 9am - 7pm</li>
                <li className="mb-2">Saturday: 10am - 6pm</li>
                <li className="mb-2">Sunday: Closed</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul>
                <li className="mb-2">Barlad, Romania</li>
                <li className="mb-2">New York, NY 10001</li>
                <li className="mb-2">Email: info@LashesBySarah.com</li>
                <li className="mb-2">Phone: (123) 456-7890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-light-pink dark:border-dark-pink mt-8 pt-6 text-center">
            <p>© {new Date().getFullYear()} Lashes By Sarah. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
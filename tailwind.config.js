/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-pink': '#FFD1DC',
        'dark-pink': '#FF90BC',
        'dark-bg': '#1A1A2E',
        'dark-surface': '#16213E',
        'dark-accent': '#E94560',
      },
      fontWeight: {
        'bold': 700,
      },
      borderRadius: {
        'rounded': '0.75rem',
      },
      animation: {
        'text-gradient': 'textGradient 3s ease infinite',
        'glow-pulse': 'glowPulse 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-in': 'slideIn 0.5s forwards',
        'fade-in': 'fadeIn 0.5s forwards',
        'spin-slow': 'spin 6s linear infinite',
      },
      keyframes: {
        textGradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px var(--glow-light)' },
          '50%': { boxShadow: '0 0 20px var(--glow-light), 0 0 25px var(--glow-dark)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideIn: {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      transitionProperty: {
        'width': 'width',
        'spacing': 'margin, padding',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(12px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} 
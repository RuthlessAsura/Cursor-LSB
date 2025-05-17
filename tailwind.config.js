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
      },
      fontWeight: {
        'bold': 700,
      },
      borderRadius: {
        'rounded': '0.75rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} 
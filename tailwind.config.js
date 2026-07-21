/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#1A5E5F',
          dark: '#123F40',
          light: '#2C7D7E',
        },
        gold: {
          DEFAULT: '#B8863B',
          light: '#D3A768',
          dark: '#8F6529',
        },
        cream: '#FAF8F4',
        ink: '#12100D',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Jost"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '.22em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
      },
    },
  },
  plugins: [],
}
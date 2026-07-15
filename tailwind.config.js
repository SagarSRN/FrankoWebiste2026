/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
  extend: {
    colors: { /* ...unchanged... */ },
    fontFamily: { /* ...unchanged... */ },
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
      marquee: 'marquee 22s linear infinite',
    },
  },
},
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // путь к твоим файлам
  ],
  theme: {
    extend: {
      keyframes: {
        spread: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      animation: {
        spread: 'spread 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};

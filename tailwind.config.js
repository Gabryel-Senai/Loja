/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f7',
          100: '#ffe4ef',
          200: '#ffc9dd',
          300: '#ff9ec4',
          400: '#ff63a5',
          500: '#ff2f87',
          600: '#eb146f',
          700: '#c50b59',
          800: '#a30d4c',
          900: '#871042'
        },
        dark: '#0f0b14'
      },
      boxShadow: {
        glow: '0 10px 30px rgba(255, 47, 135, 0.25)',
        soft: '0 10px 35px rgba(15, 11, 20, 0.10)'
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top, rgba(255,47,135,0.22), rgba(15,11,20,0.96) 45%)'
      }
    }
  },
  plugins: []
};

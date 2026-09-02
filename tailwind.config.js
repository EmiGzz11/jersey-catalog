/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#fcfaf6',
          100: '#f7f3e8',
          200: '#eee1cc',
          300: '#e2cba9',
          400: '#d4b181',
          500: '#C5A962', // Brand Gold
          600: '#b38a46',
          700: '#956b35',
          800: '#7d5731',
          900: '#65472a',
          950: '#3a2614',
        },
        slate: {
          50: '#f0f7f4',
          100: '#cce3db',
          200: '#99c7b5',
          300: '#5c9e85',
          400: '#337a5f',
          500: '#005035', // Brand Green
          600: '#00402a',
          700: '#003020',
          800: '#002015',
          900: '#0a140f', // Dark background
          950: '#050a07', // Very dark background
        },
        pitch: {
          950: '#060d0a',
          900: '#0a1712',
          800: '#112920',
          700: '#193f31',
          500: '#10b981',
          400: '#34d399',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(197, 169, 98, 0.3)',
        'glow-gold': '0 0 25px -5px rgba(197, 169, 98, 0.35)',
      }
    },
  },
  plugins: [],
}

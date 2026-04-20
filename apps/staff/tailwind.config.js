/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: '#F7F4EF',
        },
        teal: {
          900: '#0F1A16',
          800: '#1A2E25',
          700: '#0B6E4F',
        },
        gold: {
          500: '#C9973A',
        }
      },
      boxShadow: {
        'premium': '0 4px 24px rgba(11,110,79,0.08)',
      },
    },
  },
  plugins: [],
}

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F4EF",
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
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        dmsans: ['var(--font-dm-sans)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {  
    extend: {
      colors: {
        // transparent: 'transparent',
        // current: 'currentColor',
        primary: {
          50: '#edf9ff',
          100: '#d7f1ff',
          200: '#b9e8ff',
          300: '#88dbff',
          400: '#50c5ff',
          500: '#28a7ff',
          600: '#1e90ff',
          700: '#0a71eb',
        },
        secondary: {
          50: '#eefffc',
          100: '#c5fffa',
          200: '#8bfff5',
          300: '#4afef0',
          400: '#15ece2',
          500: '#00d0c9',
          600: '#00a8a5',
          700: '#008080',
        },
        stroke: '#DFE4EA',
        white:'#FFFFFF',
        dark: {
          50 : '#E5E7EB',
          100 : '#D1D5DB',
          200 : '#9CA3AF',
          300 : '#6B7280',
          400 : '#4B5563',
          500 : '#374151',
          600 : '#1F2A37',
          700 : '#111928',
        },
        gray: {
          50 : '#F9FAFB',
          100 : '#F3F4F6',
          200 : '#E5E7EB',
          300 : '#DEE2E6',
          400 : '#CED4DA',
          500 : '#CED4DA',
          600 : '#CED4DA'
        },
      },
      fontFamily: {
        main: ['Montserrat'],
      },
      backgroundImage: {
      },
    },
  },
  plugins: [],
};
export default config;

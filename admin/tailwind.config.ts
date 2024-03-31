import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {   colors: {
    transparent: 'transparent',
    current: 'currentColor',
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
    yellow: {
      100:'#FFFBEB',
      200:'#FEF3C7',
      300:'#FDE68A',
      400:'#FCD34D',
      500:'#FBBF24',
      600:'#F59E0B',
      700:'#D97706'
    },
    orange: {
      100: '#FFF0E9',
      200: '#FDE5D8',
      300: '#FBD5C0',
      400: '#F8B490',
      500: '#F59460',
      600: '#F27430',
      700: '#E1580E',

    },
    red: {
      50: '#FEF3F3',
      100: '#FEEBEB',
      200: '#FDD8D8',
      300: '#FBC0C0',
      400: '#F89090',
      500: '#F56060',
      600: '#F23030',
      700: '#E10E0E',
    },
    blue: {
      100: '#E1E8FF',
      200: '#C3CEF6',
      300: '#ADBCF2',
      400: '#8099EC',
      500: '#5475E5',
      600: '#2D68F8',
      700: '#1C3FB7',
    },
    green: {
      50: '#DAF8E6',
      100: '#C2F3D6',
      200: '#ACEFC8',
      300: '#82E6AC',
      400: '#57DE8F',
      500: '#2CD673',
      600: '#22AD5C',
      700: '#1A8245',
    },
  },
  fontFamily: {
    main: ['Montserrat'],
    sans: ['Graphik', 'sans-serif'],
    serif: ['Merriweather', 'serif'],
  },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

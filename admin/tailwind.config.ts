import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#1E90FF',
      secondary: '#008080',
      strok: '#DFE4EA',
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

      }
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

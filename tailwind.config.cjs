// tailwind.config.js (ESM version)
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';
import typography from '@tailwindcss/typography';
import filters from 'tailwindcss-filters';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        mint: {
          50:  '#E6F8F2',
          100: '#CCF1E4',
          200: '#A8E6CF',
          300: '#8ADABF',
          400: '#6BCCAC',
          500: '#4DBD98',
          600: '#42A682',
          700: '#37946B',
          800: '#2C7855',
          900: '#205A3F',
        },
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [forms, aspectRatio, typography, filters],
};
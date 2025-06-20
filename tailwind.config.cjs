/* --------------------------------------------------------------------------
 *  Tailwind CSS configuration – Common-JS version
 *  (keeps all your existing colour + plugin settings)
 * -------------------------------------------------------------------------*/

const forms        = require('@tailwindcss/forms');
const aspectRatio  = require('@tailwindcss/aspect-ratio');
const typography   = require('@tailwindcss/typography');
const filters      = require('tailwindcss-filters');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],

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

      fontFamily: {
        // keep existing Inter + default stack
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },

      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.08)',
      },

      backdropBlur: {
        xs: '2px',
      },
    },
  },

  plugins: [
    forms,
    aspectRatio,
    typography,
    filters,
  ],
};
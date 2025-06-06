module.exports = {
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
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-filters'),
  ],
}

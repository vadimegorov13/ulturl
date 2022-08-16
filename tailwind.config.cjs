/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    colors: {
      primary: colors.rose,
      secondary: colors.cyan,
      rose: colors.rose,
      gray: colors.stone,
      white: colors.white,
      transparent: 'transparent',
      current: 'current',
    },
    extend: {},
  },
  plugins: [],
};

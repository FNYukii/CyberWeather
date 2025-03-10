/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './public/*.html'],
  theme: {
    extend: {
      backgroundImage: {
        'cyber-wallpaper': "url('../images/cyber.png')",
      },
      colors: {
        primary: '#A6DDFC',
      },
    },
  },
  plugins: [],
}

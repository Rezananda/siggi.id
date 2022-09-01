/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['ui-monospace', 'SFMono-Regular']
      },
      colors: {
        'siggi-soft': '#FFF6E7',
        'siggi-hard': '#9A6F2B'
      },
    },
  },
  plugins: [],
}
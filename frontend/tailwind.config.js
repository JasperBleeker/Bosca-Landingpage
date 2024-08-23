/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        moss: '#23291C',
        shamrock: '#737F65',
        seafoam: '#98BAB2',
        sand: '#D7B298',
        white: '#FFFFFF',
      },
      fontFamily: {
        'heading-1': ['Zenon', 'serif'],
        'heading-2': ['Zenon', 'serif'],
        'heading-3': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}

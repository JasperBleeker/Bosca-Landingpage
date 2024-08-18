export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '@/assets/main.css',
    '@/assets/fonts.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  $meta: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet', rel: 'stylesheet' },
    ]
  },

  runtimeConfig: {
    strapiApiKey: process.env.STRAPI_API_KEY, // Only accessible on the server-side
    public: {
      strapiBaseURL: process.env.STRAPI_BASE_URL || 'http://localhost:1337/api', // Accessible on both server and client
    },
  },
  modules: [],
})

console.log('nuxt.config STRAPI_API_KEY:', process.env.STRAPI_API_KEY)
console.log('nuxt.config STRAPI_BASE_URL:', process.env.STRAPI_BASE_URL)
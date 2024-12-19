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
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
      },
      
    ]
  },
  app: {
    head: {
      title: 'Bosca Brog',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    },
  },

  runtimeConfig: {
    strapiApiKey: process.env.STRAPI_API_KEY,
    public: {
      strapiBaseURL: process.env.STRAPI_BASE_URL || 'https://your-production-backend-url/api',
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
  
  modules: [],
});

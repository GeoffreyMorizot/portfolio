export default {

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  publicRuntimeConfig: {
    http: {
      imageURL: process.env.API_URL === 'http://localhost:1337' ? 'http://localhost:1337' : '' 
    },
  },
  generate: {
    devtools: true,
    fallback: true
  },
  router: {
    linkPrefetchedClass: 'lien-de-nuxt-prefetched'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'PortfolioFront',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Portfolio de Geoffrey Morizot'
      },
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500&display=swap'
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv'
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/apollo',
  ],
  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: '@/apollo/client-configs/default.js' // This is where you'll set up the client and import the possible fragment types
    }
  },
  styleResources: {
    // your settings here
    scss: [
      '~/assets/css/main.scss',
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {} // blah blah
  },

  server: {
    host: "0.0.0.0"
  },

}

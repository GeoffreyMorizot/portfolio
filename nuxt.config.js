export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  publicRuntimeConfig: {
    http: {
      imageURL:
        process.env.API_URL === 'http://localhost:1337'
          ? 'http://localhost:1337'
          : '',
    },
  },
  generate: {
    devtools: true,
    fallback: true,
  },
  router: {
    linkPrefetchedClass: 'lien-de-nuxt-prefetched',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Geoffrey Morizot | Développeur web',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Geoffrey Morizot développeur web à Bordeaux.',
      },
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'https://www.geoffreymorizot.com/',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Geoffrey Morizot | Développeur web',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'Geoffrey Morizot développeur web à Bordeaux.',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: '/logo.png',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:type',
        name: 'twitter:type',
        content: 'website',
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://www.geoffreymorizot.com/',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Geoffrey Morizot | Développeur web',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Geoffrey Morizot développeur web à Bordeaux.',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: '/logo.png',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {
      src: '~/assets/css/main.scss',
      lang: 'scss',
    },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~plugins/plugins.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources', '@nuxtjs/dotenv'],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/apollo', '@nuxtjs/markdownit'],
  markdownit: {
    runtime: true, // Support `$md()`
  },
  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: '@/apollo/client-configs/default.js', // This is where you'll set up the client and import the possible fragment types
    },
    errorHandler: '~/plugins/apollo-error-handler.js',
  },
  styleResources: {
    // your settings here
    scss: ['~/assets/css/includes.scss'],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['gsap'],
  },

  server: {
    host: '0.0.0.0',
  },
}

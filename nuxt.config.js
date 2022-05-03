export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cryptoBots',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/directives.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/apollo'
  ],

  axios: {
    baseUrl: process.env.BEM_API_URL,
    // headers: {
    //   common: {
    //     "X-MBX-APIKEY": process.env.BEM_API_KEY
    //   }
    // }
  },
  // apollo: {
  //   clientConfigs: {
  //     default: '~/apollo/client-configs/default.js'
  //   }
  // },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://crypto-bots-back.herokuapp.com/graphql'
      }
    }
  },
  publicRuntimeConfig: {
    // need to double check the security here
    secretKey: process.env.BINANCE_SECRET_KEY
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

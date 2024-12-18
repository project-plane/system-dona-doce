export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'system-dona-doce',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/styles/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~plugins/v-calendar.js',
      ssr: false
    },
    {
      src: '~plugins/v-mask.js',
      ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{ path: '@/components', pathPrefix: false }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    'vue-toastification/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    // '@nuxtjs/dayjs'
  ],
  // dayjs: {
  //   // Opções do Day.js
  //   // Veja a documentação do Day.js para as opções disponíveis: https://day.js.org/docs/en/parse/string-format
  //   locales: ['pt-br'], // Se você quiser usar localização em português, por exemplo
  //   defaultLocale: 'pt-br',
  // },
  styleResources: {
    // your settings hereJ
    scss: ['@/components/bosons/*.scss']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },
  ssr: false,
  server: {
    post: 3000,
    host: 'localhost'
  },
  mode: 'universal',

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false, // Desativa a análise do pacote para a produção
    extractCSS: true, // Extraia o CSS em arquivos separados
    // ...
  },

  render: {
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // Cache estático por uma semana
    },
  },
  target: 'server'
}

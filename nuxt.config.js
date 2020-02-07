import { fetchAllRoutes } from './plugins/router'

require('dotenv').config();
const { APP_URL, MICROCMS_BASE_URL, MICROCMS_X_API_KEY, MICROCMS_ENTRYPOINTS } = process.env

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'ja'
    },
    titleTemplate: '%s | ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: process.env.npm_package_name || ''
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: process.env.APP_URL || '' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: process.env.npm_package_name || ''
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: process.env.npm_package_description || ''
      }
    ],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@/modules/hook'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  generate: {
    fallback: true,
    subFolders: false,
    routes() {
      return fetchAllRoutes().then((routes) => {
        return routes
      })
    }
  },
  env: {
    APP_URL: APP_URL,
    MICROCMS_BASE_URL: MICROCMS_BASE_URL,
    MICROCMS_X_API_KEY: MICROCMS_X_API_KEY,
    MICROCMS_ENTRYPOINTS: MICROCMS_ENTRYPOINTS,
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN
  },
  styleResources: {
    scss: [
     '~/assets/scss/colors.scss',
     ]
   }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    //pageTransition: { name: 'page', mode: 'out-in' },
    //baseURL: process.env.NODE_ENV === 'production' ? '/zaiye_web/' : '/',
    //baseURL: process.env.NODE_ENV === 'production' ? '/' : '/',
    buildAssetsDir: '/static/',
    head: {
      htmlAttrs: {
        lang: 'zh-Hant'
      },
      script: [],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '../images/logo/DZGZ_logo.png' }
      ]      
    }    
  },

  // routeRules: {
  //   "/api/**": { proxy: 'https://isnmk.com/api/**' },
  // }, 

  devtools: { enabled: true },
  
  vue: {
    compilerOptions: {
      delimiters: ['${', '}'],
      whitespace: 'preserve'
    }
  },


  //  css 匯入 css 樣式表
  css: [
    '@/assets/scss/app.scss'
  ],

  // [ Components ]
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // 宣告啟用的模組
  modules: [
    '@nuxt/image', 
    '@nuxtjs/device',
    'nuxt-bootstrap-icons',
  ],
})

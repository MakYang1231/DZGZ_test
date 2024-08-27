// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  ssr: true,  // 启用服务器端渲染 (SSR)
  target: 'static',  // 目标是静态生成
  nitro: {
    preset: 'node-server',  // 使用 Node.js 服务器预设，保留 API 和其他服务
  },
  // 如果你有 API 路由或其他自定义的服务器中间件
  server: {
    host: '0.0.0.0',  // 监听所有 IP 地址
    //port: 3000,  // 指定端口
  },
  generate: {
    fallback: '404.html'  // 生成静态文件时的 404 页面
  },
  
  app: {
    //pageTransition: { name: 'page', mode: 'out-in' },
    baseURL: process.env.NODE_ENV === 'production' ? '/DZGZ_web/' : '/DZGZ_web/',
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
    'nuxt-swiper',
  ],
})

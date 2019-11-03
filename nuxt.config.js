export default {
  mode: 'spa',
  modules: [
    '@nuxt/typescript-build',
    '@nuxtjs/bulma'
  ],
  plugins: ['~/plugins/composition-api', '~/plugins/firebase'],
  build: {
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

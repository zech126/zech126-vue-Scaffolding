const confEnv = process.env.VUE_APP_ENV
const isProd = confEnv === 'prod'
const isServer = process.env.VUE_APP_CLIENT === 'server'

// 应用部署路径，默认 '/' 为部署到域名根目录，如： https://www.my-app.com/ 。
// 如果需要部署到子路径，如： https://www.foobar.com/my-app/ ，
// 则将该值配置为 '/my-app/' 。
// 如果需要在不同的部署环境部署不同的路径，可使用 confEnv 环境变量辅助判断。
const publicPath = isServer ? './' : '/'

// 用于判断部署于正式环境不生成 sourceMap
const useSourceMap = !isServer || !isProd

// 部署到服务器场景下，是否对构建文件进行打包，支持 'tar' , 'zip' , ['tar', 'zip'] 。
const archiveFormat = false

module.exports = {
  publicPath,

  outputDir: `dist/${confEnv}`,

  assetsDir: 'static',

  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      const appConfig = require('./src/app.config')
      args[0].title = appConfig.title
      args[0].description = appConfig.description
      return args
    })
    config.module.rule('js').exclude.add(/public/)
    config.module
      .rule('js')
      .use('babel-loader')
      .loader('babel-loader')
      .tap(() => ({
        plugins: ['lodash']
      }))
  },

  configureWebpack: (config) => {
    // 关闭 webpack 性能警告
    config.performance = {
      hints: false
    }

    // 若要开启 CDN （棒谷静态文件服务器上文件）则开启下方的代码，
    // 如果只需要在部署正式环境时使用可增加判断 if (isProd && isServer)
    const WebpackCdnPlugin = require('./webpack-cdn-plugin')
    config.plugins.push(
      new WebpackCdnPlugin({
        modules: [
          {
            name: 'vue',
            var: 'Vue',
            path: isProd ? 'dist/vue.runtime.min.js' : 'dist/vue.runtime.js'
          },
          {
            name: 'vue-router',
            var: 'VueRouter',
            path: 'dist/vue-router.min.js'
          },
          {
            name: 'vuex',
            var: 'Vuex',
            path: 'dist/vuex.min.js'
          },
          {
            name: 'element-ui',
            var: 'ELEMENT',
            path: 'lib/index.js',
            style: 'lib/theme-chalk/index.css'
          }
        ],
        prodUrl: '//content.banggood.cn/Content/lib/:name@:version/:path'
      })
    )

    const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
    config.plugins.push(
      new LodashModuleReplacementPlugin({
        collections: true,
        shorthands: true
      })
    )

    // API 路径配置
    const webpack = require('webpack')
    // 将配置放于本文件获取，再通过环境变量引入，
    // 以避免其他非当前运行环境的配置地址被暴露于最终打包文件中
    const apiConfig = require('./config/api.config')
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.API_BASE_URL_CONFIG': JSON.stringify(apiConfig)
      })
    )

    if (isServer) {
      // GZIP
      const CompressionWebpackPlugin = require('compression-webpack-plugin')
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(js|css)$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }

    if (isServer && !!archiveFormat) {
      // TAR/ZIP archive
      const path = require('path')
      const ArchivePlugin = require('@laomao800/webpack-archive-plugin')
      config.plugins.push(
        new ArchivePlugin({
          output: path.resolve(__dirname, `./dist-archive/${confEnv}`),
          format: archiveFormat,
          filename: 'archive',
          pathPrefix: publicPath.replace(/^\/|\/$/g, '')
        })
      )
    }
  },

  productionSourceMap: useSourceMap,

  css: {
    sourceMap: useSourceMap
  },

  devServer: {
    disableHostCheck: true,
    before: require('./tests/mock-api'),
    // https://cli.vuejs.org/zh/config/#devserver-proxy
    proxy: null // string | Object
  }
}

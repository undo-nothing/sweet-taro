'use strict'
const path = require('path')


var baseUrl = process.env.VUE_APP_API_HOST
if (process.env.VUE_APP_API_PORT) {
  baseUrl = baseUrl + ':' + process.env.VUE_APP_API_PORT
}


function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'sweet-taro',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  devServer: {
      proxy: {
          '/media/': {
            target: baseUrl,
            // 允许跨域
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '/media/': '/media/'
            }
          },
          '/v1.0/': {
            target: baseUrl,
            // 允许跨域
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '/v1.0/': '/v1.0/'
            }
          }
      }
  }
}

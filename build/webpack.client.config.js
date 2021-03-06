const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HTMLPlugin = require('html-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const config = require('../config')

const webpackConfig = merge(base, {
  plugins: [
    // 全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"',
      // 配置接口地址之类
      'process.env': process.env.NODE_ENV === 'production' ? config.build.env : config.dev.env
    }),
    // 提取公共库
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // html模板
    new HTMLPlugin({
      template: 'src/index.html'
    // }),
    // new webpack.ProvidePlugin({
    //   $: 'zepto',
    //   Zepto: 'zepto'
    })
  ]
})

if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(
    // 生产环境下 - 压缩js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // 用于使用service worker来缓存外部项目依赖项。
    new SWPrecachePlugin({
      cacheId: 'vue-hn',
      filename: 'service-worker.js',
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
    })
  )
}

module.exports = webpackConfig

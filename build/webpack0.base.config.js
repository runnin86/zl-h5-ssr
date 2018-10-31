const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './src/entry-client.js',
    vendor: [
      'vue',
      'vue-router',
      'vuex'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  externals: {
    'weui': 'weui',
    // 'zepto': 'Zepto',
    'BMap': 'BMap',
    'wx': 'jWeixin'
  },
  // 提示文件体积大于150kb
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
    maxAssetSize: 150000
  },
  // 配置模块resolve的规则
  resolve: {
    // 自动resolve的扩展名
    extensions: ['.js', '.vue', '.json'],
    // resolve模块的时候要搜索的文件夹
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules')
    ],
    /*
     * 创建路径别名，有了别名之后引用模块更方便，
     * 例如import Vue from 'vue/dist/vue.esm.js'可以写成 import Vue from 'vue'
     */
    alias: {
      'public': path.resolve(__dirname, '../public'),
      '@': path.resolve(__dirname, '../src'),
      'vue$': 'vue/dist/vue.esm.js',
      'static':  path.resolve(__dirname, '../static'),
      'assets':  path.resolve(__dirname, '../src/assets'),
      'components':  path.resolve(__dirname, '../src/components'),
      'zepto': path.resolve(__dirname, '../static/js/zepto.min.js')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        // 对src和test文件夹下的.js和.vue文件使用eslint-loader
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
          postcss: [
            require('autoprefixer')({
              browsers: ['last 3 versions']
            })
          ]
        }
      },
      {
        // 对src和test文件夹下的.js文件使用babel-loader
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: function(path) {
          // 路径中含有 node_modules 的就不去解析。
          var isNpmModule = !!path.match(/node_modules/)
          return isNpmModule
        },
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../test')]
      },
      // {
      //   test: /\.js$/,
      //   loader: 'buble-loader',
      //   exclude: /node_modules/,
      //   options: {
      //     objectAssign: 'Object.assign'
      //   }
      // },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      // 解决zepto等未模块化的问题
      {
        test: path.resolve(__dirname, '../static/js/zepto.min.js'),
        loader: 'exports-loader?window.$!script-loader'
      }
    ]
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: path.resolve(__dirname, '../static/js/zepto.min.js'),
      Zepto: path.resolve(__dirname, '../static/js/zepto.min.js'),
      "window.Zepto": path.resolve(__dirname, '../static/js/zepto.min.js')
    })
  ]
}

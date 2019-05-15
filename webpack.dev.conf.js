'use strict'
require('dotenv').config();
const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const devWebpackConfig = {
  context: path.resolve(__dirname, './'),
  entry: {
    app: './src/main.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:[
          'vue-style-loader',
          {
            loader:'css-loader',
            options:{}
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options:  {
          loaders: {
            css: ['vue-style-loader'].concat([ {
              loader: 'css-loader',
              options: {}
            }])
          },
          transformToRequire: {
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    host: process.env.HOST,
    port: 5000,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('./config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './static'),
      to: 'static',
      ignore: ['.*']
    }])
  ]
}

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});

'use strict'
const utils = require('./utils')

module.exports = {
  loaders: utils.cssLoaders(),
  transformToRequire: {
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}

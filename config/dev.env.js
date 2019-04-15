'use strict'
const merge = require('webpack-merge')
// const prodEnv = require('./prod.env')
let localEnv = {}

try {
    // store your local env vars local.env.js file if needed
    localEnv = require('./local.env')
} catch(e) {
    localEnv = {}
}

module.exports = merge(localEnv, {
  NODE_ENV: '"development"',
  GOOGLE_API_KEY: `"${process.env.GOOGLE_API_KEY}"`,
  COSMIC_BUCKET: `"${process.env.COSMIC_BUCKET}"`,
  COSMIC_READ_KEY: `"${process.env.COSMIC_READ_KEY}"`,
  COSMIC_WRITE_KEY: `"${process.env.COSMIC_WRITE_KEY}"`,
  PORT: `"${process.env.PORT}"`
})

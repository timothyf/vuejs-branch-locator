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
  PORT: `"${process.env.PORT}"`,
  //BRANCHES_API_BASE_URL: `"http://localhost:5000"`,
  BRANCHES_API_BASE_URL: `"http://unionbankdev.prod.acquia-sites.com/rest/branch-locator?"`,
  DIRECTIONS_BASE_URL: `"https://www.google.com/maps/dir/?api=1"`,
  DEFAULT_MAP_ICON: `"https://s3.amazonaws.com/vuejsbranchlocator/Location_Pin-Dark.svg"`,
  SELECTED_MAP_ICON: `"https://s3.amazonaws.com/vuejsbranchlocator/Location_Pin-Red.svg"`
})

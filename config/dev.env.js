'use strict'

module.exports = {
  GOOGLE_API_KEY: `"${process.env.GOOGLE_API_KEY}"`,
  PORT: `"${process.env.PORT}"`,
  BRANCHES_API_BASE_URL: `"http://unionbank.prod.acquia-sites.com/rest/branch-locator?"`,
  DIRECTIONS_BASE_URL: `"https://www.google.com/maps/dir/?api=1"`,
  DEFAULT_MAP_ICON: `"https://s3.amazonaws.com/vuejsbranchlocator/Location_Pin-Dark.svg"`,
  SELECTED_MAP_ICON: `"https://s3.amazonaws.com/vuejsbranchlocator/Location_Pin-Red.svg"`,
  SEARCHED_POSITION_ICON: `"https://s3.amazonaws.com/vuejsbranchlocator/rectangle.svg"`
}

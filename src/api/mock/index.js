import cities from './data/cities'
import mapImages from './data/mapImages'
import storeCardImages from './data/storeCardImages'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchCities () {
    return fetch(cities, 1000) // wait 1s before returning posts
  },
  fetchMapImages() {
    return fetch(mapImages, 1000) // wait 1s before returning posts
  },
  fetchStoreCardImages() {
    return fetch(storeCardImages, 1000) // wait 1s before returning posts
  }
}

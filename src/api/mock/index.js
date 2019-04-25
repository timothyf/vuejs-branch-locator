import cities from './data/cities'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchCities () {
    return fetch(cities, 200) // wait 500ms before returning posts
  }
}

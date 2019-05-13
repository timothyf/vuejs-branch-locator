import Vue from 'vue'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  // field_geocoordinates_proximity-lat=47.260861&field_geocoordinates_proximity-lng=-122.443224&field_geocoordinates_proximity=50
  fetchData(location, searchRadius) {
    let latParam = "field_geocoordinates_proximity-lat=" + location.lat;
    let lngParam = "&field_geocoordinates_proximity-lng=" + location.lng;
    let radiusParam = "&field_geocoordinates_proximity=" + searchRadius;
    return new Promise(function(resolve, reject) {
      Vue.http.get(process.env.BRANCHES_API_BASE_URL + latParam + lngParam + radiusParam)
      //Vue.http.get(process.env.BRANCHES_API_BASE_URL + '/static/data/' + location + '.json')
          .then(function(response) {
            resolve(response.json());
          });
    });
  }
}

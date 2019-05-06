import Vue from 'vue'


const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchBranches(location) {
    // const branchesLocation = "branches-" + 'orlando';
    // import branches from './data/' + branchesLocation;
    return new Promise(function(resolve, reject) {
      Vue.http.get('../../static/data/' + location + '.json')
          .then(function(response) {
            resolve(response.json());
          });
    })
  }
}

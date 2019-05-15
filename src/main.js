import Vue from 'vue'
import VueGoogleMaps from 'vue-googlemaps'
import App from './App'
import store from './store'

Vue.use(VueGoogleMaps, {
  load: {
    apiKey: process.env.GOOGLE_API_KEY,
    libraries: ['places'],
    useBetaRenderer: false
  }
})

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})

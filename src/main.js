// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueGoogleMaps from 'vue-googlemaps'
import 'vue-googlemaps/dist/vue-googlemaps.css'
import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuetify)

Vue.use(VueGoogleMaps, {
    load: {
        apiKey: process.env.GOOGLE_API_KEY,
        libraries: ['places'],
        useBetaRenderer: false
    }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    created () {
        this.$store.dispatch('fetchCities')
    }
})

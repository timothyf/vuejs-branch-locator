import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import client from '../api/mock'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
    state: {
        userLocation: {},
        selectedLocation: {},
        selectedStore: null,
        availableLocations: {},
        stores: [],
        storeCardImages: [],
        mapIcons: {
          "defaultIcon":"https://s3.amazonaws.com/vuejsbranchlocator/BlackShoppingBag.svg",
          "selectedIcon":"https://s3.amazonaws.com/vuejsbranchlocator/BlueShoppingBag.svg"
        },
        storesDataUrl: '../../static/data/'
    },
    getters: {
        userLocation (state) {
            return state.userLocation
        },
        selectedLocation (state) {
            return state.selectedLocation
        },
        selectedStore (state) {
            return state.selectedStore
        },
        availableLocations (state) {
            return state.availableLocations
        },
        availableLocationsShort (state) {
            const data = []
            for (let stateKey in state.availableLocations) {
                for (let cityKey in state.availableLocations[stateKey]) {
                    data.push(state.availableLocations[stateKey][cityKey].city + ', ' + stateKey)
                }
            }
            return data
        },
        stores (state) {
            return state.stores
        },
        getStoreById (state, getters) {
            return (Id) => {
                return state.stores.find(item => {
                    return item.id === Id
                })
            }
        },
        storeCardImages (state) {
            return state.storeCardImages
        },
        mapIcons (state) {
            return state.mapIcons
        }
    },
    mutations: {
        SET_USER_LOCATION (state, location) {
            state.userLocation = location
        },
        SET_SELECTED_LOCATION (state, location) {
            state.selectedLocation = location
        },
        SET_STORES (state, stores) {
            state.stores = stores
        },
        SET_SELECTED_STORE (state, store) {
            state.selectedStore = store
        },
        SET_AVAILABLE_LOCATIONS (state, locations) {
            state.availableLocations = locations
        },
        SET_STORE_CARD_IMAGES (state, images) {
            state.storeCardImages = images
        },
        SET_MAP_ICONS (state, icons) {
            state.mapIcons = icons
        }
    },
    actions: {
        updateUserLocation ({commit}, payload) {
            // TODO: need to add function to detect user location using google maps location ws
            commit('SET_USER_LOCATION', payload)
        },
        updateSelectedStore ({commit}, payload) {
            commit('SET_SELECTED_STORE', payload)
        },
        updateSelectedLocation ({commit, state}, payload) {
            // payload: location object {state: 'FL', city: 'Orlando', postalCode: '32821'}
            if (payload.state in state.availableLocations && payload.city in state.availableLocations[payload.state]) {
                const location = state.availableLocations[payload.state][payload.city]
                commit('SET_SELECTED_LOCATION', location)
                // need to fetch the corresponding stores
                // read stores data from local json file
                Vue.http.get(state.storesDataUrl + location.dataUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data) {
                            const stores = data
                            commit('SET_STORES', stores)
                        }
                    })
            }
            else {
                commit('SET_STORES', [])
                // TODO: need to show an error message that no result is found
            }
        },
        fetchCities ({commit, dispatch, state}) {
          return client
            .fetchCities()
                .then(data => {
                    commit('SET_AVAILABLE_LOCATIONS', data)
                    // set the initial default location
                    dispatch('updateSelectedLocation', {state: 'FL', city: 'ORLANDO', postalCode: '32821'})
                })

        },
        fetchStoreCardImages ({commit}) {
          return client
            .fetchStoreCardImages()
                .then(data => {
                    commit('SET_STORE_CARD_IMAGES', data.media)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})

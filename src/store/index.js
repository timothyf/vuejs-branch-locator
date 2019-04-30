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
        selectedBranch: null,
        availableLocations: {},
        branches: [],
        mapIcons: {
          "defaultIcon":"https://s3.amazonaws.com/vuejsbranchlocator/Location_Pin-Dark.svg",
          "selectedIcon":"https://s3.amazonaws.com/vuejsbranchlocator/Location_Pin-Red.svg"
        },
        branchesDataUrl: '../../static/data/'
    },
    getters: {
        userLocation (state) {
            return state.userLocation
        },
        selectedLocation (state) {
            return state.selectedLocation
        },
        selectedBranch (state) {
            return state.selectedBranch
        },
        availableLocations (state) {
            return state.availableLocations
        },
        availableLocationsShort (state) {
          const data = [];
          for (let stateKey in state.availableLocations) {
              for (let cityKey in state.availableLocations[stateKey]) {
                var location = {};
                location.value = state.availableLocations[stateKey][cityKey].city + ', ' + stateKey;
                data.push(location.value);
              }
          }
          return data
        },
        branches (state) {
            return state.branches
        },
        getBranchById (state, getters) {
            return (Id) => {
                return state.branches.find(item => {
                    return item.id === Id;
                })
            }
        },
        mapIcons (state) {
            return state.mapIcons;
        }
    },
    mutations: {
        SET_USER_LOCATION (state, location) {
            state.userLocation = location;
        },
        SET_SELECTED_LOCATION (state, location) {
            state.selectedLocation = location;
        },
        SET_BRANCHES (state, branches) {
            state.branches = branches;
        },
        SET_SELECTED_BRANCH (state, branch) {
            state.selectedBranch = branch
        },
        SET_AVAILABLE_LOCATIONS (state, locations) {
          state.availableLocations = locations
        }
    },
    actions: {
        updateUserLocation ({commit}, payload) {
            // TODO: need to add function to detect user location using google maps location ws
            commit('SET_USER_LOCATION', payload)
        },
        onBranchClick({commit, dispatch, state}, branchId) {
          dispatch('updateSelectedBranch', branchId);
        },
        updateSelectedBranch({commit}, payload) {
            commit('SET_SELECTED_BRANCH', payload)
        },
        updateSelectedLocation({commit, state}, payload) {
            // payload: location object {state: 'FL', city: 'Orlando', postalCode: '32821'}
            if (payload.state in state.availableLocations && payload.city in state.availableLocations[payload.state]) {
              const location = state.availableLocations[payload.state][payload.city]
              commit('SET_SELECTED_LOCATION', location)
              // fetch the corresponding branches
              // read branches data from local json file
              Vue.http.get(state.branchesDataUrl + location.dataUrl)
                  .then(response => response.json())
                  .then(data => {
                      if (data) {
                        const branches = data;
                        commit('SET_BRANCHES', branches);
                      }
                  })
            }
            else {
              commit('SET_BRANCHES', [])
            }
        },
        fetchCities({commit, dispatch, state}) {
          return client
            .fetchCities()
                .then(data => {
                    commit('SET_AVAILABLE_LOCATIONS', data)
                    dispatch('updateSelectedLocation', {state: 'FL', city: 'ORLANDO', postalCode: '32821'})
                })

        }
    }
})

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
        setSelectedLocation({commit, state}, payload) {
          commit('SET_SELECTED_LOCATION', payload);
        },
        fetchBranches({commit, dispatch, state}, payload) {
          var location = payload;
          return client.fetchBranches(location)
                .then(data => {
                  if (data) {
                    const branches = data;
                    commit('SET_BRANCHES', branches);
                  }
                });
        }
    }
})

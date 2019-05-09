import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import client from '../api/mock'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
    state: {
        selectedLocation: {},
        selectedBranch: null,
        branches: []
    },
    getters: {
        selectedLocation (state) {
            return state.selectedLocation
        },
        selectedBranch (state) {
            return state.selectedBranch
        },
        branches (state) {
            return state.branches
        },
        getBranchById (state, getters) {
            return (Id) => {
                return state.branches.find(item => {
                    return item.branchInfo.branchId === Id;
                })
            }
        }
    },
    mutations: {
        SET_SELECTED_LOCATION (state, location) {
            state.selectedLocation = location;
        },
        SET_BRANCHES (state, branches) {
            state.branches = branches;
        },
        SET_SELECTED_BRANCH (state, branch) {
            state.selectedBranch = branch
        }
    },
    actions: {
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
          let location = payload.location;
          let searchRadius = payload.searchRadius;
          return client.fetchBranches(location, searchRadius)
                .then(data => {
                  if (data) {
                    if (data[0].branchLocations) {
                      const branches = data[0].branchLocations;
                      for (var branch of branches) {
                        branch.services = {};
                        let branchServices = branch.branchInfo.branchServices;
                        for (var service of branchServices) {
                          if (service.serviceId == 1) {
                            // not sure what this serviceId is
                          }
                          if (service.serviceId == 2 || service.serviceId == 3) {
                            branch.services.atm = true;
                          }
                          else if (service.serviceId == 4) {
                            // not sure what this serviceId is
                          }
                          else if (service.serviceId == 5) {
                            // not sure what this serviceId is
                          }
                          else if (service.serviceId == 6) {
                            branch.services.nightDrop = true;
                          }
                          else if (service.serviceId == 7) {
                            branch.services.safeDeposit = true;
                          }
                          else if (service.serviceId == 8) {
                            branch.services.currency = true;
                          }
                          console.log(service.searchLabel);
                        }
                      }
                      commit('SET_BRANCHES', branches);
                      dispatch('setSelectedLocation', location);
                    }
                  }
                });
        }
    }
})

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
          var location = payload;
          return client.fetchBranches(location)
                .then(data => {
                  if (data) {
                    const branches = data[0].branchLocations;
                    commit('SET_BRANCHES', branches);
                  }
                });
        }
    }
})

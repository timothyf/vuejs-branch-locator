import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import client from '../api/mock'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
    state: {
        searchType: 'Branch',
        selectedLocation: {},
        selectedBranch: null,
        selectedPerson: null,
        branches: [],
        mortgageConsultants: [],
        relationshipManagers: [],
        privateBankers: []
    },
    getters: {
        searchType (state) {
          return state.searchType
        },
        selectedLocation (state) {
            return state.selectedLocation
        },
        selectedBranch (state) {
            return state.selectedBranch
        },
        selectedPerson (state) {
            return state.selectedPerson
        },
        branches (state) {
            return state.branches
        },
        mortgageConsultants (state) {
            return state.mortgageConsultants
        },
        relationshipManagers (state) {
            return state.relationshipManagers
        },
        privateBankers (state) {
            return state.privateBankers
        }
    },
    mutations: {
        SET_SEARCH_TYPE (state, searchType) {
          state.searchType = searchType;
        },
        SET_SELECTED_LOCATION (state, location) {
            state.selectedLocation = location;
        },
        SET_SELECTED_PERSON (state, person) {
            state.selectedPerson = person;
        },
        SET_BRANCHES (state, branches) {
            state.branches = branches;
        },
        SET_SELECTED_BRANCH (state, branch) {
            state.selectedBranch = branch;
        },
        ADD_MORTGAGE_CONSULTANT (state, mortgageConsultant) {
          state.mortgageConsultants.push(mortgageConsultant);
        },
        ADD_RELATIONSHIP_MANAGER (state, relationshipManager) {
          state.relationshipManagers.push(relationshipManager);
        },
        ADD_PRIVATE_BANKER (state, privateBanker) {
          state.privateBankers.push(privateBanker);
        }
    },
    actions: {
      setSearchType({commit, state}, payload) {
        commit('SET_SEARCH_TYPE', payload);
      },
      updateSelectedBranch({commit}, payload) {
        commit('SET_SELECTED_BRANCH', payload)
      },
      setSelectedLocation({commit, state}, payload) {
        commit('SET_SELECTED_LOCATION', payload);
      },
      setSelectedPerson({commit, state}, payload) {
        commit('SET_SELECTED_PERSON', payload);
      },
      parseBranches({commit, dispatch, state}, payload) {
        var branches = payload.branches;
        var location = payload.location;
        for (var branch of branches) {
          branch.services = {};
          let branchServices = branch.branchInfo.branchServices;
          for (var service of branchServices) {
            if (service.serviceId == 1 || service.serviceId == 2 || service.serviceId == 3 || service.serviceId == 5) {
              branch.services.atm = true;
            }
            else if (service.serviceId == 4) {
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
            else if (service.serviceId == 9) {
              branch.services.extendedHours = true;
            }
          }
        }
        commit('SET_BRANCHES', branches);
        dispatch('setSelectedLocation', location);
      },
      fetchData({commit, dispatch, state}, payload) {
        let location = payload.location;
        let searchRadius = payload.searchRadius;
        let searchType = payload.searchType;
        return client.fetchData(location, searchRadius)
            .then(data => {
              if (data) {
                data.forEach(function(item) {
                  if (item.branchLocations) {
                    dispatch('parseBranches', {branches:item.branchLocations, location:location});
                  }
                  else if (item.field_job_title == "Mortgage Consultant") {
                    commit('ADD_MORTGAGE_CONSULTANT', item);
                  }
                  else if (item.field_job_title == "Relationship Manager") {
                    commit('ADD_RELATIONSHIP_MANAGER', item);
                  }
                  else if (item.field_job_title == "Private Banker") {
                    commit('ADD_PRIVATE_BANKER', item);
                  }
                });
              }
            });
      }
    }
})

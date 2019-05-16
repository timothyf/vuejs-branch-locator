import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
    state: {
        searchType: 'Branch',
        selectedLocation: {},
        selectedItem: null,
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
        selectedItem (state) {
            return state.selectedItem
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
        SET_BRANCHES (state, branches) {
            state.branches = branches;
        },
        SET_SELECTED_ITEM (state, item) {
            state.selectedItem = item;
        },
        ADD_MORTGAGE_CONSULTANT (state, mortgageConsultant) {
          state.mortgageConsultants.push(mortgageConsultant);
        },
        ADD_RELATIONSHIP_MANAGER (state, relationshipManager) {
          state.relationshipManagers.push(relationshipManager);
        },
        ADD_PRIVATE_BANKER (state, privateBanker) {
          state.privateBankers.push(privateBanker);
        },
        RESET_PEOPLE (state) {
          state.mortgageConsultants = [];
          state.relationshipManagers = [];
          state.privateBankers = [];
        }
    },
    actions: {
      setSearchType({commit, state}, payload) {
        commit('SET_SEARCH_TYPE', payload);
      },
      setSelectedItem({commit}, payload) {
        commit('SET_SELECTED_ITEM', payload)
      },
      setSelectedLocation({commit, state}, payload) {
        commit('SET_SELECTED_LOCATION', payload);
      },
      parseBranches({commit, dispatch, state}, payload) {
        var branches = payload.branches;
        var location = payload.location;
        for (var branch of branches) {
          branch.services = {};
          let branchServices = branch.branchInfo.branchServices;
          if (branchServices) {
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
        }
        commit('SET_BRANCHES', branches);
        dispatch('setSelectedLocation', location);
      },
      fetchData({commit, dispatch, state}, payload) {
        commit('RESET_PEOPLE');
        let location = payload.location;
        let searchRadius = payload.searchRadius;
        let latParam = "field_geocoordinates_proximity-lat=" + location.lat;
        let lngParam = "&field_geocoordinates_proximity-lng=" + location.lng;
        let radiusParam = "&field_geocoordinates_proximity=" + searchRadius;
        Vue.http.get(process.env.BRANCHES_API_BASE_URL + latParam + lngParam + radiusParam)
            .then(function(response) {
              response.json().then(data => {
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
                    else if (item.error) {
                      commit('SET_BRANCHES', []);
                      commit('RESET_PEOPLE');
                      dispatch('setSelectedLocation', location);
                    }
                  });
                }
              });
            });
      }
    }
})

<template>
  <div id="search-results-container">
    <locations-list v-if="(searchType == 'Branch' && branches.length>0) ||
                          (searchType == 'Mortgage Consultant' && mortgageConsultants.length>0)"></locations-list>
    <div id="no-results" v-else>
      No Locations Found
    </div>
    <map-panel></map-panel>
  </div>
</template>

<script>
  import LocationsList from './LocationsList'
  import MapPanel from './MapPanel'

  export default {
    computed: {
      searchType() {
        return this.$store.getters.searchType;
      },
      branches() {
        return this.$store.getters.branches;
      },
      mortgageConsultants() {
        return this.$store.getters.mortgageConsultants;
      },
      privateBankers() {
        return this.$store.getters.privateBankers;
      },
      relationshipManagers() {
        return this.$store.getters.relationshipManagers;
      }
    },
    components: {
      'locations-list': LocationsList,
      'map-panel': MapPanel
    }
  }
</script>

<style>
#search-results-container {
  width: 1366px;
  display: flex;
  flex: 1 1 auto;
}
#no-results {
  width: 503px;
  height: 505px;
  background-color: #ededed;
  padding: 30px;
  font-size: 16pt;
  font-family: Graphik;
  font-family: 'Poppins', sans-serif;
}
</style>

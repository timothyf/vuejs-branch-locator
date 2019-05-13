<template>
  <div id="search-results-container">
    <locations-list></locations-list>
    <map-panel></map-panel>
  </div>
</template>

<script>
  import LocationsList from './LocationsList'
  import MapPanel from './MapPanel'

  export default {
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
</style>

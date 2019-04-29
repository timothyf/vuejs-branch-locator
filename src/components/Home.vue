<template>
  <div id="home-container">
    <div id="search-results-panel">
      <search-results></search-results>
    </div>
    <div id="map-panel">
      <map-panel></map-panel>
    </div>
  </div>
</template>

<script>
  import SearchResults from './SearchResults'
  import MapPanel from './MapPanel'

  export default {
    components: {
      'search-results': SearchResults,
      'map-panel': MapPanel
    }
  }
</script>

<style>
#home-container {
  width: 1366px;
  display: flex;
  flex: 1 1 auto;
}
#map-panel {
  flex: 1 1 auto;
  width: 863px;
}
</style>

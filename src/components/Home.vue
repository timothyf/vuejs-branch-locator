<template>
  <div id="home-container">
    <div id="home-layout">
      <div id="search-results-panel">
        <search-results></search-results>
      </div>
      <div id="map-panel">
        <map-panel></map-panel>
      </div>
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
  flex: 1 1 100%;
  margin: auto;
  padding: 24px;
  width: 100%;
  max-width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
}
#home-layout {
  display: flex;
  height: 100%;
  flex: 1 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
}
#search-results-panel {
  flex: 1 1 auto;
  flex-basis: 33.33333333333333%;
  flex-grow: 0;
  max-width: 33.33333333333333%;
}
#map-panel {
  flex: 1 1 auto;
  flex-basis: 66.66666666666666%;
  flex-grow: 0;
  max-width: 66.66666666666666%;
}
</style>

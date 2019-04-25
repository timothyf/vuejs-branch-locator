<template>
  <div class="container fluid fill-height grid-list-lg">
    <div class="layout row wrap">
      <div class="flex xs4 sm3">
        <search-results></search-results>
      </div>
      <div class="flex xs8 sm9">
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

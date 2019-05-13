<template>
  <div data-app="true" id="app">
    <search-bar></search-bar>
    <search-results></search-results>
  </div>
</template>

<script>
  import SearchResults from './components/SearchResults'
  import SearchBar from './components/SearchBar'
  export default {
    name: 'App',
    components: {
      'search-bar': SearchBar,
      'search-results': SearchResults
    }
  }
</script>

<style>
  #app {
    background: #fafafa;
    width: 1366px;
    margin: auto;
  }
</style>

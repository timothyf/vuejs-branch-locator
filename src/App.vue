<template>
  <div data-app="true" id="app">
    <search-bar></search-bar>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar'
export default {
  name: 'App',
  components: {
    'search-bar': SearchBar,
  }
}
</script>

<style>
#app {
  background: #fafafa;
  width: 1366px;
  margin: auto;
}

main {
  display: flex;
  flex: 1 0 auto;
}

</style>

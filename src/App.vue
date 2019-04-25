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

html {
  box-sizing: border-box;
  overflow-y: scroll;
  font-size: 14px;
  overflow-x: hidden;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  height: 100%;
  margin-top: 30px;
  display: flex;
  background: #fafafa;
  color: rgba(0, 0, 0, .87)
}

main {
  display: flex;
  flex: 1 0 auto;
  max-width: 100%;
  padding: 0px 0px 32px;
}

* {
  box-sizing: inherit;
}

.v-icon {
  color: rgba(0, 0, 0, .54);
  align-items: center;
  display: inline-flex;
  font-size: 24px;
  justify-content: center;
  line-height: 1;
  vertical-align: text-bottom;
}

.v-card {
  background-color: #fff;
  color: rgba(0, 0, 0, .87);
  display: block;
  border-radius: 2px;
  min-width: 0;
  position: relative;
  text-decoration: none;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
}

.v-card__text {
  padding: 16px;
  width: 100%;
}

.flex {
  flex: 1 1 auto;
  max-width: 100%;
}

@media (min-width:0) {
  .flex.xs1 {
    flex-basis: 8.333333333333332%;
    flex-grow: 0;
    max-width: 8.333333333333332%;
  }

  .flex.xs2 {
    flex-basis: 16.666666666666664%;
    flex-grow: 0;
    max-width: 16.666666666666664%;
  }

  .flex.xs3 {
    flex-basis: 25%;
    flex-grow: 0;
    max-width: 25%;
  }

  .flex.xs4 {
    flex-basis: 33.33333333333333%;
    flex-grow: 0;
    max-width: 33.33333333333333%;
  }

  .flex.xs5 {
    flex-basis: 41.66666666666667%;
    flex-grow: 0;
    max-width: 41.66666666666667%;
  }

  .flex.xs6 {
    flex-basis: 50%;
    flex-grow: 0;
    max-width: 50%;
  }

  .flex.xs7 {
    flex-basis: 58.333333333333336%;
    flex-grow: 0;
    max-width: 58.333333333333336%;
  }

  .flex.xs8 {
    flex-basis: 66.66666666666666%;
    flex-grow: 0;
    max-width: 66.66666666666666%;
  }

  .flex.xs9 {
    flex-basis: 75%;
    flex-grow: 0;
    max-width: 75%;
  }

  .flex.xs10 {
    flex-basis: 83.33333333333334%;
    flex-grow: 0;
    max-width: 83.33333333333334%;
  }

  .flex.xs11 {
    flex-basis: 91.66666666666666%;
    flex-grow: 0;
    max-width: 91.66666666666666%;
  }

  .flex.xs12 {
    flex-basis: 100%;
    flex-grow: 0;
    max-width: 100%;
  }

  .flex.offset-xs1 {
    margin-left: 8.333333333333332%;
  }
}

.v-toolbar__title {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: .02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-toolbar__content {
  align-items: center;
  display: flex;
  padding: 0 24px;
}


</style>

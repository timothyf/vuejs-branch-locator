<template>
  <nav>
    <!-- <img src="../../static/texture-image.jpg"
         srcset="../../static/texture-image@2x.jpg 2x,
                 ../../static/texture-image@3x.jpg 3x"
         class="Texture-Image"> -->
    <location-search></location-search>
  </nav>
</template>

<script>
import LocationSearch from './LocationSearch'

export default {
  components: {
    'location-search': LocationSearch
  }
}
</script>

<style>
  nav {
    background-color: #313131 !important;
    color: white;
    height: 155px;
    padding: 20px;
  }
  .Texture-Image {
    width: 1366px;
    height: 195px;
    position: absolute;
    opacity: 0.2;
  }
</style>

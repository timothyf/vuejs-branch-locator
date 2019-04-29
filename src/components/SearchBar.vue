<template>
  <nav>
    <img src="../../static/texture-image.jpg"
         srcset="../../static/texture-image@2x.jpg 2x,
                 ../../static/texture-image@3x.jpg 3x"
         class="Texture-Image">
    <div class="v-toolbar__content" style="height: 64px;">
      <div>Branch Locator</div>
    </div>
  </nav>
</template>

<style>
  nav {
    border: 1px solid red;
    background-color: black !important;
    color: rgba(0, 0, 0, .87);
    width: 100%;
    z-index: 2;
    color: white;
    margin-top: 0px;
    padding-right: 0px;
    padding-left: 0px;
    height: 195px;
  }
  .v-toolbar__content {
    align-items: center;
    display: flex;
    padding: 0 24px;
  }
  .Texture-Image {
    width: 1366px;
    height: 195px;
    position: absolute;
    opacity: 0.2;
  }
</style>

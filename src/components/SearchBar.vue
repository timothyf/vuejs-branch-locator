<template>
  <nav>
    <!-- <img src="../../static/texture-image.jpg"
         srcset="../../static/texture-image@2x.jpg 2x,
                 ../../static/texture-image@3x.jpg 3x"
         class="Texture-Image"> -->
    <div id="search">
      <div id="type-search">
        <label>I would like to locate a</label><br/>
        <select id="branch-type">
          <option>Branch</option>
          <option>Mortgage Consultant</option>
          <option>Relationship Manager</option>
          <option>Private Banker</option>
        </select>
      </div>
      <div id="left-content">
        <div id="address-search">
          <input value="City, State / Zipcode"/>
          <button id="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                <path class="search-btn-icon" d="M8 4l8 8-.727.727L8 5.455.727 12.727 0 12z"/>
            </svg>
          </button>
        </div>
        <div id="current-location">
          <button id="location-btn">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">
                <defs>
                    <path id="a" d="M0 0h23.943v23.943H0z"/>
                </defs>
                <g fill="none" fill-rule="evenodd">
                    <mask id="b" fill="#fff">
                        <use xlink:href="#a"/>
                    </mask>
                    <path fill="#FFF" fill-rule="nonzero" d="M12.08 23.875L23.93.178a.122.122 0 0 0-.165-.165L.068 11.862c-.116.058-.075.232.055.232h11.603c.068 0 .123.055.123.122V23.82c0 .13.174.17.232.055" mask="url(#b)"/>
                </g>
            </svg>
          </button>
        </div>
        <div id="radius-filter">
          <label>Distance</label><br/>
          <select id="radius-value">
            <option>10 miles</option>
            <option>20 miles</option>
            <option>50 miles</option>
          </select>
        </div>
      </div>
    </div>
    <div id="service-filters">
      <label>Filter by Bank Services</label>
    </div>
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
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
    color: #ffffff;
  }
  nav #search {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  nav #search div {

  }
  .Texture-Image {
    width: 1366px;
    height: 195px;
    position: absolute;
    opacity: 0.2;
  }
  #left-content {
    display: flex;
  }
  #type-search label, #radius-filter label {
    opacity: 0.5;
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #ffffff;
  }
  #branch-type, #radius-value {
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 26px;
    font-weight: 300;
    color: #ffffff;
    background-color: #313131 !important;
  }
  #address-search {
    margin: 10px;
    padding: 0px;
    display: flex;
    margin-right: 50px;
  }
  #address-search input {
    width: 185px;
    height: 50px;
    background-color: #5b5b5b;
    padding: 0px;
    padding-left: 15px;
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: #ffffff;
    border: none;
    margin: 0px;
  }
  #search-btn, #location-btn {
    width: 50px;
    height: 50px;
    background-color: #e51b24;
    border: none;
    margin-left: -5px;
    padding: 0px;
  }
  #location-btn {
    background-color: #5b5b5b;
    margin-right: 50px;
  }
  #address-search #search-btn svg,
  #location-btn svg {
    transform: rotate(90deg);
  }
  .search-btn-icon {
    fill: white;
  }
  #radius-filter {
    margin: 10px;
  }
  #service-filters {
    margin: 10px;
    margin-top: 50px;
  }
</style>

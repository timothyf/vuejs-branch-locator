<template>
  <nav>
    <div id="search-wrapper">
      <div id="search">
        <div id="type-search">
          <label>I would like to locate a</label><br/>
          <div class="select">
            <select id="branch-type" class="select-css" @change="onChangeSearchType($event)">
              <option value="Branch">Branch</option>
              <option value="Mortgage Consultant">Mortgage Consultant</option>
              <option value="Relationship Manager">Relationship Manager</option>
              <option value="Private Banker">Private Banker</option>
            </select>
          </div>
        </div>
        <div id="right-content">
          <div id="address-search">
            <input v-model="currentAddress" placeholder="City, State / Zipcode">
            <button id="search-btn" @click="handleSearch">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                  <path class="search-btn-icon" d="M8 4l8 8-.727.727L8 5.455.727 12.727 0 12z"/>
              </svg>
            </button>
          </div>
          <div id="current-location">
            <button id="location-btn" @click="getCurrentLocation">
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
            <div class="select">
              <select id="radius-value" @change="onChangeSearchRadius($event)">
                <option value="10">10 miles</option>
                <option value="20">20 miles</option>
                <option value="50">50 miles</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <!-- <div id="service-filters">
        <label>Filter by Bank Services</label>
        <div id="expander"></div>
      </div> -->
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      currentAddress: "",
      searchRadius: 10
    }
  },
  computed: {
    selectedLocation: {
      get: function() {
        return this.$store.getters.selectedLocation
      },
      set: function(location) {
        this.$store.dispatch('setSelectedLocation', location);
      }
    },
    searchType: {
      get: function() {
        return this.$store.getters.searchType
      },
      set: function(searchType) {
        this.$store.dispatch('setSearchType', searchType);
      }
    }
  },
  beforeMount(){
     this.currentAddress = "253 S 4th St, Tacoma, WA 98402, USA";
  },
  methods: {
    onChangeSearchRadius(event) {
        this.searchRadius = event.target.value;
    },
    onChangeSearchType(event) {
      this.searchType = event.target.value;
    },
    handleSearch() {
      var that = this;
      var searchParams = {};
      searchParams.location = {};
      this.geoCodeAddress(this.currentAddress).then(function(location) {
        searchParams.location.lat = location.lat();
        searchParams.location.lng = location.lng();
        searchParams.searchRadius = that.searchRadius;
        searchParams.searchType = that.searchType;
        that.$store.dispatch('fetchData', searchParams);
      });
    },
    // get geocoords for address passed in
    geoCodeAddress(address) {
      var that = this;
      return new Promise(function(resolve, reject) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resolve(results[0].geometry.location);
          }
          else {
            console.log('Geocode was not successful for the following reason: ' + status);
            reject();
          }
        });
      });
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        var that = this;
        navigator.geolocation.getCurrentPosition(function(position) {
          var location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          that.currentLocation = location;
          that.selectedLocation = location;
          that.getAddress(location).then(function() {
            that.handleSearch();
          });
        }, function() {
          console.log("Error getting current location");
        });
      }
      else {
        // Browser doesn't support Geolocation
        console.log("Browser doesn't support GeoLocation");
      }
    },
    // gets address that coresponds to geocoordinates passed in as location
    // sets current address field to be that address
    getAddress(location) {
      var geocoder = new google.maps.Geocoder;
      var that = this;
      return new Promise(function(resolve, reject) {
        geocoder.geocode({'location': location}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              that.currentAddress = results[0].formatted_address;
              resolve();
            }
            else {
              console.log('No results found');
              reject();
            }
          }
          else {
            console.log('Geocoder failed due to: ' + status);
            reject();
          }
        });
      });
    }
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
  nav #search-wrapper {
    width: 80%;
    margin: auto;
  }
  .Texture-Image {
    width: 1366px;
    height: 195px;
    position: absolute;
    opacity: 0.2;
  }
  #right-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 50%;
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
    padding: 0px;
    display: flex;
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
  #search-btn {
    width: 50px;
    height: 50px;
    background-color: #e51b24;
    border: none;
    padding: 0px;
  }
  button:focus {
    outline: 0;
  }
  #location-btn {
    width: 50px;
    height: 50px;
    background-color: #5b5b5b;
    border: none;
  }
  #address-search #search-btn svg {
    transform: rotate(90deg);
  }
  #location-btn svg {
    transform: rotate(0deg);
  }
  .search-btn-icon {
    fill: white;
  }
  #radius-filter {

  }
  #service-filters {
    margin: 10px;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #aaa;
  }
  #service-filters #expander {
    content: url(../../static/caret-active.svg);
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    outline: 0;
    box-shadow: none;
    border: 0 !important;
    background: #2c3e50;
    background-image: none;
  }
  /* Remove IE arrow */
  select::-ms-expand {
    display: none;
  }
  /* Custom Select */
  .select {
    position: relative;
    display: flex;
    width: 21em;
    height: 3em;
    line-height: 3;
    overflow: hidden;
  }
  #radius-filter .select {
    width: 10em;
  }
  select {
    flex: 1;
    cursor: pointer;
  }
  /* Arrow */
  .select::after {
    content: url(../../static/caret-active.svg);
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 1em;
    color: #e51b24;
    background-color: #313131;
    cursor: pointer;
    pointer-events: none;
  }
</style>

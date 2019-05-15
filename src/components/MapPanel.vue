<template>
  <div v-if="selectedLocation.lat" id="map-container">
    <googlemaps-map ref="map"
                    class="map"
                    :options="{styles: styles,
                               disableDefaultUI: true}"
                    :center.sync="mapCenter"
                    :zoom.sync="zoom">
      <googlemaps-marker v-for="marker in mapMarkers"
                         :key="marker.id"
                         :title="marker.title"
                         :animation="marker.animation"
                         :icon="marker.icon"
                         :position="marker.position"
                         @click="onMapMarkerClick(marker.id)"
                         @mouseover="onMapMarkerMouseOver(marker.id)"
                         @mouseout="onMapMarkerMouseOut(marker.id)">
      </googlemaps-marker>
    </googlemaps-map>
  </div>
</template>

<script>
  import mapStyles from './mapStyles'

  export default {
    data() {
      return {
        mapCenter: {
          lat: 0,
          lng: 0
        },
        zoom: 11,
        mapMarkers: null,
        mapMarkerIconSize: null,
        ignoreCenterOnSelectedItem: false,
        styles: mapStyles
      }
    },
    computed: {
      selectedLocation() {
        return this.$store.getters.selectedLocation;
      },
      selectedItem: {
        get() {
          return this.$store.getters.selectedItem;
        },
        set(value) {
          this.$store.dispatch('setSelectedItem', value);
        }
      },
      branches() {
        return this.$store.getters.branches;
      },
      mortgageConsultants() {
        return this.$store.getters.mortgageConsultants;
      },
      searchType: {
        get() {
          return this.$store.getters.searchType;
        }
      },
    },
    watch: {
      selectedLocation() {
        this.updateMapCenter(this.selectedLocation)
      },
      selectedItem(newValue, oldValue) {
        this.selectMapMarker(oldValue, false)
        this.selectMapMarker(newValue, true)
      }
    },
    methods: {
      onMapMarkerClick(id) {
        this.ignoreCenterOnSelectedItem = true;
        this.selectedItem = id;
      },
      onMapMarkerMouseOver(id) {
        const marker = this.mapMarkers[id];
        marker.animation = 1;
        setTimeout(() => {
          marker.animation = 4;
        }, 300)
      },
      onMapMarkerMouseOut(id) {
        const marker = this.mapMarkers[id];
        marker.animation = 4;
      },
      updateMapCenter(location) {
        // to update the map center we need some time delay, otherwise the change wouldn't work
        this.mapMarkers = null
        setTimeout(() => {
          this.mapCenter.lat = location.lat;
          this.mapCenter.lng = location.lng;
          this.addMapMarkers();
        }, 500)
      },
      addMapMarkers() {
        let markers = {}
        if (this.searchType == 'Branch') {
          for (let i = 0; i < this.branches.length; i++) {
            let location = {
              lat: this.branches[i].branchInfo.latitude,
              lng: this.branches[i].branchInfo.longitude
            };
            let marker = this.createMapMarker(location, this.branches[i].branchInfo.branchId);
            markers[this.branches[i].branchInfo.branchId] = marker;
          }
        }
        else if (this.searchType == 'Mortgage Consultant') {
          for (let i = 0; i < this.mortgageConsultants.length; i++) {
            if (this.mortgageConsultants[i].field_primary_address_export.geocoordinates) {
              let location = {
                lat: parseFloat(this.mortgageConsultants[i].field_primary_address_export.geocoordinates.latitude),
                lng: parseFloat(this.mortgageConsultants[i].field_primary_address_export.geocoordinates.longitude)
              };
              let marker = this.createMapMarker(location, this.mortgageConsultants[i].field_nmls);
              markers[this.mortgageConsultants[i].field_nmls] = marker;
            }
          }
        }
        this.mapMarkers = markers
      },
      createMapMarker(location, markerId) {
        const marker = {};
        marker.id = markerId;
        marker.animation = 4;
        marker.position = {
          lat: location.lat,
          lng: location.lng
        }
        marker.icon = {
          url: process.env.DEFAULT_MAP_ICON,
          scaledSize: this.mapMarkerIconSize
        }
        return marker;
        //markers[markerId] = marker;
      },
      centerOnItem(location) {
        // will repositioned the map center to the specific location
        if (this.ignoreCenterOnSelectedItem) {
          this.ignoreCenterOnSelectedItem = false
        }
        else {
          if (location) {
            this.mapCenter = location
          }
        }
      },
      selectMapMarker(id, isOn) {
        // will make the specified id marker either heilighted or not
        if (this.mapMarkers && this.mapMarkers[id]) {
          const url = isOn ? process.env.SELECTED_MAP_ICON : process.env.DEFAULT_MAP_ICON
          const icon = {
            url: url,
            scaledSize: this.mapMarkerIconSize
          }
          this.mapMarkers[id].icon = icon
          if (isOn) {
            const itemLocation = Object.assign({}, this.mapMarkers[id].position);
            this.centerOnItem(itemLocation);
          }
        }
      }
    },
    googleMapsReady() {
      this.mapMarkerIconSize = new window.google.maps.Size(40, 40);
    }
  }
</script>

<style>
  #map-container {
    flex: 1 1 auto;
    width: 863px;
  }
  .map {
    height: 100%;
  }
  .vue-google-map[data-v-3074bd5c] {
    position: relative
  }
  .vue-google-map .map-view[data-v-3074bd5c] {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute
  }
  .vue-google-map .hidden-content[data-v-3074bd5c] {
    display: none
  }
</style>

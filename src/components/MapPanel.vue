<template>
  <div id="map-container">
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
import {mapActions} from 'vuex'
import EventBus from '../eventBus'

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
      ignoreCenterOnSelectedBranch: false,
      styles: mapStyles
    }
  },
  computed: {
    selectedLocation() {
      return this.$store.getters.selectedLocation
    },
    selectedBranch: {
      get() {
        return this.$store.getters.selectedBranch
      },
      set(value) {
        this.updateSelectedBranch(value)
      }
    },
    branches() {
      return this.$store.getters.branches
    }
  },
  watch: {
    selectedLocation() {
      this.updateMapCenter(this.selectedLocation)
    },
    selectedBranch(newValue, oldValue) {
      this.selectMapMarker(oldValue, false)
      this.selectMapMarker(newValue, true)
    }
  },
  methods: {
    ...mapActions(['updateSelectedBranch']),

    onMapMarkerClick(id) {
      this.ignoreCenterOnSelectedBranch = true
      this.selectedBranch = id
    },
    onMapMarkerMouseOver(id) {
      const marker = this.mapMarkers[id]
      marker.animation = 1
      setTimeout(() => {
        marker.animation = 4
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
      // go through the branches list and add a map marker for each
      let markers = {}
      for (let i = 0; i < this.branches.length; i++) {
        const marker = {}
        marker.id = this.branches[i].branchInfo.branchId;
        marker.title = this.branches[i].branchInfo.branchName + '\n' + this.branches[i].branchInfo.address.addressLine[0] + '\n' +
          this.branches[i].branchInfo.phone;
        marker.animation = 4;
        marker.position = {
          lat: this.branches[i].branchInfo.latitude,
          lng: this.branches[i].branchInfo.longitude
        }
        marker.icon = {
          url: process.env.DEFAULT_MAP_ICON,
          scaledSize: this.mapMarkerIconSize
        }
        markers[this.branches[i].branchInfo.branchId] = marker
      }
      this.mapMarkers = markers
    },
    centerOnBranch(location) {
      // will repositioned the map center to the specific location
      if (this.ignoreCenterOnSelectedBranch) {
        this.ignoreCenterOnSelectedBranch = false
      }
      else {
        if (location) {
          this.mapCenter = location
        }
      }
    },
    recenterMapLocation() {
      // will recenter the map either to selected branch if any
      // or the selected location if no branch is selected
      if (this.selectedBranch && this.mapMarkers && this.mapMarkers[this.selectedBranch]) {
        this.centerOnBranch(this.mapMarkers[this.selectedBranch].position)
      }
      else if (this.selectedLocation) {
        // this.updateMapCenter(this.selectedLocation)
        const location = {
          lat: this.selectedLocation.branchInfo.latitude,
          lng: this.selectedLocation.branchInfo.longitude
        }
        this.centerOnBranch(location)
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
          const branchLocation = Object.assign({}, this.mapMarkers[id].position)
          this.centerOnBranch(branchLocation)
        }
      }
    }
  },
  created() {
    EventBus.$on('recenterMapLocation', () => {
      this.recenterMapLocation();
    })
  },
  beforeMount() {
    if (this.selectedLocation.geoPoint) {
      this.updateMapCenter(this.selectedLocation);
    }
  },
  googleMapsReady() {
    this.mapMarkerIconSize = new window.google.maps.Size(40, 40);
  }
}
</script>

<style>
  #map-container {
    height: 100%;
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

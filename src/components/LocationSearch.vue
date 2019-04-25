<template>
  <div id="location-search">
    <div class="flex xs1">
      <v-icon class="recenter-map-icon" title="Recenter map location" @click="onRecenterMapLocation">my_location</v-icon>
    </div>
    <div class="flex xs10 offset-xs1">
      <div class="subheading" v-show="!isSelectedLocationEdited">
        <span>Your location:</span>
        <a @click="onEditSelectedLocation" href="#">{{ selectedLocation }}</a>
      </div>
      <div class="subheading location-edit" v-show="isSelectedLocationEdited">
        <v-combobox label="Select a location" ref="locationCombobox" v-model="selectedLocation" :items="availableLocations" @change="onLocationChange" @blur.self="onLocationBlur" @input="onLocationBlur" class="inline-input">
        </v-combobox>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import EventBus from '../eventBus'

export default {
    data () {
      return {
        isSelectedLocationEdited: false,
        editedLocation: null
      }
    },
    components: {

    },
    props: {

    },
    computed: {
      selectedLocation: {
          get () {
              const location = this.$store.getters.selectedLocation
              return location.city + ', ' + location.state
          },
          set (newValue) {
              // store the edited location in temp variable before confirming and commit to vuex store
              this.editedLocation = newValue
          }
      },
      availableLocations () {
          return this.$store.getters.availableLocationsShort
      }
    },
    watch: {

    },
    methods: {
      ...mapActions(['updateSelectedLocation']),

      onEditSelectedLocation () {
          this.isSelectedLocationEdited = !this.isSelectedLocationEdited
          setTimeout(() => {
              this.$refs.locationCombobox.focus()
          }, 100)
      },
      onRecenterMapLocation () {
          // need to emit the event to parent component
          // we can either use the event bus
          // or we can use vuex
          EventBus.recenterMapLocation()
      },
      onLocationChange () {
          if (this.editedLocation) {
              const location = this.editedLocation.split(', ')
              this.updateSelectedLocation({state: location[1], city: location[0].toUpperCase(), postalCode: ''})
              this.resetComponentData()
          }
      },
      onLocationBlur () {
          // clear the combobox edit mode if no changes.
          if (this.isSelectedLocationEdited && !this.editedLocation) {
              this.editedLocation = null
              this.isSelectedLocationEdited = false
          }
      },
      resetComponentData () {
        this.editedLocation = null;
        this.isSelectedLocationEdited = false;
      }
    }
}
</script>

<style>
  .location-edit .inline-input {
      display: inline-flex;
      width: 70%;
  }
  .location-edit .inline-button {
      margin-left: 0;
      margin-right: 0;
  }
</style>

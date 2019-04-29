<template>
  <div id="location-search">
    <span>Your location:</span>
    <a @click="onEditSelectedLocation" href="#">{{ selectedLocation }}</a>
    <div class="location-edit" v-show="isSelectedLocationEdited">
      <v-combobox label="Select a location"
                  ref="locationCombobox"
                  v-model="selectedLocation"
                  :items="menuLocations"
                  @change="onLocationChange"
                  @blur.self="onLocationBlur"
                  @input="onLocationBlur"
                  class="inline-input">
      </v-combobox>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import dropdown from "./dropdown";

export default {
    data () {
  //    var availableLocations = this.$store.availableLocations;
      return {
        isSelectedLocationEdited: false,
        editedLocation: null
        // config: {
        //   options: availableLocations,
        //   placeholder: "Placeholder",
        //   backgroundColor: "#cde4f5",
        //   textColor: "black",
        //   borderRadius: "1.5em",
        //   border: "1px solid gray",
        //   width: 180
        // }
      };
    },
    components: {
      'vue-dropdown': dropdown
    },
    computed: {
      selectedLocation: {
          get() {
            const location = this.$store.getters.selectedLocation;
            return location.city + ', ' + location.state;
          },
          set(newValue) {
            // store the edited location in temp variable before confirming and commit to vuex store
            this.editedLocation = newValue;
          }
      },
      menuLocations () {
        return this.$store.getters.availableLocationsShort
      }
    },
    methods: {
      ...mapActions(['updateSelectedLocation']),

      setNewSelectedOption(selectedOption) {
        alert('set new');
        this.config.placeholder = selectedOption.value;
      },
      onEditSelectedLocation () {
        alert('onEditSelectedLocation');
        this.isSelectedLocationEdited = !this.isSelectedLocationEdited
        setTimeout(() => {
          this.$refs.locationCombobox.focus()
        }, 100);
      },
      onLocationChange () {
        alert('onLocationChange');
        if (this.editedLocation) {
          const location = this.editedLocation.split(', ');
          this.updateSelectedLocation({state: location[1], city: location[0].toUpperCase(), postalCode: ''});
          this.resetComponentData();
        }
      },
      onLocationBlur () {
        if (this.isSelectedLocationEdited && !this.editedLocation) {
          this.editedLocation = null;
          this.isSelectedLocationEdited = false;
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
  #location-search {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .location-edit {
    position: relative;
  }
  .location-edit label {
    position: relative !important;
  }
  .location-edit .inline-input {
      display: inline-flex;
      width: 70%;
  }
  .location-edit .inline-button {
      margin-left: 0;
      margin-right: 0;
  }
</style>

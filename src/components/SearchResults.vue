<template>
  <div id="search-results">
    <div class="container fluid grid-list-lg">
      <div class="layout row wrap">
        <location-search></location-search>
        <div class="flex xs12 stores-list">
          <div class="subheading">Nearby Branches ({{ storesCount }})</div>
          <div class="container fluid stores-list-container">
            <div class="layout row wrap">
              <branch-location v-for="store in stores" v-bind:store="store" v-bind:key="store.id"></branch-location>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import moment from 'moment'
import BranchLocation from './BranchLocation'
import LocationSearch from './LocationSearch'

export default {
    data () {
        return {
            ignoreScrollToSelectedStore: false,
        }
    },
    components: {
        'branch-location': BranchLocation,
        'location-search': LocationSearch
    },
    props: {
        userLocation: { type: Object, default: () => { return {state: 'FL', city: 'Orlando', postalCode: '32821'} } }
    },
    computed: {
        stores () {
            return this.$store.getters.stores
        },
        storesCount () {
            return this.stores.length
        }
    },
    watch: {
        selectedStore (newValue, oldValue) {
            // need to wait until the selected store class changes
            if (this.ignoreScrollToSelectedStore) {
                this.ignoreScrollToSelectedStore = false
            } else {
                // triger the auto scroll only if the selection is triggered from outside the list
                setTimeout(() => {
                    this.scrollToSelectedStore()
                }, 50)
            }
        }
    },
    methods: {
        ...mapActions(['updateSelectedStore']),

        scrollToSelectedStore () {
            // scroll to the selected store
            const storesList = this.$el.querySelector('.container.stores-list-container')
            const selectedStore = this.$el.querySelector('.store-item-card.v-card.isSelected')
            if (storesList && selectedStore) {
                storesList.scrollTop = selectedStore.offsetTop - selectedStore.offsetHeight
            }
        },
        scrollToStoresListTop () {
            const storesList = this.$el.querySelector('.container.stores-list-container')
            if (storesList) {
                storesList.scrollTop = 0
            }
        },
        resetComponentData () {
            this.selectedStore = null
            this.ignoreScrollToSelectedStore = false
            this.scrollToStoresListTop()
        }
    }
}
</script>

<style>
#search-results {
  background-color: #ededed;
}
.recenter-map-icon {
    cursor: pointer;
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

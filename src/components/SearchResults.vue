<template>
  <div id="search-results">
    <div id="search-results-container">
      <div id="search-results-layout">
        <location-search></location-search>
        <div class="flex xs12 stores-list">
          <div>Nearby Branches ({{ storesCount }})</div>
          <div class="container fluid stores-list-container">
            <div id="stores-list-layout">
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
  height: 100%;
  color: rgba(0, 0, 0, .87);
  display: block;
  border-radius: 2px;
  min-width: 0;
  position: relative;
  text-decoration: none;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  background-color: #ededed;
}
#search-results-container {
  flex: 1 1 100%;
  margin: auto;
  padding: 24px;
  width: 100%;
  max-width: 100%;
}
#search-results-layout {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  flex-direction: row;
  flex-wrap: wrap;
}
#stores-list-layout {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: nowrap;
  min-width: 0;
  flex-wrap: wrap;
  flex-direction: row;
}
.stores-list-container {
  padding-left: 0;
  padding-right: 0;
  height: 60vh;
  overflow: auto;
  padding-top: 10px;
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

<template>
  <div id="search-results">
    <location-search></location-search>
    <div>Nearby Branches ({{ storesCount }})</div>
    <branch-location v-for="(store, index) in stores"
                     v-bind:store="store"
                     :index="index"
                     v-bind:key="store.id"></branch-location>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BranchLocation from './BranchLocation'
import LocationSearch from './LocationSearch'

export default {
  data() {
    return {
      ignoreScrollToSelectedStore: false
    }
  },
    components: {
      'branch-location': BranchLocation,
      'location-search': LocationSearch
    },
    computed: {
      selectedStore: {
        get() {
          return this.$store.getters.selectedStore
        },
        set(value) {
          this.updateSelectedStore(value)
        }
      },
      stores () {
        return this.$store.getters.stores
      },
      storesCount () {
        return this.stores.length
      }
    },
    methods: {
      ...mapActions(['updateSelectedStore']),
      scrollToSelectedStore() {
        const storesList = document.querySelector('#search-results');
        const selectedStore = document.querySelector('.store-item-card.isSelected');
        if (storesList && selectedStore) {
          storesList.scrollTop = selectedStore.offsetTop - selectedStore.offsetHeight;
        }
      },
      resetComponentData() {
        this.ignoreScrollToSelectedStore = false;
      }
    },
    watch: {
      selectedStore (newValue, oldValue) {
          // need to wait until the selected store class changes
          if (this.ignoreScrollToSelectedStore) {
            this.ignoreScrollToSelectedStore = false;
          }
          else {
            // triger the auto scroll only if the selection is triggered from outside the list
            setTimeout(() => {
                this.scrollToSelectedStore()
            }, 50);
          }
      }
    },
}
</script>

<style>
  #search-results {
    width: 503px;
    height: 505px;
    background-color: #ededed;
    overflow: scroll;
  }
</style>

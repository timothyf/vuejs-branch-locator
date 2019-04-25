<template>
  <div class="branch-location-container">
    <div class="v-card {isSelected: selectedStore === store.id}">
      <v-card class="store-item-card" :class="{isSelected: selectedStore === store.id}" @click.capture="onStoreClick(store.id)">
        <div class="v-card__text">
          <div class="store-display-name">{{store.displayName}}</div>
          <div>{{ store.address.address}}</div>
          <div>{{ store.address.city}}, {{store.address.state}} {{store.address.postalCode}}</div>
          <div>
            <span><a :href="'tel:'+ store.phone">{{ store.phone }}</a></span>
            <span class="store-hours">{{ getStoreHoursDesc(store) }}</span>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'
import moment from 'moment'
import EventBus from '../eventBus'
import BranchLocation from './BranchLocation'

export default {
  data() {
    return {
    }
  },
  props: {
    store: {
      type: Object
    },
    userLocation: {
      type: Object,
      default: () => {
        return {
          state: 'FL',
          city: 'Orlando',
          postalCode: '32821'
        }
      }
    }
  },
  computed: {
    selectedStore: {
      get() {
        return this.$store.getters.selectedStore
      },
      set(value) {
        this.updateSelectedStore(value)
      }
    }
  },
  methods: {
    ...mapActions(['updateSelectedLocation', 'updateSelectedStore']),
    // -------------------
    // events
    // -------------------
    onStoreClick(storeId) {
      this.ignoreScrollToSelectedStore = true
      this.selectedStore = storeId
    },
    onRecenterMapLocation() {
      // need to emit the event to parent component
      // we can either use the event bus
      // or we can use vuex
      EventBus.recenterMapLocation()
    },
    // -------------------
    // other methods
    // -------------------
    getStoreHoursDesc(store) {
      if (store.operationalHours.open24Hours) {
        return 'Open 24 hours'
      } else if (store.operationalHours.todayHrs) {
        return 'Open until: ' + moment(store.operationalHours.todayHrs.endHr, 'hh:mm').format('hh:mm a')
      } else if (store.operationalHours.monToFriHrs) {
        return 'Open until: ' + moment(store.operationalHours.monToFriHrs.endHr, 'hh:mm').format('hh:mm a')
      } else {
        return '(call for store hours)'
      }
    },
    scrollToSelectedStore() {
      // scroll to the selected store
      const storesList = this.$el.querySelector('.container.stores-list-container')
      const selectedStore = this.$el.querySelector('.store-item-card.v-card.isSelected')
      if (storesList && selectedStore) {
        storesList.scrollTop = selectedStore.offsetTop - selectedStore.offsetHeight
      }
    },
    scrollToStoresListTop() {
      const storesList = this.$el.querySelector('.container.stores-list-container')
      if (storesList) {
        storesList.scrollTop = 0
      }
    },
    resetComponentData() {
      this.selectedStore = null
    }
  }
}
</script>

<style>
.branch-location-container {
  flex: 1 1 auto;
  flex-basis: 100%;
  flex-grow: 0;
  max-width: 100%;
}

.store-display-name {
  font-size: 16px !important;
  font-weight: 400
}

.store-hours {
  padding-left: 20px;
}

.store-item-card {
  cursor: pointer;
}

.store-item-card.isSelected {
  border: 4px solid #5C6BC0;
  background-color: #BBDEFB;
}

.recenter-map-icon {
  cursor: pointer;
}
</style>

<template>
  <div class="store-item-card" :class="{isSelected: selectedStore === store.id}" @click.capture="onStoreClick(store.id)">
    <h1>{{ index+1 }}</h1>
    <div>{{store.displayName}}</div>
    <div>{{ store.address.address}}</div>
    <div>{{ store.address.city}}, {{store.address.state}} {{store.address.postalCode}}</div>
    <div>
      <span><a :href="'tel:'+ store.phone">{{ store.phone }}</a></span>
      <span class="store-hours">{{ getStoreHoursDesc(store) }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  props: {
    store: Object,
    index: Number
  },
  computed: {
    selectedStore: {
      get() {
        return this.$store.getters.selectedStore
      }
    }
  },
  methods: {
    ...mapActions(['onStoreClick']),
    getStoreHoursDesc(store) {
      if (store.operationalHours.open24Hours) {
        return 'Open 24 hours';
      } else if (store.operationalHours.todayHrs) {
        return 'Open until: ' + moment(store.operationalHours.todayHrs.endHr, 'hh:mm').format('hh:mm a');
      } else if (store.operationalHours.monToFriHrs) {
        return 'Open until: ' + moment(store.operationalHours.monToFriHrs.endHr, 'hh:mm').format('hh:mm a');
      } else {
        return '(call for store hours)';
      }
    }
  }
}
</script>

<style>
  .store-hours {
    padding-left: 20px;
  }
  .store-item-card {
    background-color: #fff;
    padding: 16px;
    width: 440px;
    height: 309px;
    margin: auto;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .store-item-card.isSelected {
    border: 2px solid #5C6BC0;
    background-color: #BBDEFB;
  }
</style>

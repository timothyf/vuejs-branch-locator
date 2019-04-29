<template>
  <div class="branch-location-card" :class="{isSelected: selectedBranch === branch.id}" @click.capture="onBranchClick(branch.id)">
    <h1>{{ index+1 }}</h1>
    <div class="branch-name">{{branch.displayName}}</div>
    <div class="address-1">{{ branch.address.address}}</div>
    <div class="address-2">{{ branch.address.city}}, {{branch.address.state}} {{branch.address.postalCode}}</div>
    <hr/>
    <div class="branch-phone"><a :href="'tel:'+ branch.phone">{{ branch.phone }}</a></div>
    <div class="branch-hours">{{ getBranchHoursDesc(branch) }}</div>
    <div class="icon-bar"></div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  props: {
    branch: Object,
    index: Number
  },
  computed: {
    selectedBranch: {
      get() {
        return this.$store.getters.selectedBranch
      }
    }
  },
  methods: {
    ...mapActions(['onBranchClick']),
    getBranchHoursDesc(branch) {
      if (branch.operationalHours.open24Hours) {
        return 'Open 24 hours';
      } else if (branch.operationalHours.todayHrs) {
        return 'Open until: ' + moment(branch.operationalHours.todayHrs.endHr, 'hh:mm').format('hh:mm a');
      } else if (branch.operationalHours.monToFriHrs) {
        return 'Open until: ' + moment(branch.operationalHours.monToFriHrs.endHr, 'hh:mm').format('hh:mm a');
      } else {
        return '(call for branch hours)';
      }
    }
  }
}
</script>

<style>
  .branch-location-card {
    border: 1px solid red;
    background-color: #fff;
    width: 440px;
    height: 309px;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .branch-location-card.isSelected {
    border: 2px solid #5C6BC0;
    background-color: #BBDEFB;
  }
  .branch-location-card h1 {
    margin-top: -35px;
    width: 44px;
    height: 42px;
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 42px;
    font-weight: 300;
    font-style: normal;
    color: #e51b24;
  }
  .branch-name {
    height: 16px;
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.14;
    letter-spacing: normal;
    color: #5b5b5b;
  }
  .address-1 {
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    height: 27px;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.69;
    letter-spacing: normal;
    color: #5b5b5b;
  }
  .address-2 {
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    height: 27px;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.69;
    letter-spacing: normal;
    color: #5b5b5b;
  }
  .branch-phone {
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: #5b5b5b;
  }
  .branch-hours {
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.57;
    letter-spacing: normal;
    color: #5b5b5b;
  }
  hr {
    width: 75px;
    height: 2px;
    background-color: #e4e4e4;
  }
  .icon-bar {
    width: 440px;
    height: 50px;
    background-color: #f7f7f7;
  }
</style>

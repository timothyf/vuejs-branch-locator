<template>
  <div class="branch-location-card" :class="{isSelected: selectedBranch === branch.id}" @click.capture="onBranchClick(branch.id)">
    <div class="index">{{ index+1 }}</div>
    <div class='indented'>
      <div class="multi-item">
        <div class="branch-name">{{branch.displayName}}</div>
        <div class="branch-distance">0.7 miles</div>
      </div>
      <div class="address-1">{{ branch.address.address}}</div>
      <div class="address-2">{{ branch.address.city}}, {{branch.address.state}} {{branch.address.postalCode}}</div>
      <hr/>
      <div class="branch-hours">{{ getBranchHoursDesc(branch) }}</div>
      <div class="branch-email">email</div>
      <div class="multi-item">
        <div class="branch-phone"><a :href="'tel:'+ branch.phone">{{ branch.phone }}</a></div>
        <div class="directions">Directions</div>
      </div>
    </div>
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
    padding-top: 1px;
    position: relative;
    background-color: #fff;
    width: 440px;
    height: 309px;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .branch-location-card .index {
    position: absolute;
    top: -30px;
    left: 30px;
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 42px;
    font-weight: 300;
    font-style: normal;
    color: #e51b24;
  }
  .indented {
    margin-left: 30px;
    margin-right: 22px;
    margin-top: 30px;
  }
  .multi-item {
    display: flex;
    justify-content: space-between;
  }
  .branch-name {
    width: 280px;
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
  .branch-distance {
    width: 90px;
    height: 22px;
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.57;
    letter-spacing: normal;
    text-align: right;
    color: #e51b24;
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
    width: 250px;
    height: 22px;
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
  .branch-email {
    width: 250px;
    height: 22px;
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
  .directions {
    width: 90px;
    height: 22px;
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.14;
    letter-spacing: normal;
    text-align: right;
    color: #e51b24;
  }
  hr {
    width: 75px;
    height: 2px;
    background-color: #e4e4e4;
    text-align: left;
    margin-left: 0px;
  }
  .icon-bar {
    position: absolute;
    bottom: 0px;
    width: 440px;
    height: 50px;
    background-color: #f7f7f7;
  }
</style>

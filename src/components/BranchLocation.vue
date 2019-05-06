<template>
  <div class="branch-location-card" :class="{isSelected: selectedBranch === branch.id}" @click.capture="onBranchClick(branch.id)">
    <div class="index">{{ index+1 }}</div>
    <div class='indented'>
      <div class="multi-item">
        <div class="branch-name">{{branch.displayName}}</div>
        <div class="branch-distance">{{ distance }}</div>
      </div>
      <div class="address-1">{{ branch.address.address}}</div>
      <div class="address-2">{{ branch.address.city}}, {{branch.address.state}} {{branch.address.postalCode}}</div>
      <hr/>
      <div class="branch-hours">
        <img src="../../static/clock-small.svg" class="branch-icon">
        {{ getBranchHoursDesc(branch) }}
      </div>
      <div class="branch-email">
        <img src="../../static/email.svg" class="branch-icon">
        email
      </div>
      <div class="multi-item">
        <div class="branch-phone">
          <img src="../../static/phone.svg" class="branch-icon">
          <a :href="'tel:'+ branch.phone">{{ branch.phone }}</a>
        </div>
        <div class="directions">
          <a href="https://www.google.com/maps/dir/?api=1&orgin=Detroit@destination=Flint">Directions</a>
      </div>
      </div>
    </div>
    <div class="icon-bar">
      <img src="../../static/branch.svg" class="branch-icon">
      <img src="../../static/in-store-branch.svg" class="branch-icon">
      <img src="../../static/atm.svg" class="branch-icon">
      <img src="../../static/currency.svg" class="branch-icon">
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      distance: ""
    }
  },
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
  beforeMount(){
     this.getDistance();
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
    },
    getCurrentLocation() {
      return new Promise(function(resolve, reject) {
        if (navigator.geolocation) {
          var that = this;
          navigator.geolocation.getCurrentPosition(function(position) {
            var location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            resolve(location);
          }, function() {
            console.log("Error getting current location");
            reject();
          });
        }
        else {
          // Browser doesn't support Geolocation
          console.log("Browser doesn't support GeoLocation");
          reject();
        }
      });
    },
    getDistance() {
      var that = this;
      this.getCurrentLocation().then(function(location) {
        let origin = location;
        let destination = new google.maps.LatLng(42.33143, -83.04575);
        var service = new google.maps.DistanceMatrixService();
        console.log(JSON.stringify(that.branch.geoPoint));
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [that.branch.geoPoint],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.IMPERIAL,
          }, function(response, status) {
            var distance = (response.rows[0].elements[0].distance.text).replace(/['"]+/g, '');
            that.distance = distance;
        });
      });
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
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #5b5b5b;
    line-height: 1.57;
  }
  .branch-phone img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .branch-hours {
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #5b5b5b;
    line-height: 1.57;
  }
  .branch-hours img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .branch-email {
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #5b5b5b;
    line-height: 2;
  }
  .branch-email img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    vertical-align: middle;
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
  }
  .directions a, .directions a:visited {
    color: #e51b24;
  }
  hr {
    width: 75px;
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
  .branch-icon {
    width: 16px;
    height: 16px;
  }
  .icon-bar .branch-icon {
    margin-top: 20px;
    margin-left: 20px;
  }
</style>

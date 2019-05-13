<template>
  <div class="mortgage-consultant-card" :class="{isSelected: selectedConsultant === consultant.field_nmls}" @click.capture="onConsultantClick(consultant.field_nmls)">
    <div class="index">{{ index+1 }}</div>
    <div class='indented'>
      <div class="multi-item">
        <div class="consultant-name">{{consultant.title}}</div>
        <div class="consultant-distance">{{ distance }}</div>
      </div>
      <div class="address-1">{{ consultant.field_primary_address_export.address.address_line1}}</div>
      <div class="address-2">{{ consultant.field_primary_address_export.address.city}}, {{consultant.field_primary_address_export.address.state}} {{consultant.field_primary_address_export.address.zipCode}}</div>
      <hr/>
      <!-- <div class="consultant-hours">
        <img src="../../static/clock-small.svg" class="branch-icon">
        {{ getConsultantHoursDesc(consultant) }}
      </div> -->
      <div class="multi-item">
        <div class="consultant-phone">
          <img src="../../static/phone.svg" class="branch-icon">
          <a :href="'tel:'+ consultant.field_mc_phone">{{ consultant.field_mc_phone }}</a>
        </div>
        <div class="directions">
          <a target="_blank" :href="getDirectionsUrl()">Directions</a>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      distance: "",
      location: ""
    }
  },
  props: {
    consultant: Object,
    index: Number
  },
  computed: {
    selectedConsultant: {
      get() {
        return this.$store.getters.selectedConsultant
      }
    }
  },
  beforeMount(){
     this.getDistance();
  },
  methods: {
    // getConsultantHoursDesc() {
    //   if (this.consultant.operationalHours.open24Hours) {
    //     return 'Open 24 hours';
    //   } else if (this.consultant.operationalHours.todayHrs) {
    //     return 'Open until: ' + moment(this.consultant.operationalHours.todayHrs.endHr, 'hh:mm').format('hh:mm a');
    //   } else if (this.consultant.operationalHours.monToFriHrs) {
    //     return 'Open until: ' + moment(this.consultant.operationalHours.monToFriHrs.endHr, 'hh:mm').format('hh:mm a');
    //   } else {
    //     return '(call for consultant hours)';
    //   }
    // },
    onConsultantClick(consultantId) {
      this.$store.dispatch('updateSelectedConsultant', consultantId);
    },
    getDirectionsUrl() {
      var destination = "&destination=" + this.consultant.field_primary_address_export.geocoordinates.latitude + "%2C" + this.consultant.field_primary_address_export.geocoordinates.longitude;
      return process.env.DIRECTIONS_BASE_URL + destination;
    },
    getCurrentLocation() {
      var that = this;
      return new Promise(function(resolve, reject) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            that.location = location;
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
        var service = new google.maps.DistanceMatrixService();
        var destination = {};
        destination.lat = that.consultant.field_primary_address_export.geocoordinates.latitude;
        destination.lng = that.consultant.field_primary_address_export.geocoordinates.longitude;
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
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
  .mortgage-consultant-card {
    padding-top: 1px;
    position: relative;
    background-color: #fff;
    width: 440px;
    height: 309px;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .mortgage-consultant-card .index {
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
  .consultant-name {
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
  .consultant-distance {
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
  .consultant-phone {
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #5b5b5b;
    line-height: 1.57;
  }
  .consultant-phone img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .consultant-hours {
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #5b5b5b;
    line-height: 1.57;
  }
  .consultant-hours img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .consultant-email {
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #5b5b5b;
    line-height: 2;
  }
  .consultant-email img {
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
  .branch-icon {
    width: 16px;
    height: 16px;
  }
</style>

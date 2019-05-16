<template>
  <div class="item-card" :class="{isSelected: selectedItem === person.field_nmls}" @click.capture="onPersonClick(person.field_nmls)">
    <div class="index">{{ index+1 }}</div>
    <div class='indented'>
      <div class="profile-top">
        <div>
          <div class="person-name">{{person.title}}</div>
          <div class="person-title">{{person.field_job_title}}</div>
          <div class="person-nmls">NMLS ID: {{person.field_nmls}}</div>
          <div class="address-1">{{ person.field_primary_address_export.address.address_line1}}</div>
          <div class="address-2">{{ person.field_primary_address_export.address.city}}, {{person.field_primary_address_export.address.state}} {{person.field_primary_address_export.address.zipCode}}</div>
        </div>
        <div class="profile-image">
          <img :src="person.profile_image.url" />
        </div>
      </div>
      <hr/>
      <div class="multi-item">
        <div class="person-email">
          <img src="../../static/email.svg" class="branch-icon">
          {{ person.field_email }}
        </div>
        <div class="person-distance">{{ distance }}</div>
      </div>
      <div class="multi-item">
        <div class="person-phone">
          <img src="../../static/phone.svg" class="branch-icon">
          <a :href="'tel:'+ person.field_mc_phone">{{ person.field_mc_phone }}</a>
        </div>
        <div class="directions">
          <a target="_blank" :href="getDirectionsUrl()">Directions</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distance: "",
      location: ""
    }
  },
  props: {
    person: Object,
    index: Number
  },
  computed: {
    selectedItem: {
      get() {
        return this.$store.getters.selectedItem
      }
    }
  },
  beforeMount(){
     this.getDistance();
  },
  methods: {
    // getPersonHoursDesc() {
    //   if (this.person.operationalHours.open24Hours) {
    //     return 'Open 24 hours';
    //   } else if (this.person.operationalHours.todayHrs) {
    //     return 'Open until: ' + moment(this.person.operationalHours.todayHrs.endHr, 'hh:mm').format('hh:mm a');
    //   } else if (this.person.operationalHours.monToFriHrs) {
    //     return 'Open until: ' + moment(this.person.operationalHours.monToFriHrs.endHr, 'hh:mm').format('hh:mm a');
    //   } else {
    //     return '(call for person hours)';
    //   }
    // },
    onPersonClick(personId) {
      this.$store.dispatch('setSelectedItem', personId);
    },
    getDirectionsUrl() {
      var destination = "&destination=" + this.person.field_primary_address_export.geocoordinates.latitude + "%2C" + this.person.field_primary_address_export.geocoordinates.longitude;
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
        destination.lat = that.person.field_primary_address_export.geocoordinates.latitude;
        destination.lng = that.person.field_primary_address_export.geocoordinates.longitude;
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
  .item-card {
    padding-top: 1px;
    position: relative;
    background-color: #fff;
    width: 440px;
    height: 309px;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .item-card .index {
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
  .profile-top {
    display: flex;
  }
  .profile-image img {
    width: 90px;
  }
  .person-name, .person-title, .person-nmls {
    width: 280px;
    height: 16px;
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.14;
    color: #5b5b5b;
  }
  .person-title, .person-nmls {
    height: 20px;
    font-size: 12px;
    font-weight: normal;
    line-height: 1.67;
    color: #8b8b8b;
  }
  .person-distance {
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
  .address-1, .address-2 {
    width: 280px;
    height: 27px;
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    line-height: 1.69;
    letter-spacing: normal;
    color: #5b5b5b;
  }
  .person-phone, .person-email {
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #5b5b5b;
    font-weight: normal;
  }
  .person-phone a {
    color: #5b5b5b;
    text-decoration: none;
  }
  .person-phone img, .person-email img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .person-hours {
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #5b5b5b;
    line-height: 1.57;
  }
  .person-hours img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .person-email {
    font-family: Graphik;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #5b5b5b;
    line-height: 2;
  }
  .person-email img {
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

<template>
  <div id="locations-list">
    <branch-location v-if="searchType == 'Branch'"
                     v-for="(branch, index) in branches"
                     v-bind:branch="branch"
                     :index="index"
                     v-bind:key="branch.id"></branch-location>

    <mortgage-consultant v-if="searchType == 'Mortgage Consultant'"
                         v-for="(person, index) in mortgageConsultants"
                         v-bind:person="person"
                         :index="index"
                         v-bind:key="person.id"></mortgage-consultant>

   <private-banker v-if="searchType == 'Private Banker'"
                   v-for="(person, index) in privateBankers"
                   v-bind:person="person"
                   :index="index"
                   v-bind:key="person.id"></private-banker>

    <relationship-manager v-if="searchType == 'Relationship Manager'"
                          v-for="(person, index) in relationshipManagers"
                          v-bind:person="person"
                          :index="index"
                          v-bind:key="person.id"></relationship-manager>
  </div>
</template>

<script>
import BranchLocation from './BranchLocation'
import MortgageConsultant from './MortgageConsultant'
import PrivateBanker from './PrivateBanker'
import RelationshipManager from './RelationshipManager'
export default {
  data() {
    return {
      ignoreScrollToSelectedBranch: false
    }
  },
  components: {
    'branch-location': BranchLocation,
    'mortgage-consultant': MortgageConsultant,
    'private-banker': PrivateBanker,
    'relationship-manager': RelationshipManager
  },
  computed: {
    selectedBranch: {
      get() {
        return this.$store.getters.selectedBranch;
      },
      set(value) {
        this.$store.dispatch('updateSelectedBranch', value);
      }
    },
    searchType: {
      get() {
        return this.$store.getters.searchType;
      },
      set(searchType) {
        this.$store.dispatch('setSearchType', searchType);
      }
    },
    branches () {
      return this.$store.getters.branches;
    },
    mortgageConsultants () {
      return this.$store.getters.mortgageConsultants;
    },
    privateBankers () {
      return this.$store.getters.privateBankers;
    },
    relationshipManagers () {
      return this.$store.getters.relationshipManagers;
    }
  },
  methods: {
    scrollToSelectedBranch() {
      const branchesList = document.querySelector('#locations-list');
      const selectedBranch = document.querySelector('.branch-location-card.isSelected');
      if (branchesList && selectedBranch) {
        branchesList.scrollTop = selectedBranch.offsetTop - selectedBranch.offsetHeight;
      }
    },
    resetComponentData() {
      this.ignoreScrollToSelectedBranch = false;
    }
  },
  watch: {
    selectedBranch (newValue, oldValue) {
        // need to wait until the selected branch class changes
        if (this.ignoreScrollToSelectedBranch) {
          this.ignoreScrollToSelectedBranch = false;
        }
        else {
          // triger the auto scroll only if the selection is triggered from outside the list
          setTimeout(() => {
              this.scrollToSelectedBranch()
          }, 50);
        }
    }
  },
}
</script>

<style>
  #locations-list {
    width: 503px;
    height: 505px;
    background-color: #ededed;
    overflow: scroll;
  }
</style>

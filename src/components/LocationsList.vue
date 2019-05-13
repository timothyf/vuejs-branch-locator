<template>
  <div id="locations-list">
    <branch-location v-if="searchType == 'Branch'"
                     v-for="(branch, index) in branches"
                     v-bind:branch="branch"
                     :index="index"
                     v-bind:key="branch.id"></branch-location>

    <mortgage-consultant v-if="searchType == 'Mortgage Consultant'"
                         v-for="(consultant, index) in mortgageConsultants"
                         v-bind:consultant="consultant"
                         :index="index"
                         v-bind:key="consultant.id"></mortgage-consultant>
  </div>
</template>

<script>
import BranchLocation from './BranchLocation'
import MortgageConsultant from './MortgageConsultant'
export default {
  data() {
    return {
      ignoreScrollToSelectedBranch: false
    }
  },
  components: {
    'branch-location': BranchLocation,
    'mortgage-consultant': MortgageConsultant
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

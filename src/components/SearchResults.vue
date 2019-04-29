<template>
  <div id="search-results">
    <branch-location v-for="(branch, index) in branches"
                     v-bind:branch="branch"
                     :index="index"
                     v-bind:key="branch.id"></branch-location>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BranchLocation from './BranchLocation'

export default {
  data() {
    return {
      ignoreScrollToSelectedBranch: false
    }
  },
  components: {
    'branch-location': BranchLocation,
  },
    computed: {
      selectedBranch: {
        get() {
          return this.$store.getters.selectedBranch
        },
        set(value) {
          this.updateSelectedBranch(value)
        }
      },
      branches () {
        return this.$store.getters.branches
      }
    },
    methods: {
      ...mapActions(['updateSelectedBranch']),
      scrollToSelectedBranch() {
        const branchesList = document.querySelector('#search-results');
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
  #search-results {
    width: 503px;
    height: 505px;
    background-color: #ededed;
    overflow: scroll;
  }
</style>

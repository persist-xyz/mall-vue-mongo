<template>
  <div id="app">
    <navBar></navBar>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import navBar from './components/navBar'
export default {
  components: {navBar},
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    '$route' (to, from) {
      const toDep = to.path.split('/').length
      const fromDep = from.path.split('/').length
      this.transitionName = toDep < fromDep ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang="scss" rel="stylesheet">
</style>

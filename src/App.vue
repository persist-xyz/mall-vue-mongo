<template>
  <div id="app">
    <navBar></navBar>
    <router-view></router-view>
  </div>
</template>

<script>
import navBar from './components/navBar'
export default {
  components: {navBar}
}
</script>

<style lang="scss" rel="stylesheet">
</style>

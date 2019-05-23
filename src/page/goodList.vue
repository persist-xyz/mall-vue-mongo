<template>
  <div>
    <div class="content">
      <good-card></good-card>
    </div>
  </div>
</template>

<script>
import goodCard from '@/components/goodCard'

export default {
  components: { goodCard },
  name: 'goodList',
  data () {
    return {
    }
  },
  mounted () {
    console.log(11)
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

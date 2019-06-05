<template>
  <transition>
    <div class="toast" v-if="showToast">
      <span>{{message}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  props: {
  },
  data () {
    return {
      message: '',
      durantime: 3000,
      showToast: false
    }
  },
  mounted () {
    this.startTimer()
  },
  methods: {
    startTimer () {
      this.showToast = true
      let _time
      if (this.durantime > 0) {
        _time = setTimeout(() => {
          this.showToast = false
        }, this.durantime)
      } else {
        this.showToast = false
        clearTimeout(_time)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .toast{
    background: rgba(0, 0, 0, .7);
    color: #fff;
    padding:5px 10px;
    font-size:16px;
    border-radius: 25px;
    max-width:300px;
    min-width:200px;
    text-align: center;
    white-space: pre-wrap;
    line-height:30px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;
    transform: translateX(-50%) translateY(-50%);
  }
</style>

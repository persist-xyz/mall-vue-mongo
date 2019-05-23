<template>
  <ul class="goods-card">
    <li>
      <img src="@/assets/image/logo.jpg" alt="">
      <div class="note">
        <span class="title">朱一龙朱一龙朱一龙朱一龙朱一龙</span>
        <span class="price">8888</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'GoodCard',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  ul.goods-card{
    li{
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      width:200px;
      img{
        width:200px;
        height:80px;
      }
      .note{
        .title{
        }
      }
    }
  }
</style>

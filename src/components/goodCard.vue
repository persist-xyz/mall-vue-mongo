<template>
  <div class="goods-card">
    <div>
      <img :src="listCard.img" alt="">
    </div>
    <div class="note">
      <p class="black2">{{listCard.title}}</p>
      <span class="gray2 marginTop10">¥ {{listCard.price}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodCard',
  props: {
    listCard: {
      type: Object,
      default: () => {}
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
  .goods-card{
    width:220px;
    cursor: pointer;
    display: inline-block;
    margin:0 10px 10px 10px;
    background: #fff;
    img{
      width: 100%;
      height: 150px;
    }
    .note{
      padding:10px 5px;
    }
    &:hover{
      box-shadow: 0 4px 6px 4px rgba(0, 0, 0, .1);
    }
  }
</style>

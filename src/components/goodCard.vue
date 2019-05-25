<template>
  <div class="goods-card">
    <div class="img-div" :style="{'background-image': `url(/static/image/${listCard.productImage})`}"></div>
    <div class="note">
      <p class="black2">{{listCard.productName}}</p>
      <span class="gray2 marginTop10">¥ {{listCard.salePrice}}</span>
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
    margin:0 10px 20px 10px;
    background: #fff;
    .img-div{
      width: 100%;
      height: 150px;
      background-size: contain;
    }
    .note{
      padding:10px 5px;
    }
    &:hover{
      box-shadow: 0 4px 6px 4px rgba(0, 0, 0, .1);
    }
  }
</style>

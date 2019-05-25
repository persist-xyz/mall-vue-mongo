<template>
  <div class="goods-card">
    <div class="img-div" :style="{'background-image': `url(/static/image/${listCard.productImage})`}"></div>
    <div class="note">
      <p class="black2">{{listCard.productName}}</p>
      <span class="gray2 marginTop10">¥ {{listCard.salePrice}}</span>
    </div>
    <span class="addToCart">加入购物车</span>
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
    width: 270px;
    cursor: pointer;
    display: inline-block;
    margin: 0 15px 40px 15px;
    background: #fff;
    position: relative;
    .img-div{
      width: 100%;
      height: 200px;
      background-size: contain;
    }
    .note{
      padding:10px 5px;
    }
    &:hover{
      box-shadow: 0 4px 6px 4px rgba(0, 0, 0, .1);
    }
    .addToCart{
      color: #f56000;
      padding: 10px;
      width: 90%;
      text-align: center;
      border:1px solid #f56000;
      border-radius: 30px;
      margin: 14px;
      &:hover{
        background: #f56000;
        color: #fff;
        border:1px solid #fff;
      }
    }
  }
</style>

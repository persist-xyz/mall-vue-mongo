<template>
  <div class="cart-list">
    <h2>My Cart</h2>
    <div class="content">
      <ul class="title">
        <li>Items</li>
        <li>Price</li>
        <li>Quantity</li>
        <li>SubTotal</li>
        <li>Del</li>
      </ul>
      <ul class="list">
        <li v-for="(list, index) in cartList" :key="index">
          <div class="choose">
            <input type="checkbox">
            <img :src="`/static/image/${list.productImage}`" alt="">
            <h4>{{list.productName}}</h4>
          </div>
          <span class="price black2">{{list.salePrice}}</span>
          <div class="edit">
            <span @click="list.productNum--">-</span>
            <input type="text" v-model="list.productNum" />
            <span @click="list.productNum++">+</span>
          </div>
          <span class="total-price orange">{{list.salePrice * list.productNum}}</span>
          <span class="del">del</span>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="left">
        <input type="checkbox">
        <span class="font16">全选</span>
      </div>
      <div class="right">
        <span class="gray2 font16">Item Total: <span class="orange font18">totalPrice</span> </span>
        <span class="btn">CHECKOUT</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      totalPrice: 0,
      cartList: []
    }
  },
  mounted () {
    this.getCartList()
  },
  methods: {
    getCartList () {
      this.$ajax.get('/users/cartList').then(res => {
        //cartList
        this.cartList = res.result.cartList
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.cart-list{
  width:1200px;
  margin:0 auto;
  height:80vh;
  h2{
    font-size:50px;
    line-height:100px;
    font-family: fantasy;
  }
  .content{
    .title{
      display: flex;
      line-height: 50px;
      font-size:16px;
      background: #f57523;
      margin: 10px 0;
      color: #fff;
      li{
        width:210px;
        text-align: center;
        &:first-child{
          width:350px;
        }
      }
    }
    .list{
      li{
        display: flex;
        align-items: center;
        text-align: center;
        border-bottom: 1px solid #eee;
        padding: 10px 0;
      }
      .choose{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width:350px;
        img{
          width:100px;
          height:70px;
          margin: 0 20px;
        }
      }
      .price{
        width:210px;
      }
      .edit{
        width:210px;
        span{
          border:1px solid #eee;
          background: #eee;
          width:35px;
          height:35px;
          line-height:35px;
          text-align: center;
          cursor: pointer;
        }
        input{
          display: inline-block;
          border: 1px solid #eee;
          border-left: none;
          border-right: none;
          text-align: center;
          width:40px;
          height:35px;
        }
      }
      .total-price{
        width:210px;
      }
      .del{
        width:210px;
      }
    }
  }
  .bottom{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border:1px solid #eee;
    border-left: none;
    border-right: none;
    margin:20px 0;
    .left{
      input{
        vertical-align: middle;
        width: 30px;
        height: 30px;
      }
    }
    .right{}
    .btn{
      color: #fff;
      background: #f56000;
      padding:20px 40px;
      margin-left:20px;
    }
  }
}
</style>

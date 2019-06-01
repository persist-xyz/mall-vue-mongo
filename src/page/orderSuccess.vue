<template>
  <div class="checkout">
    <ul class="step">
      <li class="active">
        <span>confirm address</span>
      </li>
      <li class="active">
        <span>view your order</span>
      </li>
      <li class="active">
        <span>make payment</span>
      </li>
      <li class="active">
        <span>order confirnmtion</span>
      </li>
    </ul>
    <div class="main">
      <img src="@/assets/image/logo.jpg" alt="">
      <p>Congratulation</p>
      <p>Your order is under processing!</p>
      <p class="note">
        orderId: 222222 <br/>
        price: 88888
      </p>
      <p class="note">
      </p>
    </div>
    <div class="btn">
      <router-link to="shoppingCart">Cart List</router-link>
      <router-link to="goodList">Good List</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.checkout{
  width:1200px;
  margin:0 auto;
  height:80vh;
  .step{
    margin:20px 0;
    font-size: 18px;
    overflow: -webkit-paged-x;
    li{
      float: left;
      border-bottom:2px solid #999;
      color: #999;
      width: 25%;
      text-align: center;
      padding: 10px;
      position: relative;
      &::after{
        bottom:-5px;
        left:48%;
        position: absolute;
        content: '';
        width:10px;
        height:10px;
        border-radius: 100%;
        background: #999;
      }
      &.active{
        border-bottom:2px solid #f56000;
        color: #f56000;
        &::after{
          background: #f56000;
        }
      }
    }
  }
  .main{
    margin: 50px 0;
    img{
      width:200px;
      height:200px;
      margin:20px auto;
    }
    p{
      text-align: center;
      font-size: 26px;
      line-height: 30px;
      color: #666;
    }
    .note{
      margin-top: 30px;
      color: #999;
      font-size: 18px;
    }
  }
  .btn{
    text-align: center;
    a{
      color: #f56000;
      font-size:18px;
      display: inline-block;
      margin:20px 10px;
      border:1px solid #f56000;
      padding:15px 30px;
      cursor: pointer;
    }
  }
}
</style>

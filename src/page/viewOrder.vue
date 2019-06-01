<template>
  <div class="checkout">
    <ul class="step">
      <li class="active">
        <span>confirm address</span>
      </li>
      <li class="active">
        <span>view your order</span>
      </li>
      <li>
        <span>make payment</span>
      </li>
      <li>
        <span>order confirnmtion</span>
      </li>
    </ul>
    <div class="main">
      <ul class="title">
        <li>Items</li>
        <li>Price</li>
        <li>Quantity</li>
        <li>SubTotal</li>
      </ul>
      <ul class="list">
        <li>
          <div class="choose">
            <img :src="`/static/image/1.jpg`" alt="">
            <h4>朱一龙啊朱一龙</h4>
          </div>
          <span class="price black2">9999</span>
          <div class="edit">
            <span> * 1</span>
          </div>
          <span class="total-price orange">888888</span>
        </li>
      </ul>
    </div>
    <ul class="count">
      <li>
        <span class="label">Item SubTotal：</span>
        <span class="price">9999</span>
      </li>
      <li>
        <span class="label">Shipping：</span>
        <span class="price">100</span>
      </li>
      <li>
        <span class="label">Discount：</span>
        <span class="price">0</span>
      </li>
      <li>
        <span class="label">Tak：</span>
        <span class="price">400</span>
      </li>
      <li>
        <span class="label">Order Total：</span>
        <span class="price">8888</span>
      </li>
    </ul>
    <router-link class="next" to="orderSuccess">To Payment</router-link>
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
    .title{
      display: flex;
      line-height: 50px;
      font-size:16px;
      background: #f57523;
      margin: 10px 0;
      color: #fff;
      li{
        width:250px;
        text-align: center;
        &:first-child{
          width:400px;
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
        width:400px;
        img{
          width:100px;
          height:70px;
          margin: 0 20px;
        }
      }
      .price{
        width:250px;
      }
      .edit{
        width:250px;
        span{
          line-height:35px;
          text-align: center;
        }
      }
      .total-price{
        width:250px;
      }
    }
  }
  .count{
    display: flex;
    flex-direction: column;
    margin:20px 0;
    li{
      line-height:30px;
      font-size:18px;
      text-align: right;
    }
    .label{
      width:200px;
      text-align: right;
      color: #999;
      margin-right:10px;
    }
    .price{
      width:100px;
      text-align: left;
      color: #666;
    }
  }
  .next{
    display: block;
    height:auto;
    margin:20px;
    float: right;
    font-size:16px;
    color: #fff;
    background: #f56000;
    padding:16px 40px;
  }
}
</style>

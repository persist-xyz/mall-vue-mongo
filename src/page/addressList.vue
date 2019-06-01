<template>
  <div class="checkout">
    <ul class="step">
      <li class="active">
        <span>confirm address</span>
      </li>
      <li>
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
      <ul class="content">
        <li class="black2 active">
          <h5 class="font16 line-height30">朱一龙</h5>
          <p class="font14 line-height30 marginBottom10">徐汇区</p>
          <p class="font16 gray line-height30 marginTop10">15200001111</p>
          <p class="font14">
            <span class="default orange">default address</span>
            <span class="del hide">del</span>
          </p>
        </li>
        <li class="black2">
          <h5 class="font16 line-height30">朱一龙</h5>
          <p class="font14 line-height30 marginBottom10">徐汇区</p>
          <p class="font16 gray line-height30 marginTop10">15200001111</p>
          <p class="font14">
            <span class="default orange">default address</span>
            <span class="del hide">del</span>
          </p>
        </li>
        <li class="add-address gray2">
          <span class="add">+</span>
          <span>add new address</span>
        </li>
      </ul>
    </div>
    <router-link class="next" to="/viewOrder">Next</router-link>
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
      .content{
        display: flex;
        justify-content: flex-start;
        li{
          border:2px solid #eee;
          padding:15px;
          margin:10px;
          width: 300px;
          height: 160px;
          .del{
            float: right;
          }
          &:hover{
            cursor: pointer;
            background: #eeeeee75;
            .del{
              display: inline-block;
            }
          }
          &.active{
            border-color: #f56000;
          }
        }
        .add-address{
          text-align: center;
          .add{
            font-size:60px;
            display: block;
          }
        }
      }
    }
    .next{
      display: inline-block;
      float: right;
      margin:20px;
      font-size:16px;
      color: #fff;
      background: #f56000;
      padding:16px 40px;
    }
  }
</style>

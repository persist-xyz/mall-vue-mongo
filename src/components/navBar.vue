<template>
  <div class="nav">
    <div class="logo"></div>
    <div class="user" @mouseleave="showMenu = false">
      <div class="cart">
        <i class="iconfont icon-icon-test"></i>
        <span v-show="cartCount !== 0">{{cartCount}}</span>
      </div>

      <span class="name"
            @click="showLogin = true"
            v-if="!hasLogin">登陆/注册</span>

      <div v-else @mouseenter="showMenu = true">
        <span class="name">{{userName}}</span>
        <i class="iconfont icon-icon-test1"></i>
      </div>

      <div class="login-status" v-show="showMenu" @mouseleave="showMenu = false">
        <span>我的地址</span>
        <span class="login-opt" @click="loginOut">退出</span>
      </div>
    </div>

    <transition name="">
      <div class="login-dialog" v-if="showLogin">
        <div class="mask" @click="showLogin = false"></div>
        <div class="login-div text-center">
          <h2 class="marginBottom10">登陆</h2>
          <input type="text" placeholder="用户名" v-model="userName" class="username">
          <input type="password" placeholder="密码" v-model="userPwd" class="password">
          <div class="note font12 gray2 line-height30">首次登陆即注册</div>
          <div class="button" @click="toLogin">登陆</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
  },
  data () {
    return {
      showMenu: false,
      showLogin: false,
      hasLogin: false,
      cartCount: 0,
      userName: '',
      userPwd: ''
    }
  },
  mounted () {
    this.getLoginStatus()
  },
  methods: {
    toLogin () {
      this.$ajax.post('/users/login', {
        userName: this.userName,
        userPwd: this.userPwd
      }).then(res => {
        if (res.code === '0') {
          this.hasLogin = true
          this.userName = res.result.userName
          this.userPwd = res.result.userPwd
          this.cartCount = res.result.cartCount
          this.showLogin = false
        } else {
          alert(res.msg)
        }
      })
    },
    loginOut () {
      this.$ajax.post('/users/loginOut').then(res => {
        if (res.code === '0') {
          this.userName = ''
          this.userPwd = ''
          this.cartCount = 0
          this.hasLogin = false
        }
        this.showMenu = false
      })
    },
    getLoginStatus () {
      this.$ajax.get('/users/checkLogin').then(res => {
        if (res.code === '0') {
          this.userName = res.result.userName
          this.cartCount = 0
          this.hasLogin = true
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet">
.nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height:80px;
  padding: 0 120px;
  top:0;
  left:0;
  background: #fff;
  color: #5E6D82;
  font-size: 14px;
  z-index: 1000;
  background:rgba(255,255,255,1);
  box-shadow:0px 1px 4px 0px rgba(0,0,0,0.1);
  .logo{
    width:80px;
    height:80px;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    background: url("/static/image/7.jpg") no-repeat;
    background-size: contain;
  }
  .user{
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    .name{
      line-height:80px;
    }
    .icon-icon-test1{
      border: 1px solid #ccc;
      padding: 0 2px;
      background: #eeeeee7a;
    }
    .login-status{
      position: absolute;
      right:-30px;
      top: 60px;
      padding:10px;
      width:120px;
      background-color: rgba(255,255,255,0.98);
      border: 1px solid rgba(0, 0, 0, .15);
      box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
      &:after{
        position: absolute;
        left: 65%;
        margin-left: -8px;
        top: -8px;
        width: 0;
        content: ' ';
        height: 0;
        border-width: 0 8px 8px;
        border-style: solid;
        border-color: transparent transparent #fff;
      }
      &:before{
        position: absolute;
        left: 65%;
        margin-left: -10px;
        top:-10px;
        width: 0;
        content: ' ';
        height: 0;
        border-width: 0 10px 10px;
        border-style: solid;
        border-color: transparent transparent #D3DCE6;
      }
      span{
        display: block;
        line-height:26px;
        padding: 4px;
        &:hover{
          color: #008de6;
          background:rgba(239,246,254,1);
        }
      }
    }
  }
  .cart{
    position: relative;
    margin-right: 30px;
    .icon-icon-test{
      font-size: 30px;
    }
    span{
      position: absolute;
      top: -10px;
      left: 15px;
      color: #fff;
      background: #f00;
      padding: 4px 8px;
      border-radius: 20px;
    }
  }
}
.login-dialog{
  position: fixed;
  top:20%;
  left:35%;
  .login-div{
    background: #fff;
    position: fixed;
    width: 500px;
    border-radius: 10px;
    padding: 30px 0;
    input{
      display: block;
      line-height:40px;
      height:40px;
      border-radius: 10px;
      border: 1px solid #eee;
      width: 300px;
      padding: 10px;
      margin: 20px auto;
    }
    .button{
      background: #f56000;
      color: #fff;
      width:300px;
      padding:10px 0;
      text-align: center;
      border-radius: 10px;
      margin: 10px auto 30px;
    }
  }
}
.mask{
  width:100vw;
  height:100vh;
  position: fixed;
  top: 0;
  right:0;
  bottom:0;
  left:0;
  background: rgba(0, 0, 0, .3);
}
</style>

<template>
  <div class="nav">
    <div class="logo"></div>
    <div class="user" @mouseenter="showMenu = true" @mouseleave="showMenu = false">
      <div class="uesr-img"></div>
      <span class="name">username</span>
      <div class="login-status" v-show="showMenu">
        <i></i>
        <span class="login-opt">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    username: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
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
  height:60px;
  top:0;
  left:0;
  padding:0 20px;
  background: #fff;
  color: #5E6D82;
  font-size: 14px;
  z-index: 1000;
  background:rgba(255,255,255,1);
  box-shadow:0px 1px 4px 0px rgba(0,0,0,0.1);
  .logo{}
  .user{
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    .uesr-img{
      width:45px;
      height:45px;
      border-radius: 45px;
      background: url('../assets/image/logo.jpg') no-repeat center;
      -webkit-background-size: cover;
      background-size: cover;
      margin-right:10px;
    }
    .login-status{
      position: absolute;
      right:0;
      top:52px;
      padding:10px 40px;
      background-color: rgba(255,255,255,0.98);
      border: 1px solid rgba(0, 0, 0, .15);
      box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
      &:hover{
        color: #008de6;
        background:rgba(239,246,254,1);
      }
      &:after{
        position: absolute;
        left: 50%;
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
        left: 50%;
        margin-left: -10px;
        top:-10px;
        width: 0;
        content: ' ';
        width: 0;
        height: 0;
        border-width: 0 10px 10px;
        border-style: solid;
        border-color: transparent transparent #D3DCE6;
      }
    }
  }
}
</style>

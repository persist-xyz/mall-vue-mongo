<template>
  <div class="good-list">
    <ul class="filter">
      <li>0-100</li>
      <li>100-500</li>
      <li>500-1000</li>
      <li>1000-500</li>
      <li>5000以上</li>
    </ul>
    <div class="content-list">
      <good-card v-for="(item, index) in goodList" :key="index" :listCard="item"></good-card>
    </div>
  </div>
</template>

<script>
import goodCard from '@/components/goodCard'

export default {
  components: { goodCard },
  name: 'goodList',
  data () {
    return {
      goodList: [
        {
          img: require('@/assets/image/logo.jpg'),
          title: 'zhuyi龙zhuyi龙zhuyi龙',
          price: '8888'
        },
        {
          img: require('@/assets/image/logo.jpg'),
          title: 'zhuyi龙zhuyi龙zhuyi龙',
          price: '8888'
        },
        {
          img: require('@/assets/image/logo.jpg'),
          title: 'zhuyi龙zhuyi龙zhuyi龙',
          price: '8888'
        }
      ]
    }
  },
  mounted () {
    console.log(11)
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .good-list{
    min-height: 90vh;
    display: flex;
    margin-top: 70px;
    padding: 10px 20px 20px 20px;
    .filter{
      background: #E1F6E1;
      color: #A3D8A3;
      border:1px solid #A3D8A3;
      width:180px;
      height:190px;
      margin-right: 30px;
      li{
        line-height: 37px;
        padding:0 20px;
        border-bottom:1px solid #A3D8A3;
        cursor: pointer;
        &:last-child{
          border:none;
        }
        &:hover{
          font-size:16px;
        }
      }
    }
    .content-list{
      flex:1;
    }
  }
</style>

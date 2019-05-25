<template>
  <div class="good-list" ref="mainContent">
    <div class="filter">
      <div class="filter-list">
        <span>价格筛选：</span>
        <ul>
          <li v-for="(item, index) in filterList"
              :class="{'activePrice': activePriceIndex === index}"
              :key="index" @click="filterOption(item, index)">{{item.minPrice}} - {{item.maxPrice}}</li>
        </ul>
      </div>
      <div class="filter-list">
        <span>价格：</span>
        <ul>
          <li :class="{'activePrice': params.sort === 1}" @click="resetParams(), params.sort = 1, getGoodList()">升序</li>
          <li :class="{'activePrice': params.sort === -1}" @click="resetParams(), params.sort = -1, getGoodList()">降序</li>
        </ul>
      </div>
    </div>
    <div class="content-list"
         v-infinite-scroll="getGoodList"
         :infinite-scroll-disabled="busy"
         infinite-scroll-distance="10">
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
      filterList: [
        {
          minPrice: 0,
          maxPrice: 100
        },
        {
          minPrice: 100,
          maxPrice: 500
        },
        {
          minPrice: 500,
          maxPrice: 1000
        },
        {
          minPrice: 1000,
          maxPrice: 5000
        },
        {
          minPrice: 5000,
          maxPrice: 10000
        }
      ],
      goodList: [],
      activePriceIndex: 0,
      activeSortIndex: 0,
      busy: false,
      params: {
        sort: 1,
        minPrice: 0,
        maxPrice: 10000000,
        currentPage: 1,
        pageNum: 8
      }
    }
  },
  mounted () {
//    this.getGoodList()
    // document.addEventListener('scroll', this.scrollHandler, true)
  },
  methods: {
    scrollHandler () {
    //      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    //      let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
    //      let offsetHeight = this.$refs.mainContent.offsetHeight
    //      let clientHeight = document.body.clientHeight || document.documentElement.clientHeight
    //      let innerHeight = window.innerHeight
    //      console.log(`${scrollTop}`, `${scrollHeight}`, `${offsetHeight}`, `${clientHeight}`)
    //      console.log(`${scrollTop}` + `${clientHeight}`, `${scrollHeight}`, `${offsetHeight}`, `${innerHeight}`)
    },
    getGoodList () {
      this.busy = true
      this.$ajax.get('/goods', this.params).then(res => {
        this.goodList = this.goodList.concat(res.result.list)
        this.params.currentPage++
        this.busy = false
      })
    },
    // 价格过滤
    filterOption (item, index) {
      this.resetParams()
      this.activePriceIndex = index
      this.params.minPrice = (item && item.minPrice) || 0
      this.params.maxPrice = (item && item.maxPrice) || 10000000
      this.getGoodList()
    },
    resetParams () {
      this.params = {
        sort: 1,
        minPrice: 0,
        maxPrice: 10000000,
        currentPage: 1,
        pageNum: 8
      }
      this.goodList = []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .good-list{
    min-height: 90vh;
    width: 1200px;
    margin:10px auto;
    .filter{
      color: #000;
      padding: 20px;
      .filter-list{
        display: flex;
        line-height:35px;
        margin-bottom:10px;
      }
      ul{
        display: flex;
        color: #666;
        li{
          line-height: 35px;
          padding:0 20px;
          cursor: pointer;
          &:hover{
            color: #f56000;
            background: #ebeeef;
          }
          &.activePrice{
            color: #fff;
            background: #f56000;
            margin: 0 10px;
            border-radius: 20px;
          }
        }
      }
    }

    .content-list{
    }
  }
</style>

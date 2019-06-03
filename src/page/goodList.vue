<template>
  <div class="good-list" ref="mainContent">
    <div class="filter">
      <div class="filter-list">
        <span>价格筛选：</span>
        <ul>
          <li v-for="(item, index) in filterList"
              :class="{'activePrice': activePriceIndex === index}"
              :key="index" @click="filterOption(item, index)">
            <span v-if="item.minPrice === ''"> All </span>
            <span v-else-if="item.minPrice !== '' && item.maxPrice === ''">{{item.minPrice}} 以上</span>
            <span v-else>{{item.minPrice}} - {{item.maxPrice}}</span>
          </li>
        </ul>
      </div>
      <div class="filter-list">
        <span>价格：</span>
        <ul>
          <li :class="{'activePrice': params.sort === ''}" @click="resetParams(), params.sort = '', getGoodList()">DEFAULT</li>
          <li :class="{'activePrice': params.sort === 1}" @click="resetParams(), params.sort = 1, getGoodList()">升序</li>
          <li :class="{'activePrice': params.sort === -1}" @click="resetParams(), params.sort = -1, getGoodList()">降序</li>
        </ul>
      </div>
    </div>
    <div v-infinite-scroll="getGoodList"
         infinite-scroll-disabled="busy"
         class="content-list"
         infinite-scroll-distance="10">
      <div v-if="isEmpty" class="text-center font14 gray2 marginTop10">空空空如也～</div>
      <good-card v-for="(item, index) in goodList"
                 :key="index"
                 @addToCart="addCart"
                 :listCard="item"></good-card>
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
          minPrice: '',
          maxPrice: ''
        },
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
          maxPrice: ''
        }
      ],
      goodList: [],
      activePriceIndex: 0,
      activeSortIndex: 0,
      isEmpty: false,
      busy: false,
      params: {
        sort: '',
        minPrice: '',
        maxPrice: '',
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
    addCart (productId) {
      this.$ajax.post('/goods/addCart', {
        productId: productId
      }).then(res => {
        this.$store.commit('UPDATE_CART_COUNT', 1)
      })
    },
    getGoodList () {
      this.$ajax.get('/goods/list', this.params).then(res => {
        if (res.code === '0') {
          this.goodList = this.goodList.concat(res.result.list)
          this.params.currentPage++
          this.isEmpty = this.goodList.length === 0 ? 1 : 0
          this.busy = res.result.count < this.params.pageNum ? 1 : 0
        } else {
          this.busy = true
          alert(res.msg)
        }
      })
    },
    // 价格过滤
    filterOption (item, index) {
      this.resetParams()
      this.activePriceIndex = index
      this.params.minPrice = item.minPrice
      this.params.maxPrice = item.maxPrice
      this.getGoodList()
    },
    resetParams () {
      this.params.currentPage = 1
      this.params.pageNum = 8
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
            border-radius: 20px;
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
  }
</style>

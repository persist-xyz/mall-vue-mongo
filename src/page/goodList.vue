<template>
  <div class="good-list" ref="mainContent">
    <div class="filter">
      <div class="filter-list">
        <span>价格筛选：</span>
        <ul>
          <li v-for="(item, index) in filterList"
              :key="index" @click="filterOption(item)">{{item.minPrice}} - {{item.maxPrice}}</li>
        </ul>
      </div>
      <div class="filter-list">
        <span>价格：</span>
        <ul class="sort">
          <li @click="params.sort = 1, getGoodList()">升序</li>
          <li @click="params.sort = -1, getGoodList()">降序</li>
        </ul>
      </div>
    </div>
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
          maxPrice: 1000000
        }
      ],
      goodList: [],
      params: {
        sort: 1,
        minPrice: 0,
        maxPrice: 10000000,
        currentPage: 1,
        pageNum: 20
      }
    }
  },
  mounted () {
    this.getGoodList()
    document.addEventListener('scroll', this.scrollHandler, true)
  },
  methods: {
    scrollHandler () {
      let scrollTop = this.$refs.mainContent.scrollTop
      console.log(`${scrollTop}`)
    },
    getGoodList () {
      this.$ajax.get('/goods', this.params).then(res => {
        this.goodList = res.result.list
      })
    },
    // 价格过滤
    filterOption (item) {
      this.params.minPrice = (item && item.minPrice) || 0
      this.params.maxPrice = (item && item.maxPrice) || 10000000
      this.getGoodList()
    },
    // 升序
    ascending () {
      this.params.sort = 1
      this.getGoodList()
    },
    // 降序
    descending () {
      this.params.sort = -1
      this.getGoodList()
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
          line-height: 37px;
          padding:0 20px;
          cursor: pointer;
          &:hover{
            color: #f56000;
            background: #ebeeef;
          }
        }
      }
      .sort{
        li{

        }
      }
    }
    .content-list{
    }
  }
</style>

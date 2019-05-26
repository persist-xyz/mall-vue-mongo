let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')

let Goods = require('../modules/goods')

mongoose.connect('mongodb://localhost:27017/mall', {useNewUrlParser: true})

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected succ')
})

mongoose.connection.on('error', () => {
  console.log('MongoDB connected error')
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connected disconnected')
})

/**
 * 商品列表
 * 升降序 分页 价格筛选
 * params 升序/降序 当前页数 每页条数
 */
router.get('/goods', (req, res, next) => {
  // 获取请求参数
  let {sort, currentPage, pageNum, minPrice, maxPrice} = req.query
  minPrice = minPrice === '' ? '' : parseInt(minPrice)
  maxPrice = maxPrice === '' ? '' : parseInt(maxPrice)
  pageNum = parseInt(pageNum)
  currentPage = parseInt(currentPage)
  let salePriceCheck = {}
  // 价格过滤
  if (minPrice !== '' || maxPrice !== '') {
    console.log(typeof minPrice, minPrice, maxPrice)
    // 区间
    if (maxPrice !== '') {
      salePriceCheck = {
        salePrice: {
          $gt: minPrice,
          $lte: maxPrice
        }
      }
    } else {
      console.log('----', minPrice, maxPrice)
      // 以上
      salePriceCheck = {
        salePrice: {
          $gt: minPrice
        }
      }
    }
  }
  // 分页
  let skip = pageNum * (currentPage - 1)
  // 得到查询模型
  let GoodsModel = Goods.find(salePriceCheck).skip(skip).limit(pageNum)
  // 价格排序
  if (sort !== '') {
    GoodsModel.sort({'salePrice': sort})
  }
  // 执行
  GoodsModel.exec({}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '200',
        msg: 'success',
        result: {
          list: doc,
          count: doc.length
        }
      })
    }
  })
})

module.exports = router

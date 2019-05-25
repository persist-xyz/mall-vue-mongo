let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')

let Good = require('../modules/goods')

mongoose.connect('mongodb://localhost:27017/mall')

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
  // 得到查询模型
  let GoodsModel = Good.find({salePrice: {$gte: Number(minPrice), $lte: Number(maxPrice)}}, null, {limit: Number(pageNum), skip: Number(pageNum) * (Number(currentPage) - 1)})
  // 根据价格排序
  GoodsModel.sort({'salePrice': sort})
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

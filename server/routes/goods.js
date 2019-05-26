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

// const errorHandle = () => {}

/**
 * 商品列表
 * 升降序 分页 价格筛选
 * params 升序/降序 当前页数 每页条数
 */
router.get('/list', (req, res, next) => {
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
        code: '1',
        msg: err.message
      })
    } else {
      res.json({
        code: '0',
        msg: 'success',
        result: {
          list: doc,
          count: doc.length
        }
      })
    }
  })
})

/**
 * 加入购物车
 * 1、查找该用户信息
 * 2、查找该商品信息
 * 3、获取该用户下的购物车中是否有该件商品
 * 4、改变购物车字段
 * 5、更新数据库
 */
router.post('/addCart', (req, res, next) => {
  const {productId} = req.body
  let User = require('../modules/users')
  // 1、查找该用户 userId: userId
  let userId = '100000077'
  User.findOne({userId: userId}, (err, userDao) => {
    if (err) {
      res.json({
        code: '1',
        msg: err.message
      })
    } else {
      // 2、查找该商品信息
      Goods.findOne({productId: productId}, (err2, goodDao) => {
        if (err2) {
          res.json({
            code: '1',
            msg: err2.message
          })
        } else {
          let hasThisGood = false
          // 3、获取该用户下的购物车中是否有该件商品
          userDao.cartList.map(list => {
            if (list.productId === productId) {
              list.productNum++
              hasThisGood = true
            }
          })
          // 获得的单条商品信息
          if (goodDao) {
            if (hasThisGood) {
              // 直接保存
              userDao.save((err3, doc1) => {
                if (err3) {
                  res.json({
                    code: '1',
                    msg: err3.message
                  })
                } else {
                  res.json({
                    code: '0',
                    msg: 'success'
                  })
                }
              })
            } else {
              // 更新购物车商品数量
              goodDao.productNum = 1
              goodDao.checked = 1
              // 更新用户表购物车
              userDao.cartList.push(goodDao)
              // 更新数据库
              userDao.save((err4, doc2) => {
                if (err4) {
                  res.json({
                    code: '1',
                    msg: err4.message
                  })
                } else {
                  res.json({
                    code: '0',
                    msg: 'success'
                  })
                }
              })
            }
          }
        }
      })
    }
  })
})

module.exports = router

let express = require('express')
let router = express.Router()

let User = require('../modules/users')
/**
 * login
 * username
 * password
 */
router.post('/login', (req, res, next) => {
  let {userName, userPwd} = req.body
  console.log('Cookies: ', req.cookies)
  User.findOne({userName: userName}, (err, userDao) => {
    if (err) {
      res.json({
        code: '1',
        msg: err.message
      })
    } else {
      // 数据库已存在这个用户
      if (userDao) {
        // 若密码不一致
        if (userDao.userPwd !== userPwd) {
          res.json({
            code: '1',
            msg: 'password is err'
          })
        } else {
          res.cookie('userId', userDao.userId, {
            path: '/',
            maxAge: 60 * 60 * 1000
          })
          res.cookie('userName', userDao.userName, {
            path: '/',
            maxAge: 60 * 60 * 1000
          })
          // req.session.user = userDao
          res.json({
            code: '0',
            msg: 'login succ',
            result: {
              userName: userDao.userName,
              userPwd: userDao.userPwd,
              cartCount: userDao.cartList.length
            }
          })
        }
      } else {
        console.log('reg---')
        res.json({
          code: '1',
          msg: 'no this user'
        })
        // TODO 注册
        // let _userDao = {
        //   userName,
        //   userPwd
        // }
        // _userDao.save((err2, doc) => {
        //   if (err2) {
        //     res.json({
        //       code: '1',
        //       result: {
        //         msg: err2.message
        //       }
        //     })
        //   } else {
        //     res.json({
        //       code: '0',
        //       result: {
        //         msg: 'register succ'
        //       }
        //     })
        //   }
        // })
      }
    }
  })
})

/**
 * 登出
 */
router.post('/loginOut', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    code: '0',
    msg: 'succ',
    result: {}
  })
})

/**
 * 检查登陆状态
 * 10001: 未登陆
 */
router.get('/checkLogin', (req, res, next) => {
  if (req.cookies.userId) {
    res.json({
      code: '0',
      msg: 'succ',
      result: {
        userId: req.cookies.userId,
        userName: req.cookies.userName
      }
    })
  } else {
    res.json({
      code: '10001',
      msg: 'no login',
      result: {}
    })
  }
})

/**
 * 购物车列表
 */
router.get('/cartList', (req, res, next) => {
  const userId = req.cookies.userId
  User.findOne({userId: userId}, (err, userDao) => {
    if (err) {
      res.json({
        code: '1',
        msg: err.message,
        result: {}
      })
    } else {
      res.json({
        code: '0',
        msg: 'succ',
        result: {
          cartList: userDao.cartList
        }
      })
    }
  })
})

/**
 * 删除购物车
 */
router.post('/delCart', (req, res, next) => {
  const productId = req.body.productId
  const userId = req.cookies.userId
  User.update({userId: userId}, {
    $pull: {
      'cartList': {
        productId: productId
      }
    }
  }, (err, userDao) => {
    if (err) {
      res.json({
        code: '1',
        message: err.message,
        result: {}
      })
    } else {
      res.json({
        code: '0',
        message: 'succ',
        result: {}
      })
    }
  })
})

/**
 * 更新购物车
 */
router.post('/updateCart', (req, res, next) => {
  const userId = req.cookies.userId
  const {productId, productNum, checked} = req.body
  User.update(
    {userId: userId, 'cartList.productId': productId}, {
      'cartList.$.productNum': productNum,
      'cartList.$.checked': checked
    }, (err, userDao) => {
      if (err) {
        res.json({
          code: '1',
          message: err.message,
          result: {}
        })
      } else {
        res.json({
          code: '0',
          message: 'succ',
          result: {}
        })
      }
    })
})
/**
 * 获取收货地址
 */
router.get('/getAddressList', (req, res, next) => {
  const userId = req.cookies.userId
  User.findOne({userId: userId}, (err, userDao) => {
    if (err) {
      res.json({
        code: '1',
        message: err.message,
        result: {}
      })
    } else {
      res.json({
        code: '0',
        message: 'succ',
        result: {
          addressList: userDao.addressList
        }
      })
    }
  })
})

/**
 * 删除地址
 */
router.post('/delThisAddress', (req, res, next) => {
  const userId = req.cookies.userId
  const addressId = req.body.addressId
  User.update({userId: userId}, {
    $pull: {
      'addressList': {
        addressId: addressId
      }
    }
  }, (err, userDao) => {
    if (err) {
      res.json({
        code: '1',
        message: err.message,
        result: {}
      })
    } else {
      res.json({
        code: '0',
        message: 'succ',
        result: {}
      })
    }
  })
})

/**
 * 设置默认地址
 */
router.post('/editDefaultAddress', (req, res, next) => {
  const userId = req.cookies.userId
  const addressId = req.body.addressId
  if (!addressId) {
    res.json({
      code: '1',
      message: 'addressId is empty',
      result: {}
    })
    return
  }
  User.findOne({userId: userId}, (err, userDao) => {
    if (err) {
      res.json({
        code: '1',
        message: err.message,
        result: {}
      })
    } else {
      let addressList = userDao.addressList
      addressList.map(list => {
        if (list.addressId === addressId) {
          list.isDefault = true
        } else {
          list.isDefault = false
        }
      })
      userDao.save((err, dao) => {
        if (err) {
          res.json({
            code: '1',
            message: err.message,
            result: {}
          })
        } else {
          res.json({
            code: '0',
            message: 'succ',
            result: {}
          })
        }
      })
    }
  })
})
/**
 * 预览 订单列表
 */
router.get('/getOrderList', (req, res, next) => {
  const userId = req.cookies.userId
  User.findOne({userId: userId}, (err, userDao) => {
    if (err) {
      res.json({
        code: '1',
        message: err.message,
        result: {}
      })
    } else {
      let orderList = []
      userDao.cartList.map(list => {
        if (list.checked === '1') {
          orderList.push(list)
        }
      })
      res.json({
        code: '0',
        message: 'succ',
        result: {
          orderList: orderList
        }
      })
    }
  })
})

/**
 * 创建订单
 */
router.post('/payment', (req, res, next) => {
  const userId = req.cookies.userId
  const {addressId, totalPrice} = req.body
  User.findOne({userId: userId}, (err, userDao) => {
    if (err) {
      res.json({
        code: '1',
        message: err.message,
        result: {}
      })
    } else {
      // 获取地址信息
      let orderInfo = {
        addressInfo: {},
        goodsList: [],
        orderTotal: '',
        orderStatus: '',
        orderId: '',
        createTime: ''
      }
      userDao.addressList.map(list => {
        if (list.addressId === addressId) {
          orderInfo.addressInfo = list
        }
      })
      orderInfo.orderTotal = totalPrice
      orderInfo.orderStatus = '1'
      // 获取订单信息
      userDao.cartList.map(list => {
        if (list.checked === '1') {
          orderInfo.goodsList.push(list)
        }
      })
      // 创建订单ID 创建时间
      const random1 = Math.floor(Math.random() * 10)
      const random2 = Math.floor(Math.random() * 10)
      const nowDate = new Date() // .format('YY-MM-DD HH:MM:SS')
      orderInfo.orderId = 'XYZ' + random1 + nowDate + random2
      orderInfo.createTime = nowDate
      userDao.orderList.push(orderInfo)
      userDao.save((err2, doc) => {
        if (err2) {
          res.json({
            code: '1',
            message: err.message,
            result: {}
          })
        } else {
          res.json({
            code: '0',
            message: 'succ',
            result: {
              orderId: orderInfo.orderId,
              orderTotal: orderInfo.orderTotal
            }
          })
        }
      })
    }
  })
})

/**
 * 获取订单详情
 */
router.get('/getOrderdetail', (req, res, next) => {
  const userId = req.cookies.userId
  const orderId = req.query.orderId
  User.findOne({userId: userId}, (err, userDao) => {
    if (err) {
      res.json({
        code: '1',
        message: err.message,
        result: {}
      })
    } else {
      let orderInfo = {}
      userDao.orderList.map(list => {
        if (list.orderId === orderId) {
          orderInfo = list
        }
      })
      res.json({
        code: '0',
        message: 'succ',
        result: {
          orderInfo: orderInfo
        }
      })
    }
  })
})
module.exports = router

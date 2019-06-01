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
      console.log(userDao)
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
    {userId: userId, 'cartList.productId': productId},
    {'cartList.$.productNum': productNum},
    {'cartList.$.checked': checked}, (err, userDao) => {
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
 * 预览 订单列表
 */
router.get('/getOrderList', (req, res, next) => {
  const userId = req.cookies.userId
  const orderId = '6224201705302250301' // req.body.orderId
  User.findOne({userId: userId}, (err, userDao) => {
    if (err) {
      res.json({
        code: '1',
        message: err.message,
        result: {}
      })
    } else {
      let orderList = []
      userDao.orderList.map(list => {
        if (list.orderId === orderId) {
          orderList = list
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
module.exports = router

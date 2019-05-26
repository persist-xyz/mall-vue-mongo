const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  'userId': String,
  'userName': String,
  'userPwd': String,
  'orderList': Array,
  'cartList': [
    {
      'productId': String,
      'productImage': String,
      'salePrice': String,
      'productName': String,
      'productNum': String,
      'checked': String
    }
  ],
  'addressList': Array
})

// User 对应数据库中 Users，若数据库中集合字段不是复述，则应加第三个参数 指定数据库集合名字
module.exports = mongoose.model('User', UserSchema)

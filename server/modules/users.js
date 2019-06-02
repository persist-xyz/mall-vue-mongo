const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  'userId': String,
  'userName': String,
  'userPwd': String,
  'orderList': [
    {
      'orderId': String,
      'orderTotal': Number,
      'addressInfo': {
        'addressId': String,
        'userName': String,
        'streetName': String,
        'postCode': String,
        'tel': String,
        'isDefault': Boolean
      },
      'goodsList': [
        {
          'productId': String,
          'productImage': String,
          'salePrice': String,
          'productName': String,
          'productNum': String,
          'checked': String
        }
      ]
    }
  ],
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
  'addressList': [
    {
      'addressId': String,
      'userName': String,
      'streetName': String,
      'postCode': String,
      'tel': String,
      'isDefault': Boolean
    }
  ]
})

// User 对应数据库中 Users，若数据库中集合字段不是复述，则应加第三个参数 指定数据库集合名字
module.exports = mongoose.model('User', UserSchema)

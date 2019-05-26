const mongoose = require('mongoose')

// 商品模型
const productSchema = new mongoose.Schema({
  'productId': {type: String},
  'produceName': {type: String},
  'salePrice': {type: Number},
  'productUrl': {type: String},
  'productNum': {type: Number},
  'checked': {type: String},
  'productImage': {type: String}
})

module.exports = mongoose.model('Good', productSchema)

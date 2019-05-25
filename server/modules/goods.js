const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 商品模型
let productSchema = new Schema({
  'productId': {type: String},
  'produceName': {type: String},
  'salePrice': {type: Number},
  'productUrl': {type: String},
  'productImage': {type: String}
})

module.exports = mongoose.model('Good', productSchema)

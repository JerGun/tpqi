const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: String,
    picture: String,
    category: String,
    productDescription: String,
    price: String,
    quantityStock: String,
  },
  { timestamps: false, versionKey: false }
);

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;

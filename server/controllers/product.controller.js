const ProductModel = require("../models/product.model");

exports.findAll = (req, res) => {
  ProductModel.find()
    .then((products) => res.json(products))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findById = (req, res) => {
  const id = req.query.id;
  ProductModel.findOne({ _id: id })
    .then((product) => res.json(product))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.add = (req, res) => {
  const payload = req.body;
  const product = new ProductModel(payload);
  product
    .save()
    .then(res.status(201).end())
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.edit = (req, res) => {
  const payload = req.body;
  ProductModel.findOneAndUpdate({ _id: payload.productId }, { $set: payload })
    .then(res.status(200).end())
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.delete = (req, res) => {
  const id = req.query.id;
  ProductModel.findByIdAndDelete(id)
    .then(res.status(200).end())
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.search = (req, res) => {
  const keyword = req.query.keyword;
  ProductModel.find({
    $or: [
      { productName: { $regex: keyword } },
      { category: { $regex: keyword } },
      { productDescription: { $regex: keyword } },
      { price: { $regex: keyword } },
      { quantityStock: { $regex: keyword } },
    ],
  })
    .then((products) => res.json(products))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

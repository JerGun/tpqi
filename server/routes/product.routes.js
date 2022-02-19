const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/products", productController.findAll);
router.get("/product", productController.findById);
router.post("/product", productController.add);
router.put("/product", productController.edit);
router.delete("/product", productController.delete);
router.get("/search", productController.search);

module.exports = router;

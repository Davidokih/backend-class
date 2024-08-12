const express = require("express");

// controller

const { getProducts, createProduct, getProductById, deleteProduct, updateProduct } = require("../controller/productController");
const auth = require('../utils/auth');

const router = express.Router();

router
    .route("/")
    .get(getProducts)
    .post(auth, createProduct);

router
    .route("/:id")
    .get(getProductById)
    .delete(deleteProduct)
    .put(updateProduct);

module.exports = router;
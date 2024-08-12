const Product = require("../model/productModel");
const userModel = require('../model/userModel');

// get all Products

const getProducts = async (req, res) => {
    try {
        const productCall = await Product.find();
        console.log(productCall);
        res.status(200).json({
            success: true,
            data: productCall
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// create a new product

const createProduct = async (req, res) => {
    const { name, price, category, inStock, manufacturerName, address, specifications } = req.body;
    const id = req.user._id;

    const user = await userModel.findById(id);

    if (!user) return res.status(404).json({ message: "User does not exist" });

    const product = new Product({
        name,
        price,
        category,
        inStock,
        manufacturerName,
        address,
        specifications
    });

    try {
        const newProduct = await product.save();
        res.status(201).json({
            success: true,
            result: newProduct
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// delete product
const deleteProduct = async (req, res) => {
    try {
        const delProduct = await Product.findByIdAndDelete(req.params.id);
        if (!delProduct) {
            res.status(404).json({
                message: "Product not found"
            });
        } else {
            res.json({
                success: true,
                message: "Product deleted successfully"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

const updateProduct = async (req, res) => {
    const { name, price, category, inStock, manufacturerName, address, Specifications } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: {
                name, price, category, inStock, manufacturerName, address, Specifications
            },
            $push: {
                Specifications: {
                    $each: Specifications
                }
            }
        }, { new: true, runValidators: true }
        );
        if (updatedProduct) {
            res.status(200).json({
                success: true,
                message: updatedProduct
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// get product by id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json({
                success: true,
                result: product
            });
        } else {
            res.status(404).json({
                success: false,
                error: err.message
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

module.exports = { getProducts, createProduct, getProductById, deleteProduct, updateProduct };
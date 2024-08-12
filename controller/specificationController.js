const specificationModel = require('../model/specificationModel');
const productModel = require('../model/productModel');
const mongoose = require('mongoose');

const createSpecification = async (req, res) => {
    try {
        const { value, color, height, weight } = req.body;
        const product = await productModel.findById(req.params.productId);

        if (!product) return res.status(404).json({ message: "Product does not exist" });

        const create = new specificationModel({
            value, color, height, weight
        });

        create.product = product._id;
        create.save();

        product.specifications.push(new mongoose.Types.ObjectId(create._id));
        product.save();

        res.status(201).json({
            status: "Successful",
            data: create
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

module.exports = { createSpecification };
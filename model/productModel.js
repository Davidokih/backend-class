const { default: mongoose } = require("mongoose");

const addressSchema = new mongoose.Schema({
    state: String,
    city: String,
    street: String
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Name must be filled" ]
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: false,
        required: true
    },
    manufacturerName: {
        type: String,
        required: true
    },
    address: addressSchema,
    specifications: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specifications"
    } ]
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
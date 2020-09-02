const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Product Model
const productSchema = new Schema(
    {
        productName: { type: String, required: true, trim: true },
        productDescription: { type: String, required: true, trim: true },
        productQnt: { type: Number, required: true, trim: true },
        userId: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

//Export Product
module.exports = Product;
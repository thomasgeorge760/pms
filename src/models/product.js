const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    variants: [
        {
            ram: { type: String },
            price: { type: Number },
            qty: { type: Number },
        },
    ],
    image: { type: String },  // Image URL from Cloudinary
});

module.exports = mongoose.model('Product', productSchema);

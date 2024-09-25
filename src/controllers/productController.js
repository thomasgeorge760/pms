const Product = require('../models/product');

exports.addProduct = async (req, res) => {
    const { name, description, price, category, subCategory, variants } = req.body;

    // Check if an image was uploaded
    let imageUrl = null;
    if (req.file) {
        imageUrl = req.file.path;
    }

    const product = new Product({
        name,
        description,
        price,
        category,
        subCategory,
        variants,
        image: imageUrl,  // Add the image URL
    });

    await product.save();
    res.status(201).json(product);
};

exports.getProducts = async (req, res) => {
    const products = await Product.find().populate(['category', 'subCategory']);
    res.json(products);
};

exports.getOneProduct = async (req, res) => {
    const product = await Product.findById(req.params.id).populate(['category', 'subCategory']);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
}

exports.editProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const { name, subCategory, variants } = req.body;
    product.name = name || product.name;
    product.subCategory = subCategory || product.subCategory;
    product.variants = variants || product.variants;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
};

exports.searchProducts = async (req, res) => {
    const { name, subCategoryId, page = 1, limit = 10 } = req.query;

    const query = {};

    if (name) {
        query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }

    if (subCategoryId) {
        query.subCategory = subCategoryId;
    }

    const products = await Product.find(query)
        .populate('subCategory')
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
        products,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    });
};

exports.deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();//hard delete, need to add isDeleted field for soft delete
    res.json({ message: 'Product removed' });
}


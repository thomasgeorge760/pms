
const User = require('../models/User');
const Product = require('../models/product');

// Add product to Wishlist
exports.addToWishlist = async (req, res) => {
    const user = await User.findById(req.user.id);
    const product = await Product.findById(req.params.productId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    if (user.wishlist.includes(product._id)) {
        return res.status(400).json({ message: 'Product already in wishlist' });
    }

    user.wishlist.push(product._id);
    await user.save();
    res.json({ message: 'Product added to wishlist' });
};

// Get User's Wishlist
exports.getWishlist = async (req, res) => {
    const user = await User.findById(req.user.id).populate('wishlist');
    res.json(user.wishlist);
};

// Remove product from Wishlist
exports.removeFromWishlist = async (req, res) => {
    const user = await User.findById(req.user.id);
    const productIndex = user.wishlist.indexOf(req.params.productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not in wishlist' });
    }

    user.wishlist.splice(productIndex, 1);
    await user.save();
    res.json({ message: 'Product removed from wishlist' });
};

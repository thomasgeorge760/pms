const express = require('express');
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/wishlist/{productId}:
 *   post:
 *     summary: Add a product to the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to add to the wishlist
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product added to wishlist
 *       400:
 *         description: Product already in wishlist or invalid product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.post('/:productId', authMiddleware, addToWishlist);


/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's wishlist retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware, getWishlist);

/**
 * @swagger
 * /api/wishlist/{productId}:
 *   delete:
 *     summary: Remove a product from the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to remove from the wishlist
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *       404:
 *         description: Product not found in wishlist
 *       500:
 *         description: Internal server error
 */
router.delete('/:productId', authMiddleware, removeFromWishlist);

module.exports = router;

const express = require('express');
const { addProduct, getProducts, searchProducts, editProduct, deleteProduct, getOneProduct } = require('../controllers/productController');
const upload = require('../middleware/multer');  // Import multer middleware for file uploads
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleValidation, Roles } = require('../enums/role');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware, roleValidation(Roles.ADMIN), upload.single('image'), addProduct);  // Use multer to handle file upload

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: An array of products
 *       500:
 *         description: Internal server error
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getOneProduct);

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search for products
 *     tags: [Products]
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Name of the product to search
 *         required: false
 *         schema:
 *           type: string
 *       - name: subCategoryId
 *         in: query
 *         description: ID of the sub-category to filter products
 *         required: false
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of products per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: A list of products matching the search criteria
 *       500:
 *         description: Internal server error
 */
router.get('/search', searchProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Edit an existing product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to edit
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             subCategory:
 *               type: string
 *             variants:
 *               type: array
 *               items:
 *                 type: object
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authMiddleware, roleValidation(Roles.ADMIN), upload.single('image'), editProduct);  // For editing product with image

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authMiddleware, roleValidation(Roles.ADMIN), deleteProduct); //For deleting product with id

module.exports = router;

const express = require('express');
const { addCategory, addSubCategory, getCategoriesWithSubCategories, getSubCategories, updateCategory, updateSubCategory, deleteCategory, deleteSubCategory } = require('../controllers/categoryController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleValidation, Roles } = require('../enums/role');
const router = express.Router();

router.get('/', getCategoriesWithSubCategories);


router.get('/subcategories', getSubCategories)

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Add a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Category already exists or validation error
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware, roleValidation(Roles.ADMIN), addCategory);

/**
 * @swagger
 * /api/category/subcategory:
 *   post:
 *     summary: Add a new subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the subcategory
 *                 example: Mobile Phones
 *               categoryId:
 *                 type: string
 *                 description: The ID of the parent category
 *                 example: 60d21b4667d0d8992e610c85
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *       400:
 *         description: Validation error or subcategory already exists
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.post('/subcategory', authMiddleware, roleValidation(Roles.ADMIN), addSubCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: Electronics
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authMiddleware, roleValidation(Roles.ADMIN), updateCategory);

/**
 * @swagger
 * /api/category/subcategory/{id}:
 *   put:
 *     summary: Update a subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subcategory
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the subcategory
 *                 example: Mobile Phones
 *               categoryId:
 *                 type: string
 *                 description: The ID of the parent category
 *                 example: 60d21b4667d0d8992e610c85
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */
router.put('/subcategory/:id', authMiddleware, roleValidation(Roles.ADMIN), updateSubCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authMiddleware, roleValidation(Roles.ADMIN), deleteCategory);

/**
 * @swagger
 * /api/category/subcategory/{id}:
 *   delete:
 *     summary: Delete a subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subcategory
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */
router.delete('/subcategory/:id', authMiddleware, roleValidation(Roles.ADMIN), deleteSubCategory);



module.exports = router;

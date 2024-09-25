const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

// Add a Category
exports.addCategory = async (req, res) => {
    const { name } = req.body;

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
        return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({ name });
    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
};

// Add a SubCategory
exports.addSubCategory = async (req, res) => {
    const { name, categoryId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }

    const subCategory = new SubCategory({ name, category: categoryId });
    const createdSubCategory = await subCategory.save();
    res.status(201).json(createdSubCategory);
};

// Get All Categories with SubCategories
exports.getCategoriesWithSubCategories = async (req, res) => {
    const categories = await Category.find().populate('subCategories');
    res.json(categories);
};

// Get All SubCategories
exports.getSubCategories = async (req, res) => {
    const categories = await SubCategory.find();
    res.json(categories);
};

exports.updateCategory = async (req, res) => {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
}

exports.deleteCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }

    await category.remove();
    res.json({ message: 'Category removed' });
}

exports.updateSubCategory = async (req, res) => {
    const { name } = req.body;
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
        return res.status(404).json({ message: 'SubCategory not found' });
    }

    subCategory.name = name;
    const updatedSubCategory = await subCategory.save();
    res.json(updatedSubCategory);
}

exports.deleteSubCategory = async (req, res) => {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
        return res.status(404).json({ message: 'SubCategory not found' });
    }

    await subCategory.remove();
    res.json({ message: 'SubCategory removed' });
}
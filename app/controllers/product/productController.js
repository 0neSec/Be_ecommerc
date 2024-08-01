const Product = require('../../models/ProductModel');
const Category = require('../../models/categoryModel');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category', 'name');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, stock, imageUrl } = req.body;

    // Validate if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category: categoryId,
      stock,
      imageUrl
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, stock, imageUrl } = req.body;

    // Validate if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category: categoryId, stock, imageUrl },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get products by category name
exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    
    // Find the category by name
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    const products = await Product.find({ category: category._id }).populate('category', 'name');
    
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  

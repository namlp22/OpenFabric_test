const Product = require("../models/product");

exports.get_product_list = async (req, res) => {
  try {
    const page = parseInt(req.body.page) || 1;
    const perPage = parseInt(req.body.perPage) || 10;

    const count = await Product.countDocuments();
    const totalPages = Math.ceil(count / perPage);

    const products = await Product.find()
      .sort({ createdTime: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json({
      page: page,
      totalPages: totalPages,
      products: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get_product_detail = async (req, res) => {
  try {
    const productId = req.body.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({
      product: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create_product_detail = async (req, res) => {
  try {
    const { name, price } = req.body;

    const newProduct = new Product({ name, price });
    const createdProduct = await newProduct.save();
    res.json({
      message: "Product created successfully",
      createdProduct: createdProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update_product_detail = async (req, res) => {
  try {
    const { productId, name, price } = req.body;

    const product = await Product.findByIdAndUpdate(
      productId,
      { name, price },
      {
        new: true,
      }
    );
    if (!product) {
      throw new Error("Product not found");
    }
    res.json({
      updatedProduct: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.delete_product_detail = async (req, res) => {
  try {
    const { productId } = req.body;

    // Find and delete the product
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // Check if the product was found and deleted
    if (!deletedProduct) {
      throw new Error("Product not found");
    }

    res.json({
      message: "Product deleted successfully",
      deletedProduct: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

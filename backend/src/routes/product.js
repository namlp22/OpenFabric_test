const express = require("express");
const productRouter = express.Router();
const product_controller = require("../controllers/productController");

const { authenticateJWT } = require("./auth");

// Get Product List
productRouter.post("/get-product-list", async (req, res) => {
  product_controller.get_product_list(req, res);
});

// Get Product Detail
productRouter.post("/get-product-detail", async (req, res) => {
  product_controller.get_product_detail(req, res);
});

// Create Product
productRouter.post("/create-product",authenticateJWT, async (req, res) => {
  product_controller.create_product_detail(req, res);
});

// Update Product
productRouter.patch("/update-product",authenticateJWT, async (req, res) => {
  product_controller.update_product_detail(req, res);
});

// Delete Product
productRouter.post("/delete-product",authenticateJWT, async (req, res) => {
  product_controller.delete_product_detail(req, res);
});

module.exports = {
  productRouter,
};
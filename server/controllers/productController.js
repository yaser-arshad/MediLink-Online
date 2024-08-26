import Product from "../models/productModal.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
});

const getProductById = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch product", error: error.message });
    }
});


const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, quantity, image } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      image,
    });
    // Save the new product to the database
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct); // Send the saved product as response
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add product", error: error.message });
  }
});

const editProduct = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
});

export {getProducts, addProduct,editProduct,deleteProduct,getProductById };

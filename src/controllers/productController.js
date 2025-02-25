import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})
export const createProducts = asyncHandler(async (req, res) => {
  const { category, name, location,description,contact,website,image ,} = req.body;

  const userExists = await Product.findOne({ name });
  if (userExists) {
    res.status(400);
    throw new Error("Product already exists");
  }

  const product = await Product.create({ category, name, location,description,contact,website,image,user:req.user.name});
  if (product) {
    res.status(201).json({ message: "Product added successfully" });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
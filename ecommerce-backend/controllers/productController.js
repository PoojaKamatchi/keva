import Product from "../models/productModel.js";
import mongoose from "mongoose";

/* 🔧 COMMON FORMATTER */
const normalizeProduct = (p, req) => ({
  ...p._doc,
  description: {
    en: p.description?.en || p.description?.ta || "",
    ta: p.description?.ta || p.description?.en || "",
  },
  image: p.image?.startsWith("http")
    ? p.image
    : `${req.protocol}://${req.get("host")}${p.image}`,
});

/* 🛍️ GET ALL PRODUCTS */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products.map(p => normalizeProduct(p, req)));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* 📦 GET PRODUCTS BY CATEGORY */
export const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid category ID" });

    const products = await Product.find({ category: id })
      .populate("category", "name");

    res.json(products.map(p => normalizeProduct(p, req)));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products by category" });
  }
};

/* 🧾 GET SINGLE PRODUCT */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name");

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(normalizeProduct(product, req));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

/* 🔍 SEARCH */
export const searchProducts = async (req, res) => {
  try {
    const query = req.query.query || "";
    if (!query) return res.json([]);

    const products = await Product.find({
      $or: [
        { "name.en": { $regex: query, $options: "i" } },
        { "name.ta": { $regex: query, $options: "i" } },
      ],
    }).populate("category", "name");

    res.json(products.map(p => normalizeProduct(p, req)));
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};

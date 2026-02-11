import Product from "../models/productModel.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

/* =====================================================
   🛒 CUSTOMER - GET ALL PRODUCTS
===================================================== */
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (err) {
    console.error("Get Products Error:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* =====================================================
   📂 CUSTOMER - GET PRODUCTS BY CATEGORY
===================================================== */
const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const products = await Product.find({ category: id }).populate(
      "category",
      "name"
    );

    res.json(products);
  } catch (err) {
    console.error("Category Products Error:", err);
    res.status(500).json({ message: "Failed to fetch products by category" });
  }
};

/* =====================================================
   🔍 CUSTOMER - GET PRODUCT BY ID
===================================================== */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id).populate("category", "name");

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error("Get Product Error:", err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

/* =====================================================
   🔎 CUSTOMER - SEARCH PRODUCTS
===================================================== */
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query)
      return res.status(400).json({ message: "Search query required" });

    const products = await Product.find({
      "name.en": { $regex: query, $options: "i" },
    }).populate("category", "name");

    res.json(products);
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ message: "Search failed" });
  }
};

/* =====================================================
   🧾 ADMIN - GET ALL PRODUCTS (Formatted Images)
===================================================== */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");

    const formatted = products.map((p) => ({
      ...p._doc,
      image: p.image?.startsWith("http")
        ? p.image
        : p.image
        ? `${req.protocol}://${req.get("host")}${p.image}`
        : "",
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Get All Products Error:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* =====================================================
   ➕ ADMIN - CREATE PRODUCT
===================================================== */
const createProduct = async (req, res) => {
  try {
    const {
      nameEn,
      nameTa,
      description,
      category,
      imageUrl,
      type,
      stock,
    } = req.body;

    if (!nameEn || !category || !type || stock === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    let imagePath = "";

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else if (imageUrl?.startsWith("http")) {
      imagePath = imageUrl;
    }

    const product = new Product({
      name: {
        en: nameEn,
        ta: nameTa || "",
      },
      description: {
        en: description || "",
        ta: "",
      },
      stock: Number(stock),
      category,
      type,
      image: imagePath,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create Product Error:", err);
    res.status(500).json({ message: "Failed to create product" });
  }
};

/* =====================================================
   ✏️ ADMIN - UPDATE PRODUCT
===================================================== */
const updateProduct = async (req, res) => {
  try {
    const {
      nameEn,
      nameTa,
      description,
      category,
      imageUrl,
      type,
      stock,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (nameEn) {
      product.name = {
        en: nameEn,
        ta: nameTa || product.name?.ta || "",
      };
    }

    if (description !== undefined) {
      product.description = {
        en: description,
        ta: product.description?.ta || "",
      };
    }

    if (stock !== undefined) {
      product.stock = Number(stock);
    }

    if (type) product.type = type;

    if (category && mongoose.Types.ObjectId.isValid(category)) {
      product.category = category;
    }

    if (req.file) {
      if (product.image && !product.image.startsWith("http")) {
        const oldPath = path.join("uploads", path.basename(product.image));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      product.image = `/uploads/${req.file.filename}`;
    } else if (imageUrl?.startsWith("http")) {
      product.image = imageUrl;
    }

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    console.error("Update Product Error:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
};

/* =====================================================
   🗑️ ADMIN - DELETE PRODUCT
===================================================== */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.image && !product.image.startsWith("http")) {
      const filePath = path.join("uploads", path.basename(product.image));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

/* =====================================================
   🔥 EXPORT ALL FUNCTIONS (VERY IMPORTANT)
===================================================== */
export {
  getProducts,
  getProductsByCategory,
  getProductById,
  searchProducts,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

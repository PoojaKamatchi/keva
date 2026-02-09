import Product from "../models/productModel.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// 🧾 Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");

    const formatted = products.map((p) => ({
      ...p._doc,
      image: p.image?.startsWith("http")
        ? p.image
        : `${req.protocol}://${req.get("host")}${p.image}`,
    }));

    res.json(formatted);
  } catch {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// ➕ Create product
export const createProduct = async (req, res) => {
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
    if (req.file) imagePath = `/uploads/${req.file.filename}`;
    else if (imageUrl?.startsWith("http")) imagePath = imageUrl;

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
    console.error(err);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// ✏️ Update product
export const updateProduct = async (req, res) => {
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
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (nameEn)
      product.name = { en: nameEn, ta: nameTa || product.name.ta };

    if (description !== undefined)
      product.description.en = description;

    if (stock !== undefined) product.stock = Number(stock);

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
  } catch {
    res.status(500).json({ message: "Failed to update product" });
  }
};

// 🗑️ Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

import express from "express";
import {
  getProducts,
  getProductsByCategory,
  getProductById,
  searchProducts,
} from "../controllers/productController.js";

const router = express.Router();

// 🛒 Customer routes
router.get("/", getProducts);                    // All products
router.get("/category/:id", getProductsByCategory); // Products by category

// 🔍 Search route (before :id to prevent conflict)
router.get("/search", searchProducts);

// Single product by ID
router.get("/:id", getProductById);

export default router;

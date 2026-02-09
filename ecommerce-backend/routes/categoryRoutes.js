import express from "express";
import { getPublicCategories } from "../controllers/categoryController.js";

const router = express.Router();

// ✅ Public route – customer site
router.get("/", getPublicCategories);

export default router;

import express from "express";
import upload from "../middleware/uploadCategory.js";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/adminCategoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", upload.single("image"), addCategory);
router.put("/:id", upload.single("image"), updateCategory);
router.delete("/:id", deleteCategory);

export default router;

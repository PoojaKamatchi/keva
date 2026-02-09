import express from "express";
import { adminLogin } from "../controllers/authController.js";
import { adminProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ADMIN LOGIN
router.post("/admin/login", adminLogin);

// Example protected route
router.get("/admin/check", adminProtect, (req, res) => {
  res.json({ message: "Admin authorized", admin: req.admin });
});

export default router;

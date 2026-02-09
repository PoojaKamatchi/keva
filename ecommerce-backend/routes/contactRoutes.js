import express from "express";
import { saveContact, getContact } from "../controllers/contactController.js";

const router = express.Router();

// Admin
router.post("/admin/contact", saveContact);
router.put("/admin/contact", saveContact);

// User
router.get("/contact", getContact);

export default router;

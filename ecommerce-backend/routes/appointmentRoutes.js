import express from "express";
import {
  createAppointment,
  getAppointments,
} from "../controllers/appointmentController.js";

import { protect, adminProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User
router.post("/appointments", protect, createAppointment);

// Admin
router.get("/appointments/admin", adminProtect, getAppointments);

export default router;

import express from "express";
import {
  getMachines,
  createMachine,
  updateMachine,
  deleteMachine,
} from "../controllers/machineController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// USER
router.get("/machines", getMachines);

// ADMIN
router.post("/machines", upload.single("image"), createMachine);
router.put("/machines/:id", upload.single("image"), updateMachine);
router.delete("/machines/:id", deleteMachine);

export default router;

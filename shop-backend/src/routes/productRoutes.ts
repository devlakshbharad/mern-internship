import { Router } from "express";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { authenticate } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

// Public
router.get("/", getProducts);

// Admin only
router.post(
  "/",
  authenticate,
  requireAdmin,
  createProduct
);

router.put(
  "/:id",
  authenticate,
  requireAdmin,
  updateProduct
);

router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  deleteProduct
);

export default router;
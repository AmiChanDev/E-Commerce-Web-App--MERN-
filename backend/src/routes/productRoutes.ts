import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  getCategories,
} from "../controllers/productController";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/:id", getProductById);

// Admin routes (can add protect middleware later)
router.post("/", createProduct);

export default router;

import express from "express";
import { getProducts, addProduct, editProduct, deleteProduct,getProductById } from "../controllers/productController.js";

const router = express.Router();
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

export default router;

import { Router } from "express";
import passport from "passport";
import * as CategoryController from "../controllers/CategoryController.js";

const router = Router();

router.post("/", CategoryController.createCategory);
router.delete("/:id", CategoryController.deleteCategory);
router.patch("/:id", CategoryController.updateCategory);

export default router;

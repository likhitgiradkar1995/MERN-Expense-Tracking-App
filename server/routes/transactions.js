import { Router } from "express";
import passport from "passport";
import * as TransactionController from "../controllers/TransactionController.js";

const router = Router();

router.get("/", TransactionController.fetchTransaction);

router.post("/", TransactionController.createTransaction);

router.delete("/:id", TransactionController.deleteTransaction);

router.patch("/:id", TransactionController.updateTransaction);

export default router;

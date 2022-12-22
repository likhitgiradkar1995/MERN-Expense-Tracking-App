import { Router } from "express";
import TransactionRouter from "./transactions.js";
import AuthRouter from "./auth.js";
import userRouter from "./user.js";
import categoryRouter from "./category.js";
import passport from "passport";

const router = Router();
const auth = passport.authenticate("jwt", { session: false });
router.use("/transaction", auth, TransactionRouter);
router.use("/auth", AuthRouter);
router.use("/user", userRouter);
router.use("/category", auth, categoryRouter);

export default router;

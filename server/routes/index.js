import { Router } from "express";
import TransactionRouter from "./transactions.js";
import AuthRouter from "./auth.js";
import userRouter from "./user.js";
import passport from "passport";

const router = Router();

router.use(
  "/transaction",
  passport.authenticate("jwt", { session: false }),
  TransactionRouter
);
router.use("/auth", AuthRouter);
router.use("/user", userRouter);

export default router;

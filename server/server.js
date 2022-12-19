import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionRouter from "./routes/transactions.js";
import AuthRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import connect from "./database/mongoDb.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = 4000;
const app = express();
app.use(cors());
app.use(bodyParser());
app.use(passport.initialize());
passportConfig(passport);

app.use("/transaction", TransactionRouter);
app.use("/auth", AuthRouter);
app.use("/user", userRouter);

// app.get("/", (req, res) => {
//   res.send("Hello World !");
// });

await connect();

app.listen(PORT, () => {
  console.log("server is running at 4000 port");
});

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionRouter from "./routes/transactions.js";
import AuthRouter from "./routes/auth.js";
import connect from "./database/mongoDb.js";

const PORT = 4000;
const app = express();
app.use(cors());
app.use(bodyParser());
app.use("/transaction", TransactionRouter);
app.use("/auth", AuthRouter);

// app.get("/", (req, res) => {
//   res.send("Hello World !");
// });

await connect();

app.listen(PORT, () => {
  console.log("server is running at 4000 port");
});

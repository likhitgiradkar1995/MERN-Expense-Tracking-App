import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import Transaction from "./models/Transaction.js";

const PORT = 4000;
const app = express();
app.use(cors());
app.use(bodyParser());

await mongoose.connect(
  "mongodb+srv://likhit:likhit1995%40@cluster0.0dq6uzc.mongodb.net/test"
);
console.log("mongo connected");

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.post("/transaction", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
  });
  await transaction.save();
  res.json({ message: "success" });
});

app.listen(PORT, () => {
  console.log("server is running at 4000 port");
});

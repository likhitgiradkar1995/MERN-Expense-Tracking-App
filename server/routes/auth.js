import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(406).json({ message: "User already exists" });
    return;
  }

  //hashed password
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const user = await User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await user.save();
  res.json({ message: "success" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (!userExists) {
    res.status(406).json({ message: "User not exists" });
    return;
  }

  const matched = await bcrypt.compare(password, userExists.password);
  if (!matched) {
    res.status(406).json({ message: "credebtial not found" });
    return;
  }

  //create jwt token
  const payload = {
    username: email,
    _id: userExists._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  console.log(token);
  res.json({ message: "successfully log in ", token });
});

export default router;

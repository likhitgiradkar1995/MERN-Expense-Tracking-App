import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: ["first name field is required"] },
    lastName: { type: String, required: ["last name field is required"] },
    email: { type: String, required: ["email field is required"] },
    password: { type: String, required: ["password field is required"] },
    categories: [{ label: String, icon: String }],
  },
  { timestamps: true }
);

export default new mongoose.model("User", UserSchema);

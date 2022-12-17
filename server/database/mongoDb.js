import mongoose from "mongoose";

const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://likhit:likhit1995%40@cluster0.0dq6uzc.mongodb.net/test"
  );
  console.log("mongo connected");
};

export default connect;

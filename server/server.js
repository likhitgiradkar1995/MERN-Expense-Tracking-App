import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
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

app.use("/", routes);

await connect();

app.listen(PORT, () => {
  console.log("server is running at 4000 port");
});

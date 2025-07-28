import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import loginRoutes from "./routes/login.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/track-login", loginRoutes);

mongoose.connect(process.env.MONGO_URL, { dbName: "perf_dev" }).then(() => {
  app.listen(5000, () => console.log("Backend running on 5000"));
});

import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  domain: String,
  loginMethod: String,
  credential: String,
  loginCount: { type: Number, default: 1 },
  lastUsed: { type: Date, default: Date.now },
});

export default mongoose.model("Login", loginSchema);
